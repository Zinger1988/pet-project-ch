import AgoraRTC, { IMicrophoneAudioTrack, useRTCClient } from 'agora-rtc-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Icon, Button, Spinner } from '../../components';

import { RootState } from '../../store';
import { generateToken } from '../../store/actions/tokensActions';
import { AppDispatch } from '../../store/types';
import { IconId } from '../../types/enums';
import { Member } from '../../types/global';
import { RTMClient } from 'agora-rtm-sdk';

interface RoomAudioProps {
  roomId: string;
  userId: string;
  members: Member[];
  rtmClient: RTMClient;
}

const RoomAudio: React.FC<RoomAudioProps> = ({ roomId, userId, members, rtmClient }) => {
  const [micEnabled, setMicEnabled] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const microphoneTrackRef = useRef<null | IMicrophoneAudioTrack>(null);
  const client = useRTCClient();
  const { loading, tokens } = useSelector((state: RootState) => state.tokensSlice);
  const tokenData = tokens.find((item) => item.roomId === roomId);
  const isMember = members.find((member) => member.id === userId);

  useEffect(() => {
    const handler = async (event: any) => {
      if (event.message === 'Mute' && microphoneTrackRef.current) {
        await microphoneTrackRef.current.setEnabled(false);
        setMicEnabled(false);
      }
    };

    rtmClient.addEventListener('message', handler);

    return () => {
      rtmClient.removeEventListener('message', handler);
    };
  }, [rtmClient]);

  useEffect(() => {
    const token = tokens.find((item) => item.roomId === roomId);

    if (!token) {
      dispatch(generateToken({ userId, roomId }));
    }
  }, [userId, roomId, tokens, dispatch]);

  useEffect(() => {
    if (!tokenData || loading) return;

    const initAgora = async () => {
      try {
        const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
        microphoneTrackRef.current = micTrack;

        await client.join(process.env.REACT_APP_AGORA_APP_ID as string, roomId, tokenData.token, userId);
        await client.publish([micTrack]);
        await micTrack.setEnabled(false);
      } catch (error) {
        console.error("Помилка під'єднання до каналу:", error);
      }
    };

    initAgora();

    return () => {
      client.leave();
      if (microphoneTrackRef.current) {
        microphoneTrackRef.current.stop();
        microphoneTrackRef.current.close();
      }
    };
  }, [client, roomId, userId, loading, tokenData]);

  // const handleRaiseHand = async () => {
  //   if (rtmClient) {
  //     const payload = { type: 'Raise hand', message: userId };
  //     const publishMessage = JSON.stringify(payload);
  //     const publishOptions = { channelType: 'MESSAGE' } as PublishOptions;
  //     try {
  //       await rtmClient.publish(roomId, publishMessage, publishOptions);
  //     } catch (status) {
  //       console.log(status);
  //     }
  //   }
  // };

  const toggleMicrophone = async () => {
    if (microphoneTrackRef.current) {
      await microphoneTrackRef.current.setEnabled(!micEnabled);
      setMicEnabled(!micEnabled);
    }
  };

  if (!isMember) {
    return null;
  }

  if (isMember.role === 'audience') {
    return (
      <Button size='sm' variant='info' className='gap-2.5 pl-4'>
        <Icon id={IconId.RaiseHand} className='h-5 w-5 fill-primary-400' />
        Raise hand
      </Button>
    );
  }

  return (
    <Button
      size='sm'
      variant={micEnabled ? 'success' : 'info'}
      className='gap-2.5 pl-4'
      onClick={() => (loading ? undefined : toggleMicrophone())}
    >
      {loading && (
        <>
          <Spinner size='sm' fill='white' />
          <span>{t('buttons.loading', { ns: 'room' })}...</span>
        </>
      )}
      {!loading && (
        <>
          <Icon id={micEnabled ? IconId.VoiceSolid : IconId.VoiceOffSolid} className='h-5 w-5 fill-white' />
          {micEnabled ? t('buttons.mute', { ns: 'room' }) : t('buttons.unmute', { ns: 'room' })}
        </>
      )}
    </Button>
  );
};

export default RoomAudio;
