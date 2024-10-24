import { User } from '../../types/global';
import { USER_CLEAR, USER_CLEAR_ERROR, USER_LOADING, USER_LOADED, USER_FAILURE } from '../actions/actionTypes';
import { Action } from '../types';

export type UserState = {
  initialized: boolean;
  user: User | null;
  loading: boolean;
  error: null | string;
};

const initialState: UserState = {
  loading: false,
  initialized: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true, initialized: true };
    case USER_LOADED:
      return { ...state, loading: false, user: action.payload };
    case USER_FAILURE: {
      return { ...state, loading: false, initialized: false, error: action.payload };
    }
    case USER_CLEAR_ERROR:
      return { ...state, error: null };
    case USER_CLEAR:
      return { ...initialState, initialized: false };
    default:
      return state;
  }
};

export default userReducer;
