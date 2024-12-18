import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAgoraRTCRemoteUser, RemoteUser as AgoraRemoterUser, useRemoteUsers } from 'agora-rtc-react';

import RoomAudienceList from './RoomAudienceList';
import { AudienceAvatar } from '../avatar';

import { apiGetUsers } from '../../services/apiUser';
import { User, RemoteUser, Member } from '../../types/global';

interface RoomAudienceProps {
  members: Member[];
  userId: string;
  moderators: User[];
  raisedHands: string[];
}

const RoomAudience: React.FC<RoomAudienceProps> = ({ members, userId, moderators, raisedHands }) => {
  const { t } = useTranslation();
  const remoteUsers = useRemoteUsers();
  const [audience, setAudience] = useState<RemoteUser[]>([]);
  const [online, setOnline] = useState<RemoteUser[]>([]);
  const [offline, setOffline] = useState<User[]>([]);
  const [guests, setGuests] = useState<RemoteUser[]>([]);

  const containerStyles = 'flex flex-col gap-6 rounded-xl border-2 border-gray-200 p-4 dark:border-gray-600 lg:p-5';

  useEffect(() => {
    const getRemoteUsers = async (remoteUsers: IAgoraRTCRemoteUser[]) => {
      if (!remoteUsers.length) {
        setAudience([]);
        return;
      }

      const ids = remoteUsers.map((ru) => ru.uid as string);
      const users = await apiGetUsers(ids);
      const usersWithAudio = users.map((user) => {
        const remoteUser = remoteUsers.find((remoteUser) => user.id === remoteUser.uid);
        return { ...user, hasAudio: remoteUser?.hasAudio ?? false };
      });
      setAudience(usersWithAudio);
    };

    getRemoteUsers(remoteUsers);
  }, [remoteUsers, members]);

  useEffect(() => {
    const membersWithStatus = members
      .map((member) => {
        const onlineMember = audience.find((user) => user.id === member.id);
        return onlineMember ? { ...onlineMember, online: true } : { ...member, online: false };
      })
      .filter((member) => member.id !== userId);

    const onlineMembers = membersWithStatus.filter((member) => 'hasAudio' in member);
    const offlineMembers = membersWithStatus.filter((member) => !member.online);
    const guests = audience.filter((user) => !members.find((member) => member.id === user.id));

    setOnline(onlineMembers as RemoteUser[]);
    setOffline(offlineMembers);
    setGuests(guests);
  }, [audience, members, userId]);

  return (
    <div>
      {remoteUsers.map((user) => (
        <AgoraRemoterUser user={user} key={user.uid} />
      ))}
      <div className={containerStyles}>
        {online.length > 0 && (
          <RoomAudienceList
            title={t('audience.online members', { ns: 'room' })}
            audience={online}
            render={(member) => (
              <AudienceAvatar
                key={member.id}
                member={member}
                userId={userId}
                moderators={moderators}
                raisedHand={raisedHands.includes(member.id)}
              />
            )}
          />
        )}
        {guests.length > 0 && (
          <RoomAudienceList
            title={t('audience.guests', { ns: 'room' })}
            audience={guests}
            render={(guest) => (
              <AudienceAvatar
                key={guest.id}
                member={guest}
                userId={userId}
                moderators={moderators}
                raisedHand={raisedHands.includes(guest.id)}
              />
            )}
          />
        )}
        {offline.length > 0 && (
          <RoomAudienceList
            title={t('audience.offline members', { ns: 'room' })}
            audience={offline}
            render={(member) => (
              <AudienceAvatar key={member.id} member={member} userId={userId} moderators={moderators} />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default RoomAudience;
