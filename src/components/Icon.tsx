import React from 'react';
import { IconId } from '../types/enums';

interface IconProps {
  id?: IconId;
  width?: string;
  height?: string;
  className?: string;
  fill?: string;
}

const Icon: React.FC<IconProps> = ({ id = IconId.Call, width = '18', height, className = '', fill = '' }) => {
  return (
    <svg className={className} width={width} height={height ? height : width} fill={fill}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
