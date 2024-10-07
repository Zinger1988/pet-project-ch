import { Badge } from '../../components';
import { capitalizeFirstLetter } from '../../helpers/stringUtils';
import { IconId } from '../../types/enums';
import { SystemStatusItem } from '../../types/global';

interface StatusCurrentProps {
  items: SystemStatusItem[];
  className?: string;
}

const StatusCurrent: React.FC<StatusCurrentProps> = ({ items, className = '' }) => {
  const listStyles = `m-0 p-0 rounded-lg bg-gray-100 dark:bg-gray-800 ${className}`;
  const listItemStyles =
    'm-0 px-5 py-3 before:hidden border-gray-200 dark:border-gray-600 border-b last:border-b-0 grid grid-cols-[1fr_auto]';
  const headingStyles = 'font-bold pr-12 col-span-1';
  const descriptionStyles = 'm-0 text-body-sm text-gray-400 col-span-1 row-start-2';
  const badgeStyles = 'col-span-1 row-span-2 self-start';

  return (
    <ul className={listStyles}>
      {items.map((item) => {
        const { label, description, status, statusText } = item;
        const isOperational = status === 'operational';
        const badgeIcon = isOperational ? IconId.CheckCircle : IconId.DangerCircle;
        const badgeStatus = isOperational ? 'success' : 'warning';

        return (
          <li key={label} className={listItemStyles}>
            <b className={headingStyles}>{label}</b>
            <p className={descriptionStyles}>{capitalizeFirstLetter(description)}</p>
            <Badge icon={badgeIcon} text={statusText} type={badgeStatus} className={badgeStyles} />
          </li>
        );
      })}
    </ul>
  );
};

export default StatusCurrent;
