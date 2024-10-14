import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Spinner } from '../components';
import { RoomAudience, RoomBanner } from '../features/room';

import { AppDispatch } from '../store/types';
import { RootState } from '../store';
import { clearRoomErrors, clearRoom, getRoom } from '../store/actions/singleRoomActions';
import { assertRoom, assertUser } from '../types/assertions';
import { apiOnRoomUpdates } from '../services/apiSingleRoom';
import { Room } from '../types/global';
import { useModal } from '../context/ModalContext';

const SingleRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { initialized, loading, room, error } = useSelector((state: RootState) => state.singleRoomSlice);
  const { openModal } = useModal();

  const spinnerStyles = 'absolute left-0 top-0 h-full w-full';
  const bannerStyles = 'mb-4 lg:mb-6';
  const descriptionStyles = 'mb-4 lg:mb-6';

  assertUser(user);

  const handleBlock = useCallback(
    (room: Room) => {
      openModal({
        id: 'alert',
        headerContent: 'Warning',
        bodyContent: `The moderator has restricted your access to the room ${room.name}`,
      });
    },
    [openModal],
  );

  useEffect(() => {
    dispatch(getRoom(id as string));
    return () => {
      dispatch(clearRoom());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (error === '404') {
      dispatch(clearRoomErrors());
      navigate('/404', { replace: true });
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    if (!id || error) return;
    const onRoomUpdates = apiOnRoomUpdates({
      roomId: id,
      callback: (room: Room) => {
        if (room.blackList.includes(user.id)) {
          handleBlock(room);
          navigate('/rooms', { replace: true });
        }
      },
    });

    return onRoomUpdates;
  }, [handleBlock, id, error, user, navigate]);

  if (!initialized) return null;
  if (loading) return <Spinner className={spinnerStyles} size='lg' />;

  assertRoom(room);

  if (room.blackList.includes(user.id)) {
    handleBlock(room);
    return <Navigate to='/rooms' replace />;
  }

  return (
    <article>
      <RoomBanner className={bannerStyles} room={room} userId={user.id} />
      <p className={descriptionStyles}>{room.description}</p>
      <RoomAudience userId={user.id} moderatorId={room.moderator.id} members={room.members.collection} />
    </article>
  );
};

export default SingleRoom;
