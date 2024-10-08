import { capitalizeFirstLetter } from '../helpers/stringUtils';
import { IconId } from '../types/enums';
import Icon from './Icon';
import colors from 'tailwindcss/colors';

interface BadgeProps {
  icon: IconId;
  text: string;
  className?: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
}

const Badge: React.FC<BadgeProps> = ({ icon, text, className = '', type = 'info' }) => {
  const badgeBaseStyles = 'rounded-full inline-flex items-center justify-center gap-1.5 pl-2 pr-3 py-1.5';

  const stylesMap = {
    info: { container: 'bg-cyan-300 text-cyan-800', icon: colors.cyan[800] },
    success: { container: 'bg-green-300 text-green-800', icon: colors.green[800] },
    warning: { container: 'bg-amber-300 text-amber-800', icon: colors.amber[800] },
    danger: { container: 'bg-red-300 text-red-800', icon: colors.red[800] },
  };

  const badgeStyles = `${badgeBaseStyles} ${stylesMap[type].container} ${className}`;

  return (
    <div className={badgeStyles}>
      <Icon id={icon} width='20' fill={stylesMap[type].icon} />
      <span className='text-body-sm'>{capitalizeFirstLetter(text)}</span>
    </div>
  );
};

export default Badge;
