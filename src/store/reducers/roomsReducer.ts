import { Room } from '../../types/global';
import { Action } from '../types';
import {
  ROOMS_LOADING_START,
  ROOMS_LOADING_FINSIH,
  ROOMS_FAILURE,
  ROOMS_CLEAR_ERROR,
  ROOMS_CLEAR,
} from '../actions/actionTypes';

export type RoomsState = {
  loading: boolean;
  rooms: Room[];
  error: null | string;
  currentRoom: Room | null;
};

const initialState: RoomsState = {
  loading: false,
  rooms: [],
  error: null,
  currentRoom: null,
};

const roomsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ROOMS_LOADING_START:
      return { ...state, loading: true };
    case ROOMS_LOADING_FINSIH:
      return { ...state, loading: false, rooms: action.payload };
    case ROOMS_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case ROOMS_CLEAR: {
      return initialState;
    }
    case ROOMS_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default roomsReducer;
