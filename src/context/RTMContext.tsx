import AgoraRTM, { RTMClient } from 'agora-rtm-sdk';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { httpsCallable } from 'firebase/functions';

import { functions } from '../firebase';

interface AgoraRTMContextProps {
  rtmClient?: RTMClient;
  handleRTMClient?: (client: RTMClient) => void;
  isLoading?: boolean;
}

interface RTMContextProviderProps {
  userId: string;
  children: ReactNode;
}

const AgoraRTMContext = createContext<AgoraRTMContextProps>({
  rtmClient: undefined,
  handleRTMClient: undefined,
  isLoading: undefined,
});

export const AgoraRTMContextProvider: React.FC<RTMContextProviderProps> = ({ userId, children }) => {
  const [rtmClient, setRtmClient] = useState<RTMClient>();
  const [isLoading, setIsloading] = useState<boolean>();

  useEffect(() => {
    if (isLoading || !userId || rtmClient) return;
    const generateRTMToken = async (): Promise<void> => {
      const generateTokenFunction = httpsCallable(functions, 'generateRTMToken');

      try {
        setIsloading(true);
        const token: any = await generateTokenFunction({
          uid: userId,
          expiryTime: 36000,
        });

        const rtm = new AgoraRTM.RTM(process.env.REACT_APP_AGORA_APP_ID as string, userId);
        await rtm.login({ token: token.data });
        setRtmClient(rtm);
        setIsloading(false);
      } catch (err) {
        console.error(err);
      }
    };
    generateRTMToken();
  }, [isLoading, userId, rtmClient]);

  return <AgoraRTMContext.Provider value={{ rtmClient, isLoading }}>{children}</AgoraRTMContext.Provider>;
};

export const useAgoraRTMContext = () => {
  const context = useContext(AgoraRTMContext);

  if (context === undefined) {
    throw new Error('Looks like you use AgoraRTM context outside provider');
  }

  return context;
};
