import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase';
import { getUser } from '../../store/actions/userActions';

const AuthStatus = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const currenUserUid = currentUser === null ? currentUser : currentUser.uid;
      dispatch(getUser(currenUserUid));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthStatus;
