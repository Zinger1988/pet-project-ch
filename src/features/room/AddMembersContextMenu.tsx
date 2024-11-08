import { ContextMenu, Icon } from '../../components';
import { Room } from '../../types/global';

import { IconId } from '../../types/enums';
import { useModal } from '../../context/ModalContext';

interface AudienceContextMenuProps {
  room: Room;
}

const AddMembersContextMenu: React.FC<AudienceContextMenuProps> = ({ room }) => {
  const { isPrivate, joinRequests } = room;
  const { openModal } = useModal();
  const hasJoinRequests = joinRequests.length > 0;

  const containerStyles = '';
  const listStyles = 'min-w-[10rem] rounded-md bg-gray-800 py-1.5 shadow-md mt-2';
  const optionStyles = 'text-body flex cursor-pointer items-center gap-2 p-4 py-1.5 hover:bg-gray-700/50';

  return (
    <>
      <div className={containerStyles}>
        <ContextMenu>
          <ContextMenu.Button className='relative flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800'>
            {hasJoinRequests && (
              <i
                aria-label='Requests availability marker'
                className='absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-600'
              ></i>
            )}
            <Icon id={IconId.AddUser} className='h-5 w-5 fill-white' />
          </ContextMenu.Button>
          <ContextMenu.List className={listStyles}>
            {isPrivate && (
              <ContextMenu.Option className={optionStyles} onClick={() => openModal({ id: 'joinRequests' })}>
                <span>Join requests</span>
                {hasJoinRequests && (
                  <span className='text-body-xs ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white'>
                    {joinRequests.length}
                  </span>
                )}
              </ContextMenu.Option>
            )}
            <ContextMenu.Option className={optionStyles} onClick={() => openModal({ id: 'inviteMembers' })}>
              <span>Invite members</span>
            </ContextMenu.Option>
          </ContextMenu.List>
        </ContextMenu>
      </div>
    </>
  );
};

export default AddMembersContextMenu;
