import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { InfoTooltip } from '../components';

import { Room } from '../types/global';
import { apiGetUser } from '../services/apiUser';
import { apiOnRoomChange } from '../services/apiSingleRoom';
import { setRoomRequestAudio } from '../store/actions/singleRoomActions';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useReqAudioChange = (room: Room | null) => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!room || !user) return;

    const onRoomChange = apiOnRoomChange({
      id: room.id,
      callback: ({ requestAudio: updatedRequestAudio }) => {
        if (room.requestAudio.length !== updatedRequestAudio.length) {
          dispatch(setRoomRequestAudio(updatedRequestAudio));

          if (room.members.some((m) => m.id === user.id && m.id === 'moderator')) {
            const newRequests = updatedRequestAudio.filter((req) => !room.requestAudio.includes(req));
            newRequests.forEach((req) => {
              apiGetUser(req)
                .then((user) => {
                  toast.custom(<InfoTooltip type='info' message={`${user.name} raise hand`} />, { duration: 5000 });
                })
                .catch((e) => console.error(e));
            });
          }
        }
      },
    });

    return onRoomChange;
  }, [room, dispatch, user]);
};

export default useReqAudioChange;
