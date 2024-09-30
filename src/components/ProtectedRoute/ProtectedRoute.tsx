import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children = null }) => {
  const { loading, user } = useSelector((state: RootState) => state.userSlice);

  if (loading) {
    return (
      <Spinner
        className="fixed left-0 top-0 w-full h-full bg-black/70 z-[10000]"
        size="xl"
      />
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
