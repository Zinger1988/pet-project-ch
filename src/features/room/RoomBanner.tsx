import { AddMembersContextMenu, RoomAudio, RoomCapacity, RoomControls } from '.';
import { Avatar } from '../avatar';

import { Room } from '../../types/global';
import defaultBanner from '../../assets/images/room/banner.jpg';
import { RTMClient } from 'agora-rtm-sdk';

interface RoomBannerProps {
  className?: string;
  src?: string;
  room: Room;
  userId: string;
  userName: string;
  rtmClient: RTMClient;
}

// TODO: Handle Room Banner with custom image

const RoomBanner: React.FC<RoomBannerProps> = ({
  className = '',
  src = defaultBanner,
  room,
  userName,
  userId,
  rtmClient,
}) => {
  const {
    id: roomId,
    members,
    moderators,
    name: roomName,
    requestAudio,
    newMemberRole,
    maxRoomCapacity,
    createdBy,
    isClosed,
    isPrivate,
    joinRequests,
  } = room;

  const bannerSyles = `relative p-7 rounded-xl overflow-hidden bg-gray-800 ${className}`;
  const gridStyles = 'grid grid-cols-[auto,1fr,auto] gap-2 relative z-10 items-center';
  const nameStyles = 'my-0 font-semibold text-body-xs text-white';
  const headingStyles = 'col-span-3 mt-0 mb-1 text-white';
  const controlsStyles = 'flex gap-4 flex-wrap col-span-3 items-center';
  const isModerator = moderators.some((m) => m.id === userId);

  return (
    <header className={bannerSyles}>
      <div className={gridStyles}>
        <Avatar name={createdBy.name} size='xs' randomizeFill={false} />
        <p className={nameStyles}>{createdBy.name}</p>
        <RoomCapacity membersCount={members.length} maxMembersCount={maxRoomCapacity} />
        <h3 className={headingStyles}>{roomName}</h3>
        <div className={controlsStyles}>
          <RoomAudio
            roomId={roomId}
            userId={userId}
            members={members}
            rtmClient={rtmClient}
            raisedHands={requestAudio}
            moderators={moderators}
            isPrivate={isPrivate}
          />
          <RoomControls
            className='mr-auto'
            maxRoomCapacity={maxRoomCapacity}
            members={members}
            createdBy={createdBy}
            roomId={roomId}
            userId={userId}
            newMemberRole={newMemberRole}
            moderators={moderators}
            isClosed={isClosed}
            isPrivate={isPrivate}
            joinRequests={joinRequests}
            userName={userName}
            roomName={roomName}
          />
          {isModerator && <AddMembersContextMenu room={room} />}
        </div>
      </div>
      <img src={src} alt='Room banner' className='absolute left-0 top-0 h-full w-full object-cover opacity-30' />
    </header>
  );
};

export default RoomBanner;
