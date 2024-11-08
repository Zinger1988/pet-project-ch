import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Button, Icon } from './';

import { RootState } from '../store';
import { AppDispatch } from '../store/types';
import { addNotification, markReadNotification, removeNotification } from '../store/actions/notificationActions';
import { UserNotification, RoleNotification, JoinRequestNotification, NotificationTypes } from '../types/global';
import { assertUser } from '../types/assertions';
import { IconId } from '../types/enums';
import { handleModerators } from '../store/actions/roomsActions';
import { handleJoinRequest, handleMembership, handleRole } from '../store/actions/singleRoomActions';

interface NotificationProps {
  className?: string;
  notification: UserNotification | JoinRequestNotification;
  onRemove?: () => void;
  onRead?: () => void;
}

const NotificationMessage: React.FC<NotificationProps> = ({ className = '', notification, onRemove, onRead }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.userSlice);

  const unreadMessageStyles =
    'before:absolute before:left before:top-0 before:left-0 before:h-full before:w-1 before:bg-emerald-500 before:rounded-l-lg bg-gray-700';
  const containerStyles = `relative mb-2 rounded-lg border border-gray-500 p-4 px-6 last:mb-0 ${notification.hasBeenRead ? '' : unreadMessageStyles}`;
  const headerStyles = `flex items-center gap-3 ${notification.hasBeenRead ? 'mb-0' : 'mb-3 '}`;
  const messageStyles = 'text-body-sm m-0 pr-8 font-normal';
  const btnGroupStyles = 'flex gap-2';
  const closeBtnStyles = 'absolute right-2 top-3';
  const closeBtnIconStyles = 'h-7 w-7 fill-gray-400 transition-colors hover:fill-white';

  assertUser(user);

  const handleRemove = (callbackFn?: () => void) => {
    dispatch(removeNotification({ userId: user.id, notificationId: notification.id }));
    callbackFn?.();
    onRemove?.();
  };

  const handleRead = () => {
    dispatch(markReadNotification({ userId: user.id, notificationId: notification.id }));
    onRead?.();
  };

  const handleModerateAccept = () => {
    const { roomId } = notification as RoleNotification;
    dispatch(handleRole({ userId: user.id, roomId, role: 'moderator' }));
  };

  const handleRoomJoinAccept = () => {
    // dispatch(markReadNotification({ userId: user.id, notificationId: notification.id }));
  };

  const handleRoomJoinDecline = () => {
    // dispatch(markReadNotification({ userId: user.id, notificationId: notification.id }));
  };

  const handleJoinRequestAccept = () => {
    const requestNotification = notification as JoinRequestNotification;

    addNotification(requestNotification.userId, {
      id: uuidv4(),
      type: NotificationTypes.Alert,
      message: `You have received approval to join the room ${requestNotification.roomName}.`,
    });

    dispatch(handleMembership({ userId: requestNotification.userId, roomId: requestNotification.roomId, mode: 'add' }));
    dispatch(
      handleJoinRequest({
        userId: requestNotification.userId,
        roomId: requestNotification.roomId,
        roomName: requestNotification.roomName,
        userName: requestNotification.userName,
        mode: 'remove',
      }),
    );
  };

  const handleJoinRequestDecline = () => {
    const requestNotification = notification as JoinRequestNotification;

    dispatch(
      handleJoinRequest({
        userId: requestNotification.userId,
        roomId: requestNotification.roomId,
        roomName: requestNotification.roomName,
        userName: requestNotification.userName,
        mode: 'remove',
      }),
    );
  };

  let notificationIcon = null;
  let notificationMessage = null;
  let notificationControls = null;
  const btnBaseProps = { size: 'xs' as const, appearance: 'outline' as const };

  switch (notification.type) {
    case 'joinRoom': {
      notificationMessage = `Moderate ${notification.roomName}?`;
      notificationIcon = <Icon id={IconId.InfoSquareSm} className='shrink-0 fill-blue-400' />;
      notificationControls = (
        <>
          <Button {...btnBaseProps} variant='success' onClick={() => handleRemove(handleRoomJoinAccept)}>
            Accept
          </Button>
          <Button {...btnBaseProps} variant='danger' onClick={() => handleRemove()}>
            Decline
          </Button>
        </>
      );
      break;
    }
    case 'joinRequest': {
      notificationMessage = `Аccept join request from user ${notification.userName}?`;
      notificationIcon = <Icon id={IconId.InfoSquareSm} className='shrink-0 fill-blue-400' />;
      notificationControls = (
        <>
          <Button {...btnBaseProps} variant='success' onClick={handleJoinRequestAccept}>
            Accept
          </Button>
          <Button {...btnBaseProps} variant='danger' onClick={() => handleJoinRequestDecline()}>
            Decline
          </Button>
        </>
      );
      break;
    }
    case 'moderate': {
      notificationMessage = `Moderate ${notification.roomName}?`;
      notificationIcon = <Icon id={IconId.InfoSquareSm} className='shrink-0 fill-blue-400' />;
      notificationControls = (
        <>
          <Button {...btnBaseProps} variant='success' onClick={() => handleRemove(handleModerateAccept)}>
            Accept
          </Button>
          <Button {...btnBaseProps} variant='danger' onClick={() => handleRemove}>
            Decline
          </Button>
        </>
      );
      break;
    }
    case 'alert': {
      notificationMessage = notification.message;
      notificationIcon = <Icon id={IconId.InfoSquareSm} className='shrink-0 fill-blue-400' />;
      notificationControls = (
        <>
          <Button {...btnBaseProps} variant='info' onClick={handleRead}>
            Mark as read
          </Button>
        </>
      );
      break;
    }
  }

  return (
    <article className={containerStyles}>
      <header className={headerStyles}>
        {notificationIcon}
        <h3 className={messageStyles}>{notificationMessage}</h3>
      </header>
      {!notification.hasBeenRead && <div className={btnGroupStyles}>{notificationControls}</div>}
      <div role='button' onClick={() => handleRemove()} className={closeBtnStyles}>
        <Icon id={IconId.Cancel} className={closeBtnIconStyles} />
      </div>
    </article>
  );
};

export default NotificationMessage;
