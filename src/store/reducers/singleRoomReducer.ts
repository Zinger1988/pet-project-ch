import { Room } from '../../types/global';
import { Action } from '../types';
import {
  ROOM_LOADING,
  ROOM_LOADED,
  ROOM_FAILURE,
  ROOM_CLEAR,
  ROOM_CLEAR_ERROR,
  ROOM_SET_BLACKLIST,
  ROOM_SET_MEMBERS,
  ROOM_SET_REQ_AUDIO,
  ROOM_SET_MODERATORS,
  ROOM_SET_CLOSED,
  ROOM_SET_JOIN_REQUESTS,
} from '../actions/actionTypes';

export type SingleRoomState = {
  initialized: boolean;
  loading: boolean;
  error: null | string;
  room: Room | null;
};

const initialState: SingleRoomState = {
  loading: false,
  initialized: false,
  error: null,
  room: null,
};

const singleRoomReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ROOM_LOADING:
      return { ...state, loading: true, initialized: true };
    case ROOM_LOADED:
      return { ...state, loading: false, room: action.payload };
    case ROOM_SET_BLACKLIST: {
      return {
        ...state,
        room: { ...state.room, blackList: action.payload },
      };
    }
    case ROOM_SET_CLOSED: {
      return {
        ...state,
        room: { ...state.room, isClosed: action.payload },
      };
    }
    case ROOM_SET_JOIN_REQUESTS: {
      return {
        ...state,
        room: { ...state.room, joinRequests: action.payload },
      };
    }
    case ROOM_SET_MODERATORS: {
      return {
        ...state,
        room: { ...state.room, moderators: action.payload },
      };
    }
    case ROOM_SET_MEMBERS: {
      return {
        ...state,
        room: { ...state.room, members: action.payload },
      };
    }
    case ROOM_SET_REQ_AUDIO: {
      return {
        ...state,
        room: { ...state.room, requestAudio: action.payload },
      };
    }
    case ROOM_CLEAR: {
      return { ...initialState, initialized: false };
    }
    case ROOM_FAILURE: {
      return { ...state, loading: false, initialized: false, error: action.payload };
    }
    case ROOM_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default singleRoomReducer;
