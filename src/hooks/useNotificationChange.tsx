import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { UserNotification } from '../types/global';
import { setNotifications } from '../store/actions/notificationActions';
import { apiOnNotificationsChange } from '../services/apiNotifications';
import { AppDispatch } from '../store/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { NotificationMessage } from '../components';

const useNotificationChange = (notifications: UserNotification[] | null) => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!user) return;

    const onRoomChange = apiOnNotificationsChange({
      userId: user.id,
      callback: (updatedNotifications) => {
        if (!notifications) {
          dispatch(setNotifications(updatedNotifications));
          return;
        }
        const wasRead = notifications.reduce<number>((acc, cur) => (cur.hasBeenRead ? acc + 1 : acc), 0);
        const readNow = updatedNotifications.reduce<number>((acc, cur) => (cur.hasBeenRead ? acc + 1 : acc), 0);
        const newNotifications = updatedNotifications.filter((un) => !notifications.some((n) => n.id === un.id));
        const handleToastRemove = (toastId: string) => toast.remove(toastId);

        newNotifications.forEach((n) => {
          const toastId = uuidv4();
          toast.custom(
            <NotificationMessage
              notification={n}
              onRemove={() => handleToastRemove(toastId)}
              onRead={() => handleToastRemove(toastId)}
            />,
            {
              id: toastId,
              position: 'bottom-right',
              duration: 5000,
            },
          );
        });

        if (notifications.length !== updatedNotifications.length || wasRead !== readNow) {
          dispatch(setNotifications(updatedNotifications));
        }
      },
    });

    return onRoomChange;
  }, [notifications, dispatch, user]);
};

export default useNotificationChange;
