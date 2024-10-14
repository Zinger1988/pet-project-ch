import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Spinner } from '../../components';

import { RootState } from '../../store';

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children = null }) => {
  const { initialized, loading, user } = useSelector((state: RootState) => state.userSlice);
  const spinnerStyles = 'fixed left-0 top-0 z-[10000] h-full w-full bg-black/70';

  if (!initialized) {
    return null;
  }

  if (loading) {
    return <Spinner className={spinnerStyles} size='xl' />;
  }

  return user ? <>{children}</> : <Navigate to='/login' />;
};

export default ProtectedRoute;
