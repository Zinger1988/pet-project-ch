import { FirebaseError } from 'firebase/app';

import {
  apiBlockUser,
  apiDeleteRoom,
  apiGetRoom,
  apiHandleMembership,
  apiUnblockUser,
} from '../../services/apiSingleRoom';

import {
  ROOM_CLEAR,
  ROOM_LOADING,
  ROOM_LOADED,
  ROOM_CLEAR_ERROR,
  ROOM_FAILURE,
  ROOM_ADD_MEMBER,
  ROOM_REMOVE_MEMBER,
  ROOM_BLOCK_USER,
  ROOM_UNBLOCK_USER,
} from './actionTypes';

import { AppThunk } from '../types';
import { User, Room } from '../../types/global';

export const fetchRoomStart = () => ({ type: ROOM_LOADING });
export const fetchRoomFinish = (room: Room) => ({
  type: ROOM_LOADED,
  payload: room,
});

export const addRoomMember = (member: User) => ({
  type: ROOM_ADD_MEMBER,
  payload: member,
});

export const removeRoomMember = (id: string) => ({
  type: ROOM_REMOVE_MEMBER,
  payload: id,
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
    dispatch(fetchRoomStart());
    const member = await apiHandleMembership({ userId, roomId, mode });

    dispatch(mode === 'add' ? addRoomMember(member) : removeRoomMember(member.id));

    try {
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };

export const blockUser =
  (roomId: string, userId: string): AppThunk =>
  async (dispatch) => {
    try {
      await apiBlockUser(roomId, userId);
      dispatch({
        type: ROOM_BLOCK_USER,
        payload: userId,
      });
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };

export const unblockUser =
  (roomId: string, userId: string): AppThunk =>
  async (dispatch) => {
    try {
      await apiUnblockUser(roomId, userId);
      dispatch({
        type: ROOM_UNBLOCK_USER,
        payload: userId,
      });
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
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchRoomStart());
    try {
      await apiDeleteRoom(id);
      dispatch(clearRoom());
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };
