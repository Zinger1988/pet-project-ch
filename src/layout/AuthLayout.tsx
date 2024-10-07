import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import { Outlet } from 'react-router-dom';
import { Container } from '../components';
import { Footer, Header, Sidebar } from './';

AgoraRTC.setLogLevel(3);
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const AuthLayout: React.FC = () => {
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
