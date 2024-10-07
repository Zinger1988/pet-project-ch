import React from 'react';
import { Member, RemoteMember } from '../../types/global';

interface RoomAudienceListProps {
  title: string;
  render: (value: Member | RemoteMember) => React.ReactNode;
  audience: (Member | RemoteMember)[];
}

const RoomAudienceList: React.FC<RoomAudienceListProps> = ({ title, render, audience }) => {
  const membersSectionStyles = 'grid grid-cols-6 justify-items-start';
  const sectionTitleStyles = 'col-span-6 mt-0 mb-2';

  return (
    <section className={membersSectionStyles}>
      <h5 className={sectionTitleStyles}>{title}</h5>
      <div>{audience.map(render)}</div>
    </section>
  );
};

export default RoomAudienceList;
