import { Avatar, Icon } from "../";
import { IconId } from "../../types/enums";
import { Member, RemoteMember } from "../../types/global";

interface AudienceAvatarProps {
  member: Member | RemoteMember;
  className?: string;
}

const AudienceAvatar: React.FC<AudienceAvatarProps> = ({ member, className = "" }) => {
  const memberVoiceIndicatorStyles =
    "bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center absolute right-0 bottom-0 translate-x-1/3 translate-y-1/4";
  const memberVoiceIconStyles = "fill-white w-3 h-3";

  const isRemoteMember = (member: Member | RemoteMember): member is RemoteMember => {
    return "hasAudio" in member;
  };

  return (
    <div className={`relative ${className}`} key={member.id}>
      <Avatar name={member.name} size="lg" />
      {isRemoteMember(member) && member.hasAudio && (
        <div className={memberVoiceIndicatorStyles}>
          <Icon id={IconId.VoiceSolid} className={memberVoiceIconStyles} />
        </div>
      )}
    </div>
  );
};

export default AudienceAvatar;
