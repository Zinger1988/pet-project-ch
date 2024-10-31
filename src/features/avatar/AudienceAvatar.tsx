import { AudienceContextMenu } from '../room';
import { Icon, ModeratorIcon } from '../../components';
import { Avatar } from '.';
import { IconId } from '../../types/enums';
import { User, RemoteUser, MemberRole } from '../../types/global';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { assertCondition, assertRoom } from '../../types/assertions';

interface AudienceAvatarProps {
  member: User | RemoteUser;
  className?: string;
  userId: string;
  moderators: User[];
  raisedHand?: boolean;
}

const AudienceAvatar: React.FC<AudienceAvatarProps> = ({
  member,
  className = '',
  userId,
  moderators,
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

  const isModerator = moderators.some((m) => m.id === userId);
  const isMemberHasModeratorRights = moderators.some((m) => m.id === member.id);
  const isBlocked = room.blackList.includes(member.id);
  const isMember = room.members.some((m) => m.id === member.id);
  const role = room.members.reduce<MemberRole | 'guest'>((acc, cur) => {
    return cur.id === member.id ? cur.role : acc;
  }, 'guest');

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
      {isMemberHasModeratorRights && <ModeratorIcon className={ModeratorIconStyles} />}
      {isModerator && (
        <AudienceContextMenu
          memberId={member.id}
          isMember={isMember}
          isModerator={isMemberHasModeratorRights}
          hasAudio={hasAudio(member)}
          room={room}
          raisedHand={raisedHand}
          role={role}
        />
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
