import { Link } from "react-router-dom";
import { Room } from "../../types/global";
import { IconId } from "../../types/enums";
import Icon from "../Icon/Icon";
import AvatarsGrid from "../AvatarsList/AvatarsList";
import Avatar from "../Avatar/Avatar";

interface RoomCardProps {
  room: Room;
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, className = "" }) => {
  const linkStyles = `relative dark:bg-gray-800 block p-2 p-3 bg-white rounded-2xl text-inherit no-underline ${className}`;
  const headingStyles = "flex gap-3 items-center mb-3 pr-12 ";

  return (
    <Link to={`/rooms/${room.id}`} className={linkStyles} key={room.name}>
      <div className={headingStyles}>
        <Avatar name={room.moderator.name} size="xs" />
        <p className="my-0 text-body-xs">{room.moderator.name}</p>
      </div>
      <div className="flex gap-3 items-center mb-3">
        {room.isPrivate && <Icon id={IconId.Lock} width="20" className="fill-gray-400" />}
        <h4 className="my-0">{room.name}</h4>
      </div>

      <AvatarsGrid usersList={room.members.collection} />
    </Link>
  );
};

export default RoomCard;
