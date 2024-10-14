import { useTranslation } from 'react-i18next';
import { compareDesc, isValid, format, parseISO, formatRelative, Locale } from 'date-fns';
import { enGB, es, fr } from 'date-fns/locale';

import { InfoTooltip } from '../../components';

import { SystemIncidentItem } from '../../types/global';
import { capitalizeFirstLetter } from '../../helpers/stringUtils';

interface StatusHistoryPorps {
  logs: SystemIncidentItem[];
  className?: '';
}

type FormattedLogs = {
  date: string;
  incidents: SystemIncidentItem[];
}[];

const StatusHistory: React.FC<StatusHistoryPorps> = ({ logs, className = '' }) => {
  const { i18n } = useTranslation();

  const localeMap: Record<string, Locale> = {
    en: enGB,
    es: es,
    fr: fr,
  };

  const locale = localeMap[i18n.language.toLowerCase()] || enGB;

  const formattedLogs = logs
    .filter((item) => isValid(parseISO(item.date)))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .reduce<FormattedLogs>((acc, cur) => {
      const curDate = new Date(cur.date);
      const monthAndYear = capitalizeFirstLetter(format(curDate, 'LLLL yyyy', { locale }));

      let targetDate = acc.find((item) => item.date === monthAndYear);

      if (!targetDate) {
        acc.push({
          date: monthAndYear,
          incidents: [cur],
        });
        targetDate = acc.at(-1);
      } else {
        targetDate.incidents.push(cur);
      }

      return acc;
    }, []);

  const containerStyles =
    'm-0 px-5 py-4 before:hidden bg-gray-100 dark:bg-gray-800 rounded-lg mb-2 grid grid-cols-[1fr_auto] gap-2';
  const headingStyles = 'font-bold pr-12 col-span-1';
  const descriptionStyles = 'm-0 text-body-sm text-gray-400 col-span-1 row-start-2';
  const dateStyles = 'm-0 text-body-sm text-gray-400 col-span-1 col-start-2 row-start-1 justify-self-end';
  const badgeStyles = 'col-span-1 row-span-1 col-start-2 row-start-2 justify-self-end';

  return (
    <ul>
      {formattedLogs.map((item) => (
        <li key={item.date} className='mb-8'>
          <h4>{item.date}</h4>
          {item.incidents.map((incident) => {
            const { status, date, label, description } = incident;
            const isResolved = status === 'resolved';
            const badgeType = isResolved ? 'success' : 'warning';
            const formattedDate = formatRelative(parseISO(incident.date), Date.now(), {
              locale,
            });
            return (
              <div key={date} className={containerStyles}>
                <b className={headingStyles}>{label}</b>
                <p className={descriptionStyles}>{description}</p>
                <p className={dateStyles}>{formattedDate}</p>
                <InfoTooltip type={badgeType} message={status} className={badgeStyles} />
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
};

export default StatusHistory;
