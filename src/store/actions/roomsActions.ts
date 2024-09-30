import { FirebaseError } from "firebase/app";

import { apiCreateRoom, apiGetRooms } from "../../services/apiRooms";
import { CreateRoomValues, Room } from "../../types/global";
import { AppThunk } from "../types";
import {
  ROOMS_LOADING_FINSIH,
  ROOMS_LOADING_START,
  ROOMS_FAILURE,
  ROOMS_CLEAR_ERROR,
} from "./actionTypes";

export const fetchRoomsStart = () => ({ type: ROOMS_LOADING_START });
export const fetchRoomsFinish = (rooms: Room[]) => ({
  type: ROOMS_LOADING_FINSIH,
  payload: rooms,
});

export const roomsFailure = (error: unknown) => {
  let errorMessage = "An error occured during room management";
  if (error instanceof FirebaseError) {
    errorMessage = error.code;
  }
  return { type: ROOMS_FAILURE, payload: errorMessage };
};

export const createRoom =
  (values: CreateRoomValues & { createdBy: string }): AppThunk =>
  async (dispatch) => {
    dispatch(fetchRoomsStart());
    try {
      await apiCreateRoom(values);
    } catch (error) {
      dispatch(roomsFailure(error));
    }
  };

export const сlearRoomsError = () => {
  return { type: ROOMS_CLEAR_ERROR };
};

export const getRooms =
  ({ userId, userRooms = false }: { userId: string; userRooms?: boolean }): AppThunk =>
  async (dispatch) => {
    dispatch({ type: ROOMS_LOADING_START });
    try {
      const rooms = await apiGetRooms({ userId, userRooms });
      dispatch(fetchRoomsFinish(rooms));
    } catch (error) {
      dispatch(roomsFailure(error));
    }
  };
