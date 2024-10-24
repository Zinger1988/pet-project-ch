import { FirebaseError } from 'firebase/app';

import { apiGetRooms } from '../../services/apiRooms';
import { apiCreateRoom } from '../../services/apiSingleRoom';
import { CreateRoomValues, Room } from '../../types/global';
import { AppThunk } from '../types';
import { ROOMS_LOADED, ROOMS_LOADING, ROOMS_FAILURE, ROOMS_CLEAR_ERROR, ROOMS_CLEAR } from './actionTypes';

export const fetchRoomsStart = () => ({ type: ROOMS_LOADING });
export const fetchRoomsFinish = (rooms: Room[]) => ({
  type: ROOMS_LOADED,
  payload: rooms,
});

export const roomsFailure = (error: unknown) => {
  let errorMessage = 'An error occured during room management';
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

export const сlearRooms = () => {
  return { type: ROOMS_CLEAR };
};

export const getRooms =
  ({ userId, userRooms = false }: { userId: string; userRooms?: boolean }): AppThunk =>
  async (dispatch) => {
    dispatch({ type: ROOMS_LOADING });
    try {
      const rooms = await apiGetRooms({ userId, userRooms });
      dispatch(fetchRoomsFinish(rooms));
    } catch (error) {
      dispatch(roomsFailure(error));
    }
  };
