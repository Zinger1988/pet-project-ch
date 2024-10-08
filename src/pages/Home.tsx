import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { Spinner } from '../components';

const Home = () => {
  const { loading, user, error } = useSelector((state: RootState) => state.userSlice);

  if (loading) {
    return <Spinner className='fixed left-0 top-0 z-[10000] h-full w-full bg-black/70' size='lg' />;
  }

  if (user) {
    return <Navigate to='/rooms' replace />;
  }
  return <h1>Home</h1>;
};

export default Home;
