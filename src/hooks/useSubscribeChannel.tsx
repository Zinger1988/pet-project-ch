import { useEffect } from 'react';
import { RTMClient } from 'agora-rtm-sdk';

import { Room } from '../types/global';

type useChannelSubscribeProps = ({
  isRtmLoading,
  rtmClient,
  room,
}: {
  isRtmLoading?: boolean;
  rtmClient?: RTMClient;
  room: Room | null;
}) => void;

const useSubscribeChannel: useChannelSubscribeProps = ({ isRtmLoading, rtmClient, room }) => {
  useEffect(() => {
    if (isRtmLoading || !rtmClient || !room) return;

    const channelSubscription = async (roomId: string, mode: 'subscribe' | 'unsubscribe') => {
      try {
        if (isRtmLoading || !rtmClient) return;
        mode === 'subscribe' ? await rtmClient?.subscribe(roomId) : await rtmClient?.unsubscribe(roomId);
      } catch (status) {
        console.log(status);
      }
    };

    channelSubscription(room.id, 'subscribe');

    return () => {
      channelSubscription(room.id, 'unsubscribe');
    };
  }, [rtmClient, isRtmLoading, room]);
};

export default useSubscribeChannel;
