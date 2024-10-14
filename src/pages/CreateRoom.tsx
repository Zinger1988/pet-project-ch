import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import CreateRoomForm from '../features/room/CreateRoomForm';

import { RootState } from '../store';
import { AppDispatch } from '../store/types';
import { createRoom, сlearRoomsError } from '../store/actions/roomsActions';
import { CreateRoomValues } from '../types/global';
import { assertUser } from '../types/assertions';

const CreateRoom = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { loading, error } = useSelector((state: RootState) => state.roomsSlice);

  assertUser(user);

  useEffect(() => {
    if (error) {
      toast.error(t(error, { ns: 'errors' }));
      dispatch(сlearRoomsError());
    }
  }, [error, dispatch, t]);

  const handleSumbit = async (values: CreateRoomValues) => {
    await dispatch(createRoom({ ...values, createdBy: user.id }));
    navigate('/rooms');
  };

  return (
    <section>
      <h2 className='mt-0'>Create room</h2>
      <div>
        <CreateRoomForm onSubmit={handleSumbit} loading={loading} />
      </div>
    </section>
  );
};

export default CreateRoom;
