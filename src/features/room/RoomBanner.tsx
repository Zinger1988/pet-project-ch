import defaultBanner from '../../assets/images/room/banner.jpg';
import { Room } from '../../types/global';
import { RoomAudio, RoomControls } from '.';
import { Avatar } from '../avatar';

interface RoomBannerProps {
  className?: string;
  src?: string;
  room: Room;
  userId: string;
}

// TODO: Handle Room Banner with custom image

const RoomBanner: React.FC<RoomBannerProps> = ({ className = '', src = defaultBanner, room, userId }) => {
  const { id: roomId, members, moderator, name: roomName } = room;
  const { id, name } = moderator;
  const { collection } = members;

  const bannerSyles = `relative p-7 rounded-xl overflow-hidden bg-gray-800 ${className}`;
  const gridStyles = 'grid grid-cols-[auto,1fr] gap-2 relative z-10 items-center';
  const nameStyles = 'my-0 font-semibold text-body-xs text-white';
  const headingStyles = 'col-span-2 mt-0 mb-1 text-white';
  const controlsStyles = 'flex gap-4 flex-wrap col-span-2';

  return (
    <header className={bannerSyles}>
      <div className={gridStyles}>
        <Avatar name={name} size='xs' randomizeFill={false} />
        <p className={nameStyles}>{name}</p>
        <h3 className={headingStyles}>{roomName}</h3>
        <div className={controlsStyles}>
          <RoomAudio roomId={roomId} userId={userId} members={collection} />
          <RoomControls members={collection} moderatorId={id} roomId={roomId} userId={userId} />
        </div>
      </div>
      <img src={src} alt='Room banner' className='absolute left-0 top-0 h-full w-full object-cover opacity-30' />
    </header>
  );
};

export default RoomBanner;
