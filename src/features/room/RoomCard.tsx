import { Link } from 'react-router-dom';
import { Room } from '../../types/global';
import { IconId } from '../../types/enums';
import Icon from '../../components/Icon';
import AvatarThumbnails from '../avatar/AvatarThumbnails';
import Avatar from '../avatar/Avatar';
import ModeratorIcon from '../../components/ModeratorIcon';

interface RoomCardProps {
  room: Room;
  className?: string;
  isModerator?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, className = '', isModerator = false }) => {
  const linkStyles = `relative dark:bg-gray-800 block p-2 p-3 bg-white rounded-2xl text-inherit no-underline ${className}`;
  const moderatorStyles = 'flex gap-3 items-center pr-12 ';

  return (
    <Link to={`/rooms/${room.id}`} className={linkStyles} key={room.name}>
      <div className='mb-3 flex items-center gap-3'>
        {room.isPrivate && <Icon id={IconId.Lock} width='20' className='fill-gray-400' />}
        {isModerator && <ModeratorIcon />}
        <h4 className='my-0'>{room.name}</h4>
      </div>

      <AvatarThumbnails usersList={room.members.collection} className='mb-4' />

      <div className={moderatorStyles}>
        <Avatar name={room.moderator.name} size='xs' />
        <p className='text-body-xs my-0'>{room.moderator.name}</p>
      </div>
    </Link>
  );
};

export default RoomCard;
