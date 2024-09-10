import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children = null }) => {
  const { loading, user } = useSelector((state: RootState) => state.authSlice);

  if (loading) {
    return <p>Loading</p>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
