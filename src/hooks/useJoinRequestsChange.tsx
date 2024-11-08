import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Room } from '../types/global';
import { apiOnRoomChange } from '../services/apiSingleRoom';
import { setJoinRequests } from '../store/actions/singleRoomActions';

const useJoinRequestsChange = (room: Room | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!room) return;

    const onRoomChange = apiOnRoomChange({
      id: room.id,
      callback: ({ joinRequests: updatedJoinRequests }) => {
        if (room.joinRequests.length !== updatedJoinRequests.length) {
          dispatch(setJoinRequests(updatedJoinRequests));
        }
      },
    });

    return onRoomChange;
  }, [room, dispatch]);
};

export default useJoinRequestsChange;
