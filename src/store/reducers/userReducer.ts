import { User } from "firebase/auth";
import {
  USER_LOGOUT,
  USER_CLEAR_ERROR,
  USER_LOOKUP_START,
  USER_LOOKUP_FINISH,
  USER_LOOKUP_FAILURE,
} from "../actions/actionTypes";
import { Action } from "../types";

export type UserState = {
  loading: boolean;
  user: User | null;
  error: null | string;
};

const initialState: UserState = {
  loading: true,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action: Action) => {
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

export default userReducer;
