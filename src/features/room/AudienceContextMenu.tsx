import { DropdownMenu, Icon } from '../../components';
import { IconId } from '../../types/enums';

interface AudienceContextMenuProps {
  userId: string;
}

const AudienceContextMenu: React.FC<AudienceContextMenuProps> = ({ userId }) => {
  const listStyles = 'absolute left-0 top-full min-w-[10rem] rounded-md bg-gray-800 py-1 shadow-md';
  const optionStyles = 'text-body-sm flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-gray-700/50';
  const iconStyles = 'h-7 w-7';
  const buttonStyles = 'bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center';

  return (
    <div className='relative'>
      <DropdownMenu>
        <DropdownMenu.Button className={buttonStyles}>btn</DropdownMenu.Button>
        <DropdownMenu.List className={listStyles}>
          <DropdownMenu.Option onClick={() => console.log(userId)} className={optionStyles}>
            <Icon id={IconId.SoundOff} className={`${iconStyles} fill-gray-500`} />
            <span>Mute</span>
          </DropdownMenu.Option>
          <DropdownMenu.Option onClick={() => console.log(userId)} className={`${optionStyles} text-red-500`}>
            <Icon id={IconId.Forbidden} className={`${iconStyles} fill-red-500`} />
            <span>Kick from room</span>
          </DropdownMenu.Option>
        </DropdownMenu.List>
      </DropdownMenu>
    </div>
  );
};

export default AudienceContextMenu;
