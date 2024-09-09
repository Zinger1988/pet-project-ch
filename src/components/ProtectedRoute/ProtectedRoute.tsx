import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { USER_AUTH_SUCCESS } from "../../store/actions/actionTypes";
import { AppDispatch } from "../../store/types";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children = null }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.authSlice);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({ type: USER_AUTH_SUCCESS, payload: currentUser ? currentUser : null });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
