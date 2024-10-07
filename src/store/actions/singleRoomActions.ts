import { FirebaseError } from "firebase/app";

import {
  apiDeleteRoom,
  apiGetRoom,
  apiHandleMembership,
} from "../../services/apiSingleRoom";

import {
  ROOM_CLEAR_FINSIH,
  ROOM_LOADING_START,
  ROOM_LOADING_FINSIH,
  ROOM_CLEAR_ERROR,
  ROOM_FAILURE,
  ROOM_ADD_MEMBER,
  ROOM_REMOVE_MEMBER,
} from "./actionTypes";

import { AppThunk } from "../types";
import { Member, Room } from "../../types/global";

export const fetchRoomStart = () => ({ type: ROOM_LOADING_START });
export const fetchRoomFinish = (room: Room) => ({
  type: ROOM_LOADING_FINSIH,
  payload: room,
});

export const addRoomMember = (member: Member) => ({
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

export const clearRoomFinish = (id: string) => ({
  type: ROOM_CLEAR_FINSIH,
  payload: id,
});

export const roomFailure = (error: unknown) => {
  let errorMessage = "An error occured during room management";
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
  }: {
    userId: string;
    roomId: string;
    mode: "add" | "remove";
  }): AppThunk =>
  async (dispatch) => {
    dispatch(fetchRoomStart());
    const member = await apiHandleMembership({ userId, roomId, mode });

    dispatch(mode === "add" ? addRoomMember(member) : removeRoomMember(member.id));

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
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchRoomStart());
    try {
      await apiDeleteRoom(id);
      dispatch(clearRoomFinish(id));
    } catch (error) {
      dispatch(roomFailure(error));
    }
  };
