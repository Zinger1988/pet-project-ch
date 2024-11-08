import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '../../components/Button';

import { useModal } from '../../context/ModalContext';
import {
  deleteRoom,
  handleCloseRoom,
  handleJoinRequest,
  handleMembership,
} from '../../store/actions/singleRoomActions';
import { AppDispatch } from '../../store/types';
import { Member, MemberRole, User } from '../../types/global';

interface RoomControlsProps {
  roomId: string;
  userId: string;
  createdBy: User;
  members: Member[];
  className?: string;
  newMemberRole: MemberRole;
  maxRoomCapacity: number | null;
  isClosed: boolean;
  isPrivate: boolean;
  userName: string;
  joinRequests: { userId: string; userName: string }[];
  roomName: string;
}

const RoomControls: React.FC<RoomControlsProps> = ({
  roomId,
  userId,
  createdBy,
  members,
  newMemberRole,
  maxRoomCapacity,
  isClosed,
  isPrivate,
  joinRequests,
  className,
  userName,
  roomName,
}) => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  let roomControls = null;
  const isMaxCapactity = maxRoomCapacity ? members.length >= maxRoomCapacity : false;
  const isCreator = createdBy.id === userId;
  const isModerator = members.some((m) => m.id === userId && m.role === 'moderator');
  const member = members.find((member) => {
    return member.id === userId;
  });
  const isSpeaker = member?.role === 'speaker';
  const hasJoinRequest = joinRequests.some((r) => r.userId === userId);

  const handleDelete = async () => {
    openModal({
      id: 'confirm',
      headerContent: 'Confirmation required',
      bodyContent: `Are you sure you want to delete this room?`,
      callbacks: {
        onConfirm: async () => {
          await dispatch(deleteRoom(roomId, userId));
          navigate('/rooms/explore');
        },
      },
    });
  };

  const handleJoin = async () => {
    if (isMaxCapactity || isClosed) return;
    await dispatch(handleMembership({ userId, roomId, mode: 'add', role: newMemberRole }));
  };

  const handleLeave = async () => {
    let modalMessage = '';

    if (isModerator) {
      modalMessage = 'Your moderation permissions will be rewoked.';
    } else if (isSpeaker && newMemberRole !== 'speaker') {
      modalMessage = 'Your speaker permissions will be rewoked.';
    }

    openModal({
      id: 'confirm',
      headerContent: 'Confirmation required',
      bodyContent: `Are you sure you want to leave this room? ${modalMessage}`,
      callbacks: {
        onConfirm: async () => {
          await dispatch(handleMembership({ userId, roomId, mode: 'remove' }));
        },
      },
    });
  };

  const handleClose = async () => {
    dispatch(handleCloseRoom({ roomId, mode: isClosed ? 'open' : 'close' }));
  };

  const handleJoinGrant = async () => {
    debugger;
    dispatch(handleJoinRequest({ roomId, roomName, userId, userName, mode: hasJoinRequest ? 'remove' : 'add' }));
  };

  if (isCreator) {
    roomControls = (
      <Button variant='danger' size='sm' onClick={handleDelete}>
        {t('buttons.delete room', { ns: 'room' })}
      </Button>
    );
  } else if (member) {
    roomControls = (
      <Button className='text-white' appearance='outline' size='sm' onClick={handleLeave}>
        {t('buttons.leave room', { ns: 'room' })}
      </Button>
    );
  } else if (hasJoinRequest) {
    roomControls = (
      <>
        <Button size='sm' disabled={isMaxCapactity || isClosed}>
          Waiting for join approval
        </Button>
        <Button appearance='outline' size='sm' variant='info' onClick={handleJoinGrant}>
          Cancel
        </Button>
      </>
    );
  } else if (isPrivate) {
    roomControls = (
      <Button size='sm' onClick={handleJoinGrant} disabled={isMaxCapactity || isClosed}>
        Send join request
      </Button>
    );
  } else {
    roomControls = (
      <Button size='sm' onClick={handleJoin} disabled={isMaxCapactity || isClosed}>
        {t('buttons.join room', { ns: 'room' })}
      </Button>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {roomControls}
      {isModerator && (
        <Button onClick={handleClose} size='sm'>
          {isClosed ? 'Open' : 'Close'} room
        </Button>
      )}
    </div>
  );
};

export default RoomControls;
