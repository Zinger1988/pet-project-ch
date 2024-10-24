import { useCallback, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Spinner } from '../components';
import { RoomAudience, RoomBanner } from '../features/room';

import { AppDispatch } from '../store/types';
import { RootState } from '../store';
import { clearRoomErrors, clearRoom, getRoom } from '../store/actions/singleRoomActions';
import { assertRoom, assertRTMClinet, assertUser } from '../types/assertions';
import { apiOnRoomStateUpdate } from '../services/apiSingleRoom';
import { Room } from '../types/global';
import { useModal } from '../context/ModalContext';
import { ROOM_SET_BLACKLIST, ROOM_SET_MEMBERS } from '../store/actions/actionTypes';
import { useAgoraRTMContext } from '../context/RTMContext';

const SingleRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { initialized, loading, room, error } = useSelector((state: RootState) => state.singleRoomSlice);
  const { openModal } = useModal();
  const { rtmClient, isLoading } = useAgoraRTMContext();

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
    if (!room) return;

    if (room.blackList.includes(user.id)) {
      handleBlock(room);
      navigate('/rooms', { replace: true });
    }
  }, [room, handleBlock, navigate, user]);

  // Subscription on messages inside of current room via Agora RTM
  useEffect(() => {
    if (isLoading || !rtmClient || !room) return;

    const channelSubscription = async (roomId: string, mode: 'subscribe' | 'unsubscribe') => {
      try {
        if (isLoading || !rtmClient) return;
        mode === 'subscribe' ? await rtmClient?.subscribe(roomId) : await rtmClient?.unsubscribe(roomId);
      } catch (status) {
        console.log(status);
      }
    };

    channelSubscription(room.id, 'subscribe');

    return () => {
      channelSubscription(room.id, 'unsubscribe');
    };
  }, [rtmClient, isLoading, room]);

  useEffect(() => {
    if (!room) return;

    const { id, members, blackList } = room;

    const onRoomStateUpdates = apiOnRoomStateUpdate({
      id,
      callback: (updatedMembers, updatedBlackList) => {
        if (members.length !== updatedMembers.length) {
          dispatch({
            type: ROOM_SET_MEMBERS,
            payload: updatedMembers,
          });
        }

        if (blackList.length !== updatedBlackList.length) {
          dispatch({
            type: ROOM_SET_BLACKLIST,
            payload: updatedBlackList,
          });
        }
      },
    });

    return onRoomStateUpdates;
  }, [room, dispatch]);

  if (!initialized) return null;
  if (loading || isLoading) return <Spinner className={spinnerStyles} size='lg' />;

  assertRoom(room);
  assertRTMClinet(rtmClient);

  if (room.blackList.includes(user.id)) {
    handleBlock(room);
    return <Navigate to='/rooms' replace />;
  }

  return (
    <article>
      <RoomBanner className={bannerStyles} room={room} userId={user.id} rtmClient={rtmClient} />
      <p className={descriptionStyles}>{room.description}</p>
      <RoomAudience userId={user.id} moderatorId={room.moderator.id} members={room.members} />
    </article>
  );
};

export default SingleRoom;
