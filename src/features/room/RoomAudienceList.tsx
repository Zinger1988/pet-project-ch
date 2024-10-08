import { User, RemoteUser } from '../../types/global';

interface RoomAudienceListProps {
  title: string;
  render: (value: User | RemoteUser) => React.ReactNode;
  audience: (User | RemoteUser)[];
}

const RoomAudienceList: React.FC<RoomAudienceListProps> = ({ title, render, audience }) => {
  const audienceGridStyles =
    'grid grid-cols-[repeat(auto-fit,minmax(64px,min-content))] gap-2 lg:gap-4 justify-items-start';
  const sectionTitleStyles = 'col-span-6 mt-0 mb-2';

  return (
    <section>
      <h5 className={sectionTitleStyles}>{title}</h5>
      <div className={audienceGridStyles}>{audience.map(render)}</div>
    </section>
  );
};

export default RoomAudienceList;
