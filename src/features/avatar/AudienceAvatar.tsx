import { Icon } from '../../components';
import { IconId } from '../../types/enums';
import { User, RemoteUser } from '../../types/global';
import { Avatar } from '.';

interface AudienceAvatarProps {
  member: User | RemoteUser;
  className?: string;
}

const AudienceAvatar: React.FC<AudienceAvatarProps> = ({ member, className = '' }) => {
  const indicatorStyles =
    'bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center absolute right-0 bottom-0 translate-x-1/3 translate-y-1/4';
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
    </div>
  );
};

export default AudienceAvatar;
