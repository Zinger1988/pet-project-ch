import { AudienceContextMenu } from '../room';
import { Icon } from '../../components';
import { Avatar } from '.';
import { IconId } from '../../types/enums';
import { User, RemoteUser } from '../../types/global';

interface AudienceAvatarProps {
  member: User | RemoteUser;
  className?: string;
  isModerator: boolean;
}

const AudienceAvatar: React.FC<AudienceAvatarProps> = ({ member, className = '', isModerator }) => {
  const indicatorStyles = `bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center absolute right-0 top-0 translate-x-1/3 -translate-y-1/4`;
  const iconStyles = 'fill-white w-3 h-3';

  const hasAudio = (member: User | RemoteUser) => {
    return 'hasAudio' in member ? member.hasAudio : false;
  };

  return (
    <div className={`relative ${className}`} key={member.id}>
      <Avatar name={member.name} size='lg' />
      {hasAudio(member) && (
        <div className={indicatorStyles}>
          <Icon id={IconId.VoiceSolid} className={iconStyles} />
        </div>
      )}
      {isModerator && <AudienceContextMenu memderId={member.id} hasAudio={hasAudio(member)} />}
    </div>
  );
};

export default AudienceAvatar;
