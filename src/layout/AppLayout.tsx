import { Outlet } from 'react-router-dom';

import { Footer, Header } from './';

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className='flex-grow pt-16 lg:pt-20'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
