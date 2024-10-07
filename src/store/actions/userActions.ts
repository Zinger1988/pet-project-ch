import { FirebaseError } from 'firebase/app';
import { apiSignUp, apiSignIn, apiSignOut, apiGetUser } from '../../services/apiUser';
import {
  USER_LOOKUP_START,
  USER_LOOKUP_FINISH,
  USER_LOOKUP_FAILURE,
  USER_LOGOUT,
  USER_CLEAR_ERROR,
} from './actionTypes';
import { AppThunk } from '../types';
import { User } from '../../types/global';

export const userLookupStart = () => ({ type: USER_LOOKUP_START });
export const userClearError = () => ({ type: USER_CLEAR_ERROR });
export const userLookupFinish = (user: User | null) => ({
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

export const getUser =
  (id: string | null): AppThunk =>
  async (dispatch) => {
    dispatch(userLookupStart());
    try {
      if (id) {
        const user = await apiGetUser(id);
        dispatch(userLookupFinish(user));
      } else {
        dispatch(userLookupFinish(null));
      }
    } catch (error) {
      dispatch(userLookupFailure(error));
    }
  };

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
