import { Room } from '../../types/global';
import { Action } from '../types';
import {
  ROOM_LOADING,
  ROOM_LOADED,
  ROOM_FAILURE,
  ROOM_CLEAR,
  ROOM_CLEAR_ERROR,
  ROOM_BLOCK_USER,
  ROOM_UNBLOCK_USER,
  ROOM_SET_MEMBERS,
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
    case ROOM_BLOCK_USER: {
      const { blackList, ...roomRest } = state.room as Room;
      const newBlacklist = blackList.includes(action.payload) ? blackList : [...blackList, action.payload];
      return { ...state, room: { ...roomRest, blackList: newBlacklist } };
    }
    case ROOM_UNBLOCK_USER: {
      const { blackList, ...roomRest } = state.room as Room;
      const newBlacklist = blackList.filter((id) => id !== action.payload);
      return { ...state, room: { ...roomRest, blackList: newBlacklist } };
    }
    case ROOM_SET_MEMBERS: {
      const room = state.room as Room;
      const members = {
        total: action.payload.length,
        collection: action.payload,
      };
      return {
        ...state,
        loading: false,
        room: { ...state.room, members: { ...room.members, ...members } },
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
