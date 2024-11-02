import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Spinner } from '../components';
import { RoomAudience, RoomBanner } from '../features/room';

import { useBlacklistChange, useMembersChange, useReqAudioChange, useSubscribeChannel } from '../hooks';
import { AppDispatch } from '../store/types';
import { RootState } from '../store';
import { clearRoomErrors, clearRoom, getRoom, requestAudio } from '../store/actions/singleRoomActions';
import { assertRoom, assertRTMClinet, assertUser } from '../types/assertions';
import { useModal } from '../context/ModalContext';
import { useAgoraRTMContext } from '../context/RTMContext';
import useModeratorsChange from '../hooks/useModeratorsChange';
import useRolesChange from '../hooks/useRolesChange';
import useCloseRoomChange from '../hooks/useCloseRoomChange';

const SingleRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { initialized, loading, room, error } = useSelector((state: RootState) => state.singleRoomSlice);
  const { openModal } = useModal();
  const { rtmClient, isLoading: isRtmLoading } = useAgoraRTMContext();

  const spinnerStyles = 'absolute left-0 top-0 h-full w-full';
  const bannerStyles = 'mb-4 lg:mb-6';
  const descriptionStyles = 'mb-4 lg:mb-6';

  assertUser(user);

  // remove raised hand when user leaves room
  useEffect(
    () => () => {
      // Check is event firing if DB removes an id that wasn`t in collection
      dispatch(requestAudio({ userId: user.id, roomId: id as string, mode: 'remove' }));
    },
    [id, dispatch, user],
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

  useSubscribeChannel({ isRtmLoading, rtmClient, room });
  useMembersChange(room);
  useBlacklistChange(room);
  useReqAudioChange(room);
  useModeratorsChange(room);
  useRolesChange(room);
  useCloseRoomChange(room);

  if (!initialized) return null;
  if (loading || isRtmLoading) return <Spinner className={spinnerStyles} size='lg' />;

  assertRoom(room);
  assertRTMClinet(rtmClient);

  if (room.blackList.includes(user.id)) {
    openModal({
      id: 'alert',
      headerContent: 'Warning',
      bodyContent: `The moderator has restricted your access to the room ${room.name}`,
    });
    return <Navigate to='/rooms' replace />;
  }

  return (
    <article>
      <RoomBanner className={bannerStyles} room={room} userId={user.id} rtmClient={rtmClient} />
      <p className={descriptionStyles}>{room.description}</p>
      <RoomAudience
        userId={user.id}
        moderators={room.moderators}
        members={room.members}
        raisedHands={room.requestAudio}
      />
    </article>
  );
};

export default SingleRoom;
