import { Room } from '../../types/global';
import { Action } from '../types';
import { ROOMS_LOADING, ROOMS_LOADED, ROOMS_FAILURE, ROOMS_CLEAR_ERROR, ROOMS_CLEAR } from '../actions/actionTypes';

export type RoomsState = {
  loading: boolean;
  rooms: Room[];
  error: null | string;
};

const initialState: RoomsState = {
  loading: false,
  rooms: [],
  error: null,
};

const roomsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ROOMS_LOADING:
      return { ...state, loading: true };
    case ROOMS_LOADED:
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
