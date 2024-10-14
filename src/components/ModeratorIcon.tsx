import Icon from './Icon';
import { IconId } from '../types/enums';

interface ModeratorIconProps {
  className?: string;
}

const ModeratorIcon: React.FC<ModeratorIconProps> = ({ className = '' }) => {
  const containerStyles = `flex h-6 w-6 flex-col items-center justify-center rounded-md bg-gray-600 ${className}`;
  const iconStyles = 'h-4 w-4 fill-amber-400';

  return (
    <div className={containerStyles}>
      <Icon id={IconId.Crown} className={iconStyles} />
    </div>
  );
};

export default ModeratorIcon;
