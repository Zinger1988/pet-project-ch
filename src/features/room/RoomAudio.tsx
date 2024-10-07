import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AgoraRTC, { IMicrophoneAudioTrack, useRTCClient } from 'agora-rtc-react';

import { Icon, Button, Spinner } from '../../components';

import { RootState } from '../../store';
import { IconId } from '../../types/enums';
import { AppDispatch } from '../../store/types';
import { generateToken } from '../../store/actions/tokensActions';
import { useTranslation } from 'react-i18next';

interface RoomAudioProps {
  roomId: string;
  userId: string;
}

const RoomAudio: React.FC<RoomAudioProps> = ({ roomId, userId }) => {
  const { t } = useTranslation();
  const [micEnabled, setMicEnabled] = useState(false);
  const { loading, tokens, error } = useSelector((state: RootState) => state.tokensSlice);
  const client = useRTCClient();
  const dispatch = useDispatch<AppDispatch>();
  const microphoneTrackRef = useRef<null | IMicrophoneAudioTrack>(null);
  const tokenData = tokens.find((item) => item.roomId === roomId);

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

  const toggleMicrophone = async () => {
    if (microphoneTrackRef.current) {
      await microphoneTrackRef.current.setEnabled(!micEnabled);
      setMicEnabled(!micEnabled);
    }
  };

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
