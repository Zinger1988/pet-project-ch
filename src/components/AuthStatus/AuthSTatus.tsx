import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { userLookupStart, userLookupFinish } from "../../store/actions/userActions";

const AuthStatus = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(userLookupStart());
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(userLookupFinish(currentUser));
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default AuthStatus;
