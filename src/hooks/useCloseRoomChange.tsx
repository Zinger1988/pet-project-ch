import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Room } from '../types/global';
import { apiOnRoomChange } from '../services/apiSingleRoom';
import { setRoomClosed } from '../store/actions/singleRoomActions';

const useCloseRoomChange = (room: Room | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!room) return;

    const onRoomChange = apiOnRoomChange({
      id: room.id,
      callback: ({ isClosed: updatedClosed }) => {
        if (room.isClosed !== updatedClosed) {
          dispatch(setRoomClosed(updatedClosed));
        }
      },
    });

    return onRoomChange;
  }, [room, dispatch]);
};

export default useCloseRoomChange;
