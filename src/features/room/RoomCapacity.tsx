import React from 'react';
import { Icon } from '../../components';
import { IconId } from '../../types/enums';

interface RoomCapacityProps {
  membersCount: number;
  maxMembersCount: number | null;
  className?: string;
}

const RoomCapacity: React.FC<RoomCapacityProps> = ({ membersCount, maxMembersCount, className = '' }) => {
  const containerStyles = `flex items-center gap-1.5 rounded-full bg-gray-900 px-2.5 py-1 ${className}`;
  const iconStyles = 'h-5 w-5 fill-gray-400';
  const textStyles = 'text-body-xs font-semibold text-gray-400';

  return (
    <div className={containerStyles}>
      <Icon id={IconId.MultipleUsers} className={iconStyles} />
      <span className={textStyles}>
        {membersCount}
        {maxMembersCount && `/${maxMembersCount}`}
      </span>
    </div>
  );
};

export default RoomCapacity;
