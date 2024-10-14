import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { Spinner } from '../components';

const Home = () => {
  const { initialized, loading, user } = useSelector((state: RootState) => state.userSlice);
  const spinnerStyles = 'fixed left-0 top-0 z-[10000] h-full w-full bg-black/70';

  if (!initialized) {
    return null;
  }

  if (loading) {
    return <Spinner className={spinnerStyles} size='lg' />;
  }

  if (user) {
    return <Navigate to='/rooms' replace />;
  }

  return <h1>Home</h1>;
};

export default Home;
