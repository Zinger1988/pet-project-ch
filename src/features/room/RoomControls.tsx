import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';

import { AppDispatch } from '../../store/types';
import { deleteRoom, handleMembership } from '../../store/actions/singleRoomActions';
import { Member } from '../../types/global';
import { useTranslation } from 'react-i18next';

interface RoomControlsProps {
  roomId: string;
  userId: string;
  moderatorId: string;
  members: Member[];
  className?: string;
}

const RoomControls: React.FC<RoomControlsProps> = ({ roomId, userId, moderatorId, members }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  let roomControls = null;
  const isModerator = userId === moderatorId;
  const isMember = members.some((member) => {
    return member.id === userId;
  });

  const handleDelete = async () => {
    await dispatch(deleteRoom(userId));
    navigate('/rooms');
  };

  const handleJoin = async () => {
    await dispatch(handleMembership({ userId, roomId, mode: 'add' }));
  };

  const handleLeave = async () => {
    await dispatch(handleMembership({ userId, roomId, mode: 'remove' }));
  };

  if (isModerator) {
    roomControls = (
      <Button variant='danger' size='sm' onClick={handleDelete}>
        {t('buttons.delete room', { ns: 'room' })}
      </Button>
    );
  } else if (isMember) {
    roomControls = (
      <Button className='text-white' appearance='outline' size='sm' onClick={handleLeave}>
        {t('buttons.leave room', { ns: 'room' })}
      </Button>
    );
  } else {
    roomControls = (
      <Button size='sm' onClick={handleJoin}>
        {t('buttons.join room', { ns: 'room' })}
      </Button>
    );
  }

  return roomControls;
};

export default RoomControls;
