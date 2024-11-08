import { FirebaseError } from 'firebase/app';

import {
  ROOM_FAILURE,
  NOTIFICATIONS_LOADING,
  NOTIFICATIONS_LOADED,
  NOTIFICATIONS_CLEAR_ERROR,
  NOTIFICATIONS_SET,
} from './actionTypes';

import { AppThunk } from '../types';
import { UserNotification } from '../../types/global';
import {
  apiAddNotification,
  apiMarkReadNotification,
  apiMarkReadNotificationAll,
  apiRemoveNotification,
  apiRemoveNotificationAll,
} from '../../services/apiNotifications';

export const fetchNotificationsStart = () => ({ type: NOTIFICATIONS_LOADING });

export const fetchNotificationsFinish = (notifications: UserNotification[]) => ({
  type: NOTIFICATIONS_LOADED,
  payload: notifications,
});

export const clearNotificationsErrors = () => ({
  type: NOTIFICATIONS_CLEAR_ERROR,
});

export const notificationsFailure = (error: unknown) => {
  let errorMessage = 'An error occured during room management';
  if (error instanceof FirebaseError) {
    errorMessage = error.code;
  }
  return { type: ROOM_FAILURE, payload: errorMessage };
};

export const addNotification =
  (userId: string, notification: UserNotification): AppThunk =>
  async (dispatch) => {
    try {
      await apiAddNotification(userId, { ...notification, hasBeenRead: false });
    } catch (error) {
      dispatch(notificationsFailure(error));
    }
  };

export const setNotifications = (notifications: UserNotification[]) => ({
  type: NOTIFICATIONS_SET,
  payload: notifications,
});

export const removeNotification =
  ({ userId, notificationId }: { userId: string; notificationId: string }): AppThunk =>
  async (dispatch) => {
    try {
      await apiRemoveNotification(userId, notificationId);
    } catch (error) {
      dispatch(notificationsFailure(error));
    }
  };

export const markReadNotification =
  ({ userId, notificationId }: { userId: string; notificationId: string }): AppThunk =>
  async (dispatch) => {
    try {
      await apiMarkReadNotification(userId, notificationId);
    } catch (error) {
      dispatch(notificationsFailure(error));
    }
  };

export const markReadNotificationAll =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      await apiMarkReadNotificationAll(userId);
    } catch (error) {
      dispatch(notificationsFailure(error));
    }
  };

export const removeNotificationAll =
  (userId: string): AppThunk =>
  async (dispatch) => {
    try {
      await apiRemoveNotificationAll(userId);
    } catch (error) {
      dispatch(notificationsFailure(error));
    }
  };
