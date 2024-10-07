import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Spinner } from '../components';

import { clearRoomErrors, clearRoomFinish, getRoom } from '../store/actions/singleRoomActions';
import { AppDispatch } from '../store/types';
import { RootState } from '../store';
import { RoomAudience, RoomBanner } from '../features/room';
import { User } from '../types/global';

const SingleRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { loading, room, error } = useSelector((state: RootState) => state.singleRoomSlice);

  useEffect(() => {
    dispatch(getRoom(id as string));

    return () => {
      dispatch(clearRoomFinish(id as string));
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (error === '404') {
      dispatch(clearRoomErrors());
      navigate('/404', { replace: true });
    }
  }, [error, dispatch, navigate]);

  if (loading || !room) {
    return <Spinner className='absolute left-0 top-0 h-full w-full' size='lg' />;
  }

  const { id: userUid } = user as User;

  return (
    <article>
      <RoomBanner className='mb-4 lg:mb-6' room={room} userId={userUid} />
      <p className='mb-4 lg:mb-6'>{room.description}</p>
      <RoomAudience userId={userUid} members={room.members.collection} />
    </article>
  );
};

export default SingleRoom;
