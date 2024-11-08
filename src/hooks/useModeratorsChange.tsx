import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Room } from '../types/global';
import { apiOnRoomChange } from '../services/apiSingleRoom';
import { setRoomMembers } from '../store/actions/singleRoomActions';

const useModeratorsChange = (room: Room | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!room) return;

    const onRoomChange = apiOnRoomChange({
      id: room.id,
      callback: ({ members: updatedMembers }) => {
        const moderators = room.members.filter((m) => m.role === 'moderator');
        const updatedModerators = updatedMembers.filter((m) => m.role === 'moderator');
        if (moderators.length !== updatedModerators.length) {
          dispatch(setRoomMembers(updatedMembers));
        }
      },
    });

    return onRoomChange;
  }, [room, dispatch]);
};

export default useModeratorsChange;
