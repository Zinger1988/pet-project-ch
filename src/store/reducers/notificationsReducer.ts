import { Action } from '../types';
import {
  NOTIFICATIONS_LOADING,
  NOTIFICATIONS_LOADED,
  NOTIFICATIONS_FAILURE,
  NOTIFICATIONS_CLEAR_ERROR,
  NOTIFICATIONS_SET,
} from '../actions/actionTypes';
import { UserNotification } from '../../types/global';

export type NotificationsState = {
  loading: boolean;
  initialized: boolean;
  notifications: UserNotification[] | null;
  error: null | string;
};

const initialState: NotificationsState = {
  loading: false,
  initialized: false,
  error: null,
  notifications: null,
};

const notificationsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case NOTIFICATIONS_LOADING:
      return { ...state, loading: true, initialized: true };
    case NOTIFICATIONS_LOADED:
      return { ...state, loading: false, notifications: action.payload };
    case NOTIFICATIONS_FAILURE: {
      return { ...state, loading: false, initialized: false, error: action.payload };
    }
    case NOTIFICATIONS_SET: {
      return {
        ...state,
        initialized: true,
        notifications: action.payload,
      };
    }
    case NOTIFICATIONS_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default notificationsReducer;
