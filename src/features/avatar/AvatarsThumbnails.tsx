import React from 'react';
import { Member } from '../../types/global';
import Avatar from './Avatar';

interface AvatarsThumbnailsProps {
  className?: string;
  size?: number;
  usersList: Member[];
}

const AvatarsThumbnails: React.FC<AvatarsThumbnailsProps> = ({ usersList, className = '', size = 4 }) => {
  const viewedUsers = usersList.slice(0, size);
  const restUsersQuantity = usersList.length - size;
  const viewedAvatars = viewedUsers.map((item) => (
    <Avatar
      key={item.id}
      name={item.name}
      size='sm'
      className='-ml-2 shadow-[0_0_0_2px_white] first:ml-0 dark:shadow-[0_0_0_2px_theme(colors.gray.800)]'
    />
  ));

  return (
    <div
      className={`flex items-center ${className} inline-flex rounded-[22px] border-2 border-gray-200 p-2 dark:border-gray-600`}
    >
      {viewedAvatars}
      {restUsersQuantity > 0 && <span className='text-body-xs ml-2 font-bold text-gray-400'>+{restUsersQuantity}</span>}
    </div>
  );
};

export default AvatarsThumbnails;
