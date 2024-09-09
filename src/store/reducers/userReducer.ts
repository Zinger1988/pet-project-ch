import { User, UserCredential } from "firebase/auth";
import {
  USER_AUTH_FAILURE,
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_LOGOUT,
  USER_CLEAR_ERROR,
} from "../actions/actionTypes";

type State = {
  loading: boolean;
  user: User | UserCredential | null;
  error: null | string;
};

const initialState: State = {
  loading: false,
  user: null,
  error: null,
};

type Action = {
  type: string;
  payload?: any;
};

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_AUTH_START: {
      return { ...state, loading: true, error: null };
    }
    case USER_AUTH_SUCCESS: {
      return { ...state, loading: false, user: action.payload };
    }
    case USER_AUTH_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case USER_CLEAR_ERROR:
      return { ...state, error: null };
    case USER_LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
