import { FirebaseError } from 'firebase/app';

import {
  apiDeleteRoom,
  apiGetRoom,
  apiHandleBlackList,
  apiHandleCloseRoom,
  apiHandleMembership,
  apiHandleRole,
  apiRequestAudio,
} from '../../services/apiSingleRoom';

import {
  ROOM_CLEAR,
  ROOM_LOADING,
  ROOM_LOADED,
  ROOM_CLEAR_ERROR,
  ROOM_FAILURE,
  ROOM_SET_MEMBERS,
  ROOM_SET_BLACKLIST,
  ROOM_SET_REQ_AUDIO,
  ROOM_SET_MODERATORS,
  ROOM_SET_CLOSED,
} from './actionTypes';

import { AppThunk } from '../types';
import { Member, MemberRole, Room, User } from '../../types/global';

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

export const setRoomMembers = (members: Member[]) => ({
  type: ROOM_SET_MEMBERS,
  payload: members,
});

export const setRoomBlacklist = (blacklistIds: string[]) => ({
  type: ROOM_SET_BLACKLIST,
  payload: blacklistIds,
});

export const setRoomClosed = (closed: boolean) => ({
  type: ROOM_SET_CLOSED,
  payload: closed,
});

export const setRoomModerators = (moderators: User[]) => ({
  type: ROOM_SET_MODERATORS,
  payload: moderators,
});

export const setRoomRequestAudio = (reqAudioIds: string[]) => ({
  type: ROOM_SET_REQ_AUDIO,
  payload: reqAudioIds,
});

export const roomFailure = (error: unknown) => {
  let errorMessage = 'An error occured during room management';
  if (error instanceof FirebaseError) {
    errorMessage = error.code;
  }
  return { type: ROOM_FAILURE, payload: errorMessage };
};

export const handleMembership =
  ({
    userId,
    roomId,
    mode,
    role = 'audience',
  }: {
    userId: string;
    roomId: string;
    mode: 'add' | 'remove';
    role?: MemberRole;
  }): AppThunk =>
  async (dispatch) => {
    await apiHandleMembership({ userId, roomId, mode, role });
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

export const handleRole =
  ({ userId, roomId, role }: { userId: string; roomId: string; role: MemberRole }): AppThunk =>
  async (dispatch) => {
    await apiHandleRole({ userId, roomId, role });
    try {
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };

export const handleCloseRoom =
  ({ roomId, mode }: { roomId: string; mode: 'open' | 'close' }): AppThunk =>
  async (dispatch) => {
    await apiHandleCloseRoom({ roomId, mode });
    try {
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };
