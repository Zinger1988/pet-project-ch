import { Room } from "../../types/global";
import { Action } from "../types";
import {
  ROOM_LOADING_START,
  ROOM_LOADING_FINSIH,
  ROOM_FAILURE,
  ROOM_CLEAR_FINSIH,
  ROOM_CLEAR_ERROR,
  ROOM_ADD_MEMBER,
  ROOM_REMOVE_MEMBER,
} from "../actions/actionTypes";

export type SingleRoomState = {
  loading: boolean;
  error: null | string;
  room: Room | null;
};

const initialState: SingleRoomState = {
  loading: false,
  error: null,
  room: null,
};

const singleRoomReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ROOM_LOADING_START:
      return { ...state, loading: true };
    case ROOM_LOADING_FINSIH:
      return { ...state, loading: false, room: action.payload };
    case ROOM_ADD_MEMBER: {
      const { total, collection } = state.room!.members;
      const updatedMembers = {
        total: total + 1,
        collection: [...collection, action.payload],
      };
      return {
        ...state,
        loading: false,
        room: { ...state.room, members: updatedMembers },
      };
    }
    case ROOM_REMOVE_MEMBER: {
      const { total, collection } = state.room!.members;
      const updatedMembers = {
        total: total - 1,
        collection: collection.filter((item) => item.id !== action.payload),
      };
      return {
        ...state,
        loading: false,
        room: { ...state.room, members: updatedMembers },
      };
    }
    case ROOM_CLEAR_FINSIH: {
      return { ...state, loading: false, room: null };
    }
    case ROOM_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case ROOM_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default singleRoomReducer;
