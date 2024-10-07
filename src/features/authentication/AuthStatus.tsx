import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '../../store/actions/userActions';

const AuthStatus = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(getUser(currentUser ? currentUser.uid : null));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthStatus;
