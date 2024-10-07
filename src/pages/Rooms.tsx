import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRooms } from '../store/actions/roomsActions';
import { RootState } from '../store';
import { AppDispatch } from '../store/types';
import RoomsContainer from '../features/room/RoomsContainer';
import { useLocation } from 'react-router-dom';

const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) => state.roomsSlice);
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { pathname } = useLocation();
  const enpoint = pathname.split('/').at(-1);
  const isUserRooms = enpoint === 'rooms';

  useEffect(() => {
    if (!user) return;
    dispatch(getRooms({ userId: user.uid, userRooms: isUserRooms }));
  }, [dispatch, user, enpoint, isUserRooms]);

  return <RoomsContainer title={isUserRooms ? 'My rooms' : 'Explore'} loading={loading} rooms={rooms} />;
};

export default Rooms;
