import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import RoomsContainer from '../features/room/RoomsContainer';

import { RootState } from '../store';
import { AppDispatch } from '../store/types';
import { getRooms } from '../store/actions/roomsActions';
import { assertUser } from '../types/assertions';

const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading } = useSelector((state: RootState) => state.roomsSlice);
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { pathname } = useLocation();
  const enpoint = pathname.split('/').at(-1);
  const isUserRooms = enpoint === 'rooms';

  assertUser(user);

  useEffect(() => {
    dispatch(getRooms({ userId: user.id, userRooms: isUserRooms }));
  }, [dispatch, user, enpoint, isUserRooms]);

  return <RoomsContainer title={isUserRooms ? 'My rooms' : 'Explore'} loading={loading} rooms={rooms} />;
};

export default Rooms;
