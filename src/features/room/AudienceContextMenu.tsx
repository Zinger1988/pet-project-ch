import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { ContextMenu, Icon } from '../../components';

import { blockUser, unblockUser } from '../../store/actions/singleRoomActions';
import { RootState } from '../../store';
import { AppDispatch } from '../../store/types';
import { assertRoom } from '../../types/assertions';
import { IconId } from '../../types/enums';
import { useAgoraRTMContext } from '../../context/RTMContext';
import { useModal } from '../../context/ModalContext';

interface AudienceContextMenuProps {
  memderId: string;
  hasAudio: boolean;
}

const AudienceContextMenu: React.FC<AudienceContextMenuProps> = ({ memderId, hasAudio }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { room } = useSelector((state: RootState) => state.singleRoomSlice);
  const { rtmClient } = useAgoraRTMContext();
  const { openModal } = useModal();

  const containerStyles = 'z-1000 absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3';
  const toggleIconStyles = 'h-6 w-6 fill-gray-400';
  const listStyles = 'min-w-[10rem] rounded-md bg-gray-800 py-1 shadow-md mt-2';
  const optionStyles = 'text-body flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-gray-700/50';
  const optionIconStyles = 'h-6 w-6';
  const buttonStyles = 'bg-gray-800 rounded-full flex items-center justify-center hover:[&>svg]:fill-white';

  assertRoom(room);

  const isBlocked = room.blackList.includes(memderId);

  const handleMute = async () => {
    if (rtmClient) {
      try {
        await rtmClient.publish(memderId, 'Mute', { channelType: 'USER' });
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
          isBlocked ? dispatch(unblockUser(room.id, memderId)) : dispatch(blockUser(room.id, memderId));
        },
      },
    });
  };

  return (
    <>
      <div className={containerStyles}>
        <ContextMenu>
          <ContextMenu.Button className={buttonStyles}>
            <Icon id={IconId.EllipsisVer} className={toggleIconStyles} />
          </ContextMenu.Button>
          <ContextMenu.List className={listStyles}>
            {hasAudio && (
              <ContextMenu.Option onClick={handleMute} className={optionStyles}>
                <Icon id={IconId.SoundOff} className={`${optionIconStyles} fill-gray-500`} />
                <span>Mute</span>
              </ContextMenu.Option>
            )}
            <ContextMenu.Option
              onClick={handleBlock}
              className={`${optionStyles} ${isBlocked ? 'text-green-500' : 'text-red-500'}`}
            >
              <Icon
                id={isBlocked ? IconId.ShieldOk : IconId.ShieldCancel}
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
