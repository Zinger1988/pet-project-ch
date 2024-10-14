import { User } from '../../types/global';
import Avatar from './Avatar';

interface AvatarThumbnailsProps {
  className?: string;
  size?: number;
  usersList: User[];
}

const AvatarThumbnails: React.FC<AvatarThumbnailsProps> = ({ usersList, className = '', size = 4 }) => {
  const viewedUsers = usersList.slice(0, size);
  const restUsersQuantity = usersList.length - size;
  const avatarStyles = '-ml-2 shadow-[0_0_0_2px_white] first:ml-0 dark:shadow-[0_0_0_2px_theme(colors.gray.800)]';
  const containerStyles = `flex items-center inline-flex rounded-[22px] border-2 border-gray-200 p-2 dark:border-gray-600 ${className}`;
  const restUsersStyles = 'text-body-xs ml-2 font-bold text-gray-400';

  return (
    <div className={containerStyles}>
      {viewedUsers.map((item) => (
        <Avatar key={item.id} name={item.name} size='sm' className={avatarStyles} />
      ))}
      {restUsersQuantity > 0 && <span className={restUsersStyles}>+{restUsersQuantity}</span>}
    </div>
  );
};

export default AvatarThumbnails;
