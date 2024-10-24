import { AudienceContextMenu } from '../room';
import { Icon, ModeratorIcon } from '../../components';
import { Avatar } from '.';
import { IconId } from '../../types/enums';
import { User, RemoteUser } from '../../types/global';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { assertRoom } from '../../types/assertions';

interface AudienceAvatarProps {
  member: User | RemoteUser;
  className?: string;
  userId: string;
  moderatorId: string;
  raisedHand?: boolean;
}

const AudienceAvatar: React.FC<AudienceAvatarProps> = ({
  member,
  className = '',
  userId,
  moderatorId,
  raisedHand = false,
}) => {
  const { room } = useSelector((state: RootState) => state.singleRoomSlice);

  assertRoom(room);

  const voiceIndicatorStyles = `bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center absolute right-0 top-0 translate-x-1/3 -translate-y-1/4`;
  const voiceIconStyles = 'fill-white w-3 h-3';
  const ModeratorIconStyles = 'absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 z-50';
  const blockedIndicatorStyles = `absolute left-0 top-0 z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-black/70 backdrop-grayscale`;
  const blockedIconStyles = 'h-8 w-8 fill-gray-300';
  const raiseHandIndicatorStyles = `absolute left-0 top-0 z-10 flex h-8 w-8 -translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-gray-800`;
  const raiseHandIconStyles = 'h-4 w-4 fill-primary-400';

  const isModerator = userId === moderatorId;
  const isMemberModerator = member.id === moderatorId;
  const isBlocked = room.blackList.includes(member.id);

  const hasAudio = (member: User | RemoteUser) => {
    return 'hasAudio' in member ? member.hasAudio : false;
  };

  return (
    <div className={`relative ${className}`} key={member.id}>
      {isBlocked && (
        <div className={blockedIndicatorStyles}>
          <Icon id={IconId.Lock} className={blockedIconStyles} />
        </div>
      )}
      {raisedHand && (
        <div className={raiseHandIndicatorStyles}>
          <Icon id={IconId.RaiseHand} className={raiseHandIconStyles} />
        </div>
      )}
      {isMemberModerator && <ModeratorIcon className={ModeratorIconStyles} />}
      {isModerator && (
        <AudienceContextMenu memberId={member.id} hasAudio={hasAudio(member)} room={room} raisedHand={raisedHand} />
      )}
      <Avatar name={member.name} size='lg' />
      {hasAudio(member) && (
        <div className={voiceIndicatorStyles}>
          <Icon id={IconId.VoiceSolid} className={voiceIconStyles} />
        </div>
      )}
    </div>
  );
};

export default AudienceAvatar;
