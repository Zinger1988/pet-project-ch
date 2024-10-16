import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IAgoraRTCRemoteUser, RemoteUser as AgoraRemoterUser, useRemoteUsers } from 'agora-rtc-react';

import RoomAudienceList from './RoomAudienceList';
import { AudienceAvatar } from '../avatar';

import { apiGetUsers } from '../../services/apiUser';
import { User, RemoteUser } from '../../types/global';
import { Spinner } from '../../components';

interface RoomAudienceProps {
  members: User[];
  userId: string;
  moderatorId: string;
}

const RoomAudience: React.FC<RoomAudienceProps> = ({ members, userId, moderatorId }) => {
  const { t } = useTranslation();
  const remoteUsers = useRemoteUsers();
  const [audience, setAudience] = useState<RemoteUser[]>([]);
  const [online, setOnline] = useState<RemoteUser[]>([]);
  const [offline, setOffline] = useState<User[]>([]);
  const [guests, setGuests] = useState<RemoteUser[]>([]);
  const isModerator = userId === moderatorId;
  const containerStyles = `flex flex-col gap-6 rounded-xl border-2 border-gray-200 p-4 dark:border-gray-600 lg:p-5 relative min-h-[200px]`;
  const spinnerStyles = 'absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center';

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
    if (!audience.length) return;

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
    <div className={containerStyles}>
      {!audience.length && <Spinner className={spinnerStyles} />}
      {remoteUsers.map((user) => (
        <AgoraRemoterUser user={user} key={user.uid} className='hidden' />
      ))}
      {online.length > 0 && (
        <RoomAudienceList
          title={t('audience.online members', { ns: 'room' })}
          audience={online}
          render={(member) => <AudienceAvatar key={member.id} member={member} isModerator={isModerator} />}
        />
      )}
      {guests.length > 0 && (
        <RoomAudienceList
          title={t('audience.guests', { ns: 'room' })}
          audience={guests}
          render={(guest) => <AudienceAvatar key={guest.id} member={guest} isModerator={isModerator} />}
        />
      )}
      {offline.length > 0 && (
        <RoomAudienceList
          title={t('audience.offline members', { ns: 'room' })}
          audience={offline}
          render={(member) => <AudienceAvatar key={member.id} member={member} isModerator={isModerator} />}
        />
      )}
    </div>
  );
};

export default RoomAudience;
