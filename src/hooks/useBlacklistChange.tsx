import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Room } from '../types/global';
import { apiOnRoomChange } from '../services/apiSingleRoom';
import { setRoomBlacklist } from '../store/actions/singleRoomActions';

const useBlacklistChange = (room: Room | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!room) return;

    const onRoomChange = apiOnRoomChange({
      id: room.id,
      callback: ({ blackList: updatedBlackList }) => {
        if (room.blackList.length !== updatedBlackList.length) {
          dispatch(setRoomBlacklist(updatedBlackList));
        }
      },
    });

    return onRoomChange;
  }, [room, dispatch]);
};

export default useBlacklistChange;
