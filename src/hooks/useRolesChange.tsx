import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Room } from '../types/global';
import { apiOnRoomChange } from '../services/apiSingleRoom';
import { setRoomMembers } from '../store/actions/singleRoomActions';

const useRolesChange = (room: Room | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!room) return;

    const onRoomChange = apiOnRoomChange({
      id: room.id,
      callback: ({ members: updatedMembers }) => {
        const hasLengthChanged = room.members.length !== updatedMembers.length;
        const hasRolesChanged = updatedMembers.some((m, i) => m.role !== room.members[i]?.role);

        if (!hasLengthChanged && hasRolesChanged) {
          dispatch(setRoomMembers(updatedMembers));
        }
      },
    });

    return onRoomChange;
  }, [room, dispatch]);
};

export default useRolesChange;
