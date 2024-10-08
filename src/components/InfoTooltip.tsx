import { IconId } from '../types/enums';
import Icon from './Icon';

interface InfoTooltipProps {
  type: 'danger' | 'info' | 'success' | 'warning';
  message: string;
  className?: string;
  showIcon?: boolean;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ type, message, showIcon = true, className = '' }) => {
  const typeMap = {
    info: {
      iconId: IconId.InfoSquareSm,
      containerStyles: 'bg-sky-500/20 text-sky-500',
      iconStyles: 'fill-sky-500',
    },
    success: {
      iconId: IconId.SuccessSquareSm,
      containerStyles: 'bg-green-500/20 text-green-600',
      iconStyles: 'fill-green-600',
    },
    warning: {
      iconId: IconId.WarningSquareSm,
      containerStyles: 'bg-orange-500/20 text-orange-500',
      iconStyles: 'fill-orange-500',
    },
    danger: {
      iconId: IconId.DangerSquareSm,
      containerStyles: 'bg-red-500/20 text-red-500',
      iconStyles: 'fill-red-500',
    },
  };

  const { iconId, containerStyles, iconStyles } = typeMap[type];

  return (
    <div className={`inline-flex items-start gap-2 rounded-lg px-2 py-1 pr-3 ${containerStyles} ${className}`}>
      {showIcon && <Icon id={iconId} width='14' className={`relative top-[.15rem] shrink-0 ${iconStyles}`} />}
      <span className='text-body-sm font-semibold'>{message}</span>
    </div>
  );
};

export default InfoTooltip;
