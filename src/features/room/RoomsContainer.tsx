import { Spinner } from '../../components';
import { Room } from '../../types/global';

import blankImg from '../../assets/images/feeling-lonely.svg';
import { RoomCard } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface RoomsContainerProps {
  title: string;
  loading: boolean;
  rooms: Room[];
}

const RoomsContainer: React.FC<RoomsContainerProps> = ({ title, loading, rooms }) => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const sortedRooms = [...rooms].sort((a, b) => {
    return a.moderator.id === user?.id ? -1 : 1;
  });
  const blank = (
    <>
      <img className='mx-auto mb-6 block w-1/2' src={blankImg} alt='A sad woman sitting on the windowsill' />
      <h3 className='text-center'>Here are no rooms yet. Why not create the first one?</h3>
    </>
  );

  if (loading) {
    return <Spinner className='absolute left-0 top-0 h-full w-full' size='lg' />;
  }

  if (rooms.length === 0) {
    return blank;
  }

  return (
    <>
      <h1 className='text-h2 mt-0'>{title}</h1>
      <div className='grid gap-2 lg:grid-cols-2'>
        {sortedRooms.map((room) => (
          <RoomCard key={room.id} room={room} isModerator={room.moderator.id === user?.id} />
        ))}
      </div>
    </>
  );
};

export default RoomsContainer;
