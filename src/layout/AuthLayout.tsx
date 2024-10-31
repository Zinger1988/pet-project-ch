import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container } from '../components';
import { Footer, Header, Sidebar } from './';

import { RootState } from '../store';
import { assertUser } from '../types/assertions';
import { AgoraRTMContextProvider } from '../context/RTMContext';
import useNotificationChange from '../hooks/useNotificationChange';

AgoraRTC.setLogLevel(3);
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const AuthLayout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { notifications } = useSelector((state: RootState) => state.notificationsSlice);

  assertUser(user);
  useNotificationChange(notifications);

  const mainStyles = 'flex-grow pt-20 lg:pt-28';
  const containerStyles = `mb-16 max-w-screen-xl items-start gap-6 md:grid md:grid-cols-[14rem,1fr] lg:grid-cols-[20rem,1fr] lg:gap-12`;
  const sidebarStyles = 'sticky top-20 col-span-1 hidden self-start md:block lg:top-28';
  const contentHolderStyles = `relative col-span-1 h-full min-h-[19rem] rounded-[1.3rem] bg-gray-100 p-4 dark:bg-gray-700 lg:min-h-[24rem] lg:rounded-3xl lg:p-8`;

  return (
    <AgoraRTMContextProvider userId={user.id}>
      <AgoraRTCProvider client={client}>
        <Header />
        <main className={mainStyles}>
          <Container className={containerStyles}>
            <Sidebar className={sidebarStyles} />
            <div className={contentHolderStyles}>
              <Outlet />
            </div>
          </Container>
        </main>
        <Footer />
      </AgoraRTCProvider>
    </AgoraRTMContextProvider>
  );
};

export default AuthLayout;
