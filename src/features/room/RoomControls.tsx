import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Button';

import { useModal } from '../../context/ModalContext';
import { deleteRoom, handleMembership } from '../../store/actions/singleRoomActions';
import { AppDispatch } from '../../store/types';
import { MemberRole, User } from '../../types/global';

interface RoomControlsProps {
  roomId: string;
  userId: string;
  moderators: User[];
  members: User[];
  className?: string;
  newMemberRole: MemberRole;
  maxRoomCapacity: number | null;
}

const RoomControls: React.FC<RoomControlsProps> = ({
  roomId,
  userId,
  moderators,
  members,
  newMemberRole,
  maxRoomCapacity,
}) => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  let roomControls = null;
  const isMaxCapactity = maxRoomCapacity ? members.length >= maxRoomCapacity : false;
  const isModerator = moderators.some((m) => m.id === userId);
  const isMember = members.some((member) => {
    return member.id === userId;
  });

  const handleDelete = async () => {
    openModal({
      id: 'confirm',
      headerContent: 'Confirmation required',
      bodyContent: `Are you sure you want to delete this room?`,
      callbacks: {
        onConfirm: async () => {
          await dispatch(deleteRoom(roomId, userId));
          navigate('/rooms');
        },
      },
    });
  };

  const handleJoin = async () => {
    if (isMaxCapactity) return;
    await dispatch(handleMembership({ userId, roomId, mode: 'add', role: newMemberRole }));
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
      <Button size='sm' onClick={handleJoin} disabled={isMaxCapactity}>
        {t('buttons.join room', { ns: 'room' })}
      </Button>
    );
  }

  return roomControls;
};

export default RoomControls;
