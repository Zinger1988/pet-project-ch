import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { ContextMenu, Icon } from '../../components';

import { handleBlacklist, handleRole, requestAudio } from '../../store/actions/singleRoomActions';
import { AppDispatch } from '../../store/types';
import { IconId } from '../../types/enums';
import { useAgoraRTMContext } from '../../context/RTMContext';
import { useModal } from '../../context/ModalContext';
import { Room, NotificationTypes, AlertNotification, RoomNotification, MemberRole } from '../../types/global';
import { addNotification } from '../../store/actions/notificationActions';
import { handleModerators } from '../../store/actions/roomsActions';

interface AudienceContextMenuProps {
  memberId: string;
  hasAudio: boolean;
  room: Room;
  raisedHand: boolean;
  isMember: boolean;
  isModerator: boolean;
  role: MemberRole | 'guest';
}

const AudienceContextMenu: React.FC<AudienceContextMenuProps> = ({
  memberId,
  hasAudio,
  room,
  raisedHand,
  isMember,
  isModerator,
  role,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rtmClient } = useAgoraRTMContext();
  const { openModal } = useModal();

  const containerStyles = 'z-50 absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3';
  const toggleIconStyles = 'h-6 w-6 fill-gray-400';
  const listStyles = 'min-w-[10rem] rounded-md bg-gray-800 py-1 shadow-md mt-2';
  const optionStyles = 'text-body flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-gray-700/50';
  const optionIconStyles = 'h-6 w-6';
  const buttonStyles = 'bg-gray-800 rounded-full flex items-center justify-center hover:[&>svg]:fill-white';
  const isBlocked = room.blackList.includes(memberId);
  const canModerate = isMember && !isBlocked;

  const handleMute = async () => {
    if (rtmClient) {
      try {
        await rtmClient.publish(memberId, 'Mute', { channelType: 'USER' });
      } catch (status) {
        console.log(status);
      }
    }
  };

  const handleUnmuteTemporarily = async () => {
    if (rtmClient) {
      try {
        await rtmClient.publish(memberId, 'Unmute', { channelType: 'USER' });
        await dispatch(requestAudio({ userId: memberId, roomId: room.id, mode: 'remove' }));
      } catch (status) {
        console.log(status);
      }
    }
  };

  const handleBlock = () => {
    openModal({
      id: 'confirm',
      headerContent: 'Confirmation required',
      bodyContent: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`,
      callbacks: {
        onConfirm: () => {
          const mode = isBlocked ? 'remove' : 'add';
          dispatch(
            addNotification(memberId, {
              id: uuidv4(),
              type: NotificationTypes.Alert,
              message: `The moderator has ${isBlocked ? 'restrored' : 'restricted'} your access to the room ${room.name}`,
            }),
          );
          dispatch(handleBlacklist({ userId: memberId, roomId: room.id, mode }));
        },
      },
    });
  };

  const handleModeratorRightsChange = () => {
    isModerator && dispatch(handleModerators({ userId: memberId, roomId: room.id, mode: 'remove' }));

    type NonIdentifiedNotification<T> = Omit<T, 'id'>;

    const notificationOptions:
      | NonIdentifiedNotification<AlertNotification>
      | NonIdentifiedNotification<RoomNotification> = isModerator
      ? {
          type: NotificationTypes.Alert,
          message: `Unmoderate ${room.name}`,
        }
      : {
          type: NotificationTypes.Moderate,
          roomName: room.name,
          roomId: room.id,
        };

    dispatch(
      addNotification(memberId, {
        id: uuidv4(),
        ...notificationOptions,
      }),
    );
  };

  const handleRoleChange = () => {
    const nextRole = role === 'speaker' ? 'audience' : 'speaker';
    dispatch(handleRole({ userId: memberId, roomId: room.id, role: nextRole }));
    dispatch(
      addNotification(memberId, {
        id: uuidv4(),
        type: NotificationTypes.Alert,
        message: `The moderator has changed your role to ${nextRole} in room: ${room.name}`,
      }),
    );
  };

  return (
    <>
      <div className={containerStyles}>
        <ContextMenu>
          <ContextMenu.Button className={buttonStyles}>
            <Icon id={IconId.EllipsisVer} className={toggleIconStyles} />
          </ContextMenu.Button>
          <ContextMenu.List className={listStyles}>
            {raisedHand && (
              <ContextMenu.Option onClick={handleUnmuteTemporarily} className={optionStyles}>
                <Icon id={IconId.SoundOn} className={`${optionIconStyles} fill-gray-500`} />
                <span>Unmute temporarily</span>
              </ContextMenu.Option>
            )}
            {hasAudio && (
              <ContextMenu.Option onClick={handleMute} className={optionStyles}>
                <Icon id={IconId.SoundOff} className={`${optionIconStyles} fill-gray-500`} />
                <span>Mute</span>
              </ContextMenu.Option>
            )}
            {canModerate && !isModerator && (
              <ContextMenu.Option className={optionStyles} onClick={handleRoleChange}>
                <Icon
                  id={role === 'speaker' ? IconId.SoundOff : IconId.Voice}
                  className={`${optionIconStyles} fill-gray-500`}
                />
                <span>Switch to {role === 'speaker' ? 'audience' : 'speaker'} role</span>
              </ContextMenu.Option>
            )}
            {canModerate && (
              <ContextMenu.Option className={optionStyles} onClick={handleModeratorRightsChange}>
                <Icon
                  id={isModerator ? IconId.ShieldCancel : IconId.ShieldOk}
                  className={`${optionIconStyles} fill-gray-500`}
                />
                <span>{isModerator ? 'Revoke' : 'Grant'} moderator rights</span>
              </ContextMenu.Option>
            )}
            <ContextMenu.Option
              onClick={handleBlock}
              className={`${optionStyles} ${isBlocked ? 'text-green-500' : 'text-red-500'}`}
            >
              <Icon
                id={isBlocked ? IconId.CheckCircle : IconId.CancelSquare}
                className={`${optionIconStyles} ${isBlocked ? 'fill-green-500' : 'fill-red-500'}`}
              />
              <span>{isBlocked ? 'Unblock' : 'Block'} user</span>
            </ContextMenu.Option>
          </ContextMenu.List>
        </ContextMenu>
      </div>
    </>
  );
};

export default AudienceContextMenu;
