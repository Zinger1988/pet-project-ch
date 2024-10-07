import { FirebaseError } from 'firebase/app';
import { User, UserCredential } from 'firebase/auth';
import { apiSignUp, apiSignIn, apiSignOut } from '../../services/apiUser';
import {
  USER_LOOKUP_START,
  USER_LOOKUP_FINISH,
  USER_LOOKUP_FAILURE,
  USER_LOGOUT,
  USER_CLEAR_ERROR,
} from './actionTypes';
import { AppThunk } from '../types';

export const userLookupStart = () => ({ type: USER_LOOKUP_START });
export const userClearError = () => ({ type: USER_CLEAR_ERROR });
export const userLookupFinish = (user: User | UserCredential | null) => ({
  type: USER_LOOKUP_FINISH,
  payload: user,
});

export const userLookupFailure = (error: unknown) => {
  let errorMessage = 'default';
  if (error instanceof FirebaseError) {
    errorMessage = error.code;
  }

  return { type: USER_LOOKUP_FAILURE, payload: errorMessage };
};

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    await apiSignOut();
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    dispatch(userLookupFailure(error));
  }
};

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  mode: 'register';
}

interface LoginCredentials {
  email: string;
  password: string;
  mode: 'login';
}

export const userLookup =
  (credentials: RegisterCredentials | LoginCredentials): AppThunk =>
  async (dispatch) => {
    dispatch(userLookupStart());
    try {
      if (isLogin(credentials)) {
        const { mode, ...restCredentials } = credentials;
        await apiSignIn(restCredentials);
      } else {
        const { mode, ...restCredentials } = credentials;
        await apiSignUp(restCredentials);
      }
    } catch (error) {
      dispatch(userLookupFailure(error));
    }

    function isLogin(credentials: RegisterCredentials | LoginCredentials): credentials is LoginCredentials {
      return credentials.mode === 'login';
    }
  };
