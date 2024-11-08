import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db } from '../firebase';

import { UserNotification, AppNotificationDTO } from '../types/global';
import { DB_NOTIFICATIONS } from './constants';

export const apiGetNotifications = async (userId: string) => {
  const ref = doc(db, DB_NOTIFICATIONS, userId);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    const { notifications } = snapshot.data() as AppNotificationDTO;
    return { ref, notifications };
  }

  throw new FirebaseError('404', 'Notifications doesn`t exists');
};

export const apiOnNotificationsChange = ({
  userId,
  callback,
}: {
  userId: string;
  callback: (notifications: UserNotification[]) => void;
}) => {
  const ref = doc(db, DB_NOTIFICATIONS, userId);

  return onSnapshot(ref, async (snapshot) => {
    if (!snapshot.exists()) return;

    const { notifications } = snapshot.data() as AppNotificationDTO;

    callback(notifications);
  });
};

export const apiAddNotification = async (userId: string, notification: UserNotification) => {
  const { ref, notifications } = await apiGetNotifications(userId);

  updateDoc(ref, {
    notifications: [...notifications, notification],
  });
};

export const apiRemoveNotification = async (userId: string, notificationId: string) => {
  const { ref, notifications } = await apiGetNotifications(userId);

  updateDoc(ref, {
    notifications: notifications.filter((n) => n.id !== notificationId),
  });
};

export const apiRemoveNotificationAll = async (userId: string) => {
  const { ref } = await apiGetNotifications(userId);

  updateDoc(ref, {
    notifications: [],
  });
};

export const apiMarkReadNotification = async (userId: string, notificationId: string) => {
  const { ref, notifications } = await apiGetNotifications(userId);

  updateDoc(ref, {
    notifications: notifications.map((n) => (n.id === notificationId ? { ...n, hasBeenRead: true } : n)),
  });
};

export const apiMarkReadNotificationAll = async (userId: string) => {
  const { ref, notifications } = await apiGetNotifications(userId);

  updateDoc(ref, {
    notifications: notifications.map((n) => ({ ...n, hasBeenRead: true })),
  });
};
