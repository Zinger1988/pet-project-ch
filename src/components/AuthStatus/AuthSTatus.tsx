import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { USER_AUTH_SUCCESS } from "../../store/actions/actionTypes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const AuthStatus = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({ type: USER_AUTH_SUCCESS, payload: currentUser ? currentUser : null });
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default AuthStatus;
