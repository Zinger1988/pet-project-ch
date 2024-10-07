import { IAgoraRTCRemoteUser, RemoteUser, useRemoteUsers } from 'agora-rtc-react';
import { useEffect, useState } from 'react';
import { getUsers } from '../../services/apiUser';
import { Member, RemoteMember } from '../../types/global';
import { useTranslation } from 'react-i18next';
import RoomAudienceList from './RoomAudienceList';
import { AudienceAvatar } from '../avatar';

interface RoomAudienceProps {
  members: Member[];
  userId: string;
}

const RoomAudience: React.FC<RoomAudienceProps> = ({ members, userId }) => {
  const { t } = useTranslation();
  const remoteUsers = useRemoteUsers();
  const [audience, setAudience] = useState<RemoteMember[]>([]);
  const [online, setOnline] = useState<RemoteMember[]>([]);
  const [offline, setOffline] = useState<Member[]>([]);
  const [guests, setGuests] = useState<RemoteMember[]>([]);

  useEffect(() => {
    const getRemoteUsers = async (remoteUsers: IAgoraRTCRemoteUser[]) => {
      if (!remoteUsers.length) {
        setAudience([]);
        return;
      }

      const ids = remoteUsers.map((ru) => ru.uid);
      const users = await getUsers(ids);
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

    setOnline(onlineMembers as RemoteMember[]);
    setOffline(offlineMembers);
    setGuests(guests);
  }, [audience, members, userId]);

  return (
    <div>
      {remoteUsers.map((user) => (
        <RemoteUser user={user} key={user.uid} />
      ))}
      <div className='rounded-xl border-2 border-gray-200 p-4 dark:border-gray-600 lg:p-5'>
        {online.length > 0 && (
          <RoomAudienceList
            title={t('audience.online members', { ns: 'room' })}
            audience={online}
            render={(member) => <AudienceAvatar key={member.id} member={member} />}
          />
        )}
        {guests.length > 0 && (
          <RoomAudienceList
            title={t('audience.guests', { ns: 'room' })}
            audience={guests}
            render={(guest) => <AudienceAvatar key={guest.id} member={guest} />}
          />
        )}
        {offline.length > 0 && (
          <RoomAudienceList
            title={t('audience.offline members', { ns: 'room' })}
            audience={offline}
            render={(member) => <AudienceAvatar key={member.id} member={member} />}
          />
        )}
      </div>
    </div>
  );
};

export default RoomAudience;
