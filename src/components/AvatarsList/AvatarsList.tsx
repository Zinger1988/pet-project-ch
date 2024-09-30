import React from "react";
import { Member } from "../../types/global";
import Avatar from "../Avatar/Avatar";
import { spawn } from "child_process";

interface AvatarsGridProps {
  className?: string;
  size?: number;
  usersList: Member[];
}

const AvatarsGrid: React.FC<AvatarsGridProps> = ({
  usersList,
  className = "",
  size = 4,
}) => {
  const viewedUsers = usersList.slice(0, size);
  const restUsersQuantity = usersList.length - size;

  const viewedAvatars = viewedUsers.map((item) => (
    <Avatar
      key={item.id}
      name={item.name}
      size="sm"
      className="first:ml-0 -ml-2 shadow-[0_0_0_2px_white] dark:shadow-[0_0_0_2px_theme(colors.gray.800)]"
    />
  ));

  return (
    <div
      className={`flex items-center ${className} border-2 border-gray-600 p-2 inline-flex rounded-[22px]`}
    >
      {viewedAvatars}
      {restUsersQuantity > 0 && (
        <span className="ml-2 text-body-xs font-bold text-gray-400">
          +{restUsersQuantity}
        </span>
      )}
    </div>
  );
};

export default AvatarsGrid;
