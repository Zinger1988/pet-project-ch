import { useSelector } from 'react-redux';

import { Spinner } from '../../components';
import { RoomCard } from '.';

import { Room } from '../../types/global';
import { RootState } from '../../store';
import { assertUser } from '../../types/assertions';
import blankImg from '../../assets/images/feeling-lonely.svg';

interface RoomsContainerProps {
  title: string;
  loading: boolean;
  rooms: Room[];
}

const RoomsContainer: React.FC<RoomsContainerProps> = ({ title, loading, rooms }) => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const imgStyles = 'mx-auto mb-6 block w-1/2';
  const spinnerStyles = 'absolute left-0 top-0 h-full w-full';
  const headingStyles = 'text-h2 mt-0';
  const containerStyles = 'grid gap-2 lg:grid-cols-2';

  assertUser(user);

  const sortedRooms = [...rooms].sort((a, _) => {
    return a.moderator.id === user.id ? -1 : 1;
  });

  const blank = (
    <>
      <img className={imgStyles} src={blankImg} alt='A sad woman sitting on the windowsill' />
      <h3 className='text-center'>Here are no rooms yet. Why not create the first one?</h3>
    </>
  );

  if (loading) {
    return <Spinner className={spinnerStyles} size='lg' />;
  }

  if (rooms.length === 0) {
    return blank;
  }

  return (
    <>
      <h1 className={headingStyles}>{title}</h1>
      <div className={containerStyles}>
        {sortedRooms.map((room) => (
          <RoomCard key={room.id} room={room} isModerator={room.moderator.id === user.id} />
        ))}
      </div>
    </>
  );
};

export default RoomsContainer;
