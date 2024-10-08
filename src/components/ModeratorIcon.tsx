import Icon from './Icon';
import { IconId } from '../types/enums';

const ModeratorIcon = () => {
  return (
    <div className='flex h-6 w-6 flex-col items-center justify-center rounded-md bg-gray-600'>
      <Icon id={IconId.Crown} className='h-4 w-4 fill-amber-400' />
    </div>
  );
};

export default ModeratorIcon;
