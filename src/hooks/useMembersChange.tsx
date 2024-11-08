import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { InfoTooltip } from '../components';

import { Room } from '../types/global';
import { apiOnRoomChange } from '../services/apiSingleRoom';
import { setRoomMembers } from '../store/actions/singleRoomActions';

const useMembersChange = (room: Room | null) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!room) return;

    const onRoomChange = apiOnRoomChange({
      id: room.id,
      callback: ({ members: updatedMembers }) => {
        if (room.members.length !== updatedMembers.length) {
          dispatch(setRoomMembers(updatedMembers));

          const joinedMembers = updatedMembers.filter(
            (updatedMember) => !room.members.some((member) => member.id === updatedMember.id),
          );

          const leftMembers = room.members.filter(
            (member) => !updatedMembers.some((updatedMember) => member.id === updatedMember.id),
          );

          joinedMembers.forEach((member) => {
            toast.custom(<InfoTooltip type='success' message={`${member.name} join room`} />, { duration: 5000 });
          });

          leftMembers.forEach((member) => {
            toast.custom(<InfoTooltip type='danger' message={`${member.name} left room`} />, { duration: 5000 });
          });
        }
      },
    });

    return onRoomChange;
  }, [room, dispatch]);
};

export default useMembersChange;
