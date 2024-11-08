import AgoraRTC, { IMicrophoneAudioTrack, useRTCClient } from 'agora-rtc-react';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Icon, Button, Spinner, InfoTooltip } from '../../components';

import { RootState } from '../../store';
import { generateToken } from '../../store/actions/tokensActions';
import { requestAudio } from '../../store/actions/singleRoomActions';
import { AppDispatch } from '../../store/types';
import { IconId } from '../../types/enums';
import { Member, User } from '../../types/global';
import { RTMClient } from 'agora-rtm-sdk';

interface RoomAudioProps {
  roomId: string;
  userId: string;
  members: Member[];
  rtmClient: RTMClient;
  raisedHands: string[];
  isPrivate: boolean;
}

const RoomAudio: React.FC<RoomAudioProps> = ({ roomId, userId, members, rtmClient, raisedHands, isPrivate }) => {
  const [micEnabled, setMicEnabled] = useState(false);
  const [unmuteTemporarily, setUnmuteTemporarily] = useState(false);
  const { t } = useTranslation();
  const { loading: tokenLoading, tokens } = useSelector((state: RootState) => state.tokensSlice);
  const dispatch = useDispatch<AppDispatch>();
  const microphoneTrackRef = useRef<null | IMicrophoneAudioTrack>(null);
  const RTCClient = useRTCClient();
  const tokenData = tokens.find((item) => item.roomId === roomId);
  const member = members.find((member) => member.id === userId);
  const isSpeakerOrModerator = member?.role === 'speaker' || member?.role === 'moderator';
  const isHandRaised = raisedHands.includes(userId);

  useEffect(() => {
    const handler = async (event: any) => {
      if (event.message === 'Mute' && microphoneTrackRef.current) {
        await microphoneTrackRef.current.setEnabled(false);
        setMicEnabled(false);
        setUnmuteTemporarily(false);
        toast.custom(<InfoTooltip type='danger' message='You was muted by room moderator' />, { duration: 5000 });
      }

      if (event.message === 'Unmute' && microphoneTrackRef.current) {
        await microphoneTrackRef.current.setEnabled(true);
        setMicEnabled(true);
        setUnmuteTemporarily(true);
        dispatch(requestAudio({ userId, roomId, mode: 'remove' }));
        toast.custom(<InfoTooltip type='success' message='You was unmuted by room moderator' />, { duration: 5000 });
      }
    };

    rtmClient.addEventListener('message', handler);

    return () => {
      setUnmuteTemporarily(false);
      rtmClient.removeEventListener('message', handler);
    };
  }, [rtmClient, roomId, userId, dispatch]);

  useEffect(() => {
    if (!tokens.some((item) => item.roomId === roomId)) {
      dispatch(generateToken({ userId, roomId }));
    }
  }, [userId, roomId, tokens, dispatch]);

  useEffect(() => {
    if (!tokenData || tokenLoading || (isPrivate && !member)) return;

    const initAgora = async () => {
      try {
        const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
        microphoneTrackRef.current = micTrack;

        await RTCClient.join(process.env.REACT_APP_AGORA_APP_ID as string, roomId, tokenData.token, userId);
        await RTCClient.publish([micTrack]);
        await micTrack.setEnabled(false);
      } catch (error) {
        console.error("Помилка під'єднання до каналу:", error);
      }
    };

    initAgora();

    return () => {
      RTCClient.leave();
      if (microphoneTrackRef.current) {
        microphoneTrackRef.current.stop();
        microphoneTrackRef.current.close();
      }
    };
  }, [RTCClient, roomId, userId, tokenLoading, tokenData, isPrivate, member]);

  const handleRiseHand = async () => {
    dispatch(requestAudio({ userId, roomId, mode: isHandRaised ? 'remove' : 'add' }));
  };

  const toggleMicrophone = async () => {
    if (microphoneTrackRef.current) {
      await microphoneTrackRef.current.setEnabled(!micEnabled);
      setUnmuteTemporarily(false);
      setMicEnabled(!micEnabled);
    }
  };

  if (isPrivate && !member) return null;

  if (!isSpeakerOrModerator && !unmuteTemporarily) {
    return (
      <Button onClick={handleRiseHand} size='sm' variant='info' className='gap-2.5 pl-4'>
        <Icon id={IconId.RaiseHand} className='h-5 w-5 fill-primary-400' />
        {isHandRaised ? 'Lower hand' : 'Raise hand'}
      </Button>
    );
  }

  return (
    <Button
      size='sm'
      variant={micEnabled ? 'success' : 'info'}
      className='gap-2.5 pl-4'
      onClick={() => (tokenLoading ? undefined : toggleMicrophone())}
    >
      {tokenLoading && (
        <>
          <Spinner size='sm' fill='white' />
          <span>{t('buttons.loading', { ns: 'room' })}...</span>
        </>
      )}
      {!tokenLoading && (
        <>
          <Icon id={micEnabled ? IconId.VoiceSolid : IconId.VoiceOffSolid} className='h-5 w-5 fill-white' />
          {micEnabled ? t('buttons.mute', { ns: 'room' }) : t('buttons.unmute', { ns: 'room' })}
        </>
      )}
    </Button>
  );
};

export default RoomAudio;
