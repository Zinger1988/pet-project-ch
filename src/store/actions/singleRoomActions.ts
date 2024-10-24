import { FirebaseError } from 'firebase/app';

import {
  apiDeleteRoom,
  apiGetRoom,
  apiHandleBlackList,
  apiHandleMembership,
  apiRequestAudio,
} from '../../services/apiSingleRoom';

import { ROOM_CLEAR, ROOM_LOADING, ROOM_LOADED, ROOM_CLEAR_ERROR, ROOM_FAILURE } from './actionTypes';

import { AppThunk } from '../types';
import { Room } from '../../types/global';

export const fetchRoomStart = () => ({ type: ROOM_LOADING });
export const fetchRoomFinish = (room: Room) => ({
  type: ROOM_LOADED,
  payload: room,
});

export const clearRoomErrors = () => ({
  type: ROOM_CLEAR_ERROR,
});

export const clearRoom = () => ({
  type: ROOM_CLEAR,
});

export const roomFailure = (error: unknown) => {
  let errorMessage = 'An error occured during room management';
  if (error instanceof FirebaseError) {
    errorMessage = error.code;
  }
  return { type: ROOM_FAILURE, payload: errorMessage };
};

export const handleMembership =
  ({ userId, roomId, mode }: { userId: string; roomId: string; mode: 'add' | 'remove' }): AppThunk =>
  async (dispatch) => {
    await apiHandleMembership({ userId, roomId, mode });
    try {
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };

export const handleBlacklist =
  ({ userId, roomId, mode }: { userId: string; roomId: string; mode: 'add' | 'remove' }): AppThunk =>
  async (dispatch) => {
    await apiHandleBlackList({ userId, roomId, mode });
    try {
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };

export const requestAudio =
  ({ userId, roomId, mode }: { userId: string; roomId: string; mode: 'add' | 'remove' }): AppThunk =>
  async (dispatch) => {
    await apiRequestAudio({ userId, roomId, mode });
    try {
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };

export const getRoom =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchRoomStart());
    try {
      const room = await apiGetRoom(id);
      dispatch(fetchRoomFinish(room));
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };

export const deleteRoom =
  (roomId: string, userId: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchRoomStart());
    try {
      await apiDeleteRoom(roomId, userId);
      dispatch(clearRoom());
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };
