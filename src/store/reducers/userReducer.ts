import { User, UserCredential } from "firebase/auth";
import {
  USER_LOGOUT,
  USER_CLEAR_ERROR,
  USER_LOOKUP_START,
  USER_LOOKUP_FINISH,
  USER_LOOKUP_FAILURE,
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
    case USER_LOOKUP_START:
      return { ...state, loading: true };
    case USER_LOOKUP_FINISH:
      return { ...state, loading: false, user: action.payload };
    case USER_LOOKUP_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case USER_CLEAR_ERROR:
      return { ...state, error: null };
    case USER_LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
