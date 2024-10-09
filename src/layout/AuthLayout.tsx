import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import { Outlet } from 'react-router-dom';
import { Container } from '../components';
import { Footer, Header, Sidebar } from './';
import AgoraRTM from 'agora-rtm-sdk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

AgoraRTC.setLogLevel(3);
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const AuthLayout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const [rtmToken, setRtmToken] = useState<string>();
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(false);

  useEffect(() => {
    if (rtmToken || isTokenLoading || !user) return;

    const generateRTMToken = async (): Promise<void> => {
      const generateTokenFunction = httpsCallable(functions, 'generateRTMToken');

      try {
        setIsTokenLoading(true);

        const result: any = await generateTokenFunction({
          uid: user.id,
          expiryTime: 36000,
        });

        setRtmToken(result.data);
      } catch (err) {
        console.error(err);
        console.error('Error generating token:', err);
      } finally {
        setIsTokenLoading(false);
      }
    };

    generateRTMToken();
  }, [rtmToken, isTokenLoading, user]);

  useEffect(() => {
    if (!rtmToken || isTokenLoading || !user) return;
    const initRtm = async () => {
      try {
        const rtm = new AgoraRTM.RTM(process.env.REACT_APP_AGORA_APP_ID as string, user.id);
        await rtm.login({ token: rtmToken });
      } catch (status) {
        console.log('Error');
        console.log(status);
      }
    };

    initRtm();
  }, [user, isTokenLoading, rtmToken]);

  return (
    <AgoraRTCProvider client={client}>
      <Header />
      <main className='flex-grow pt-20 lg:pt-28'>
        <Container className='mb-16 max-w-screen-xl items-start gap-6 md:grid md:grid-cols-[14rem,1fr] lg:grid-cols-[20rem,1fr] lg:gap-12'>
          <Sidebar className='sticky top-20 col-span-1 hidden self-start md:block lg:top-28' />
          <div className='relative col-span-1 h-full min-h-[19rem] rounded-[1.3rem] bg-gray-100 p-4 dark:bg-gray-700 lg:min-h-[24rem] lg:rounded-3xl lg:p-8'>
            <Outlet />
          </div>
        </Container>
      </main>
      <Footer />
    </AgoraRTCProvider>
  );
};

export default AuthLayout;
