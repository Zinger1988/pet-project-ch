import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Button, NotificationMessage, Spinner } from '../components';
import { useDispatch } from 'react-redux';
import { assertNotifications, assertUser } from '../types/assertions';
import { markReadNotificationAll, removeNotificationAll } from '../store/actions/notificationActions';
import { AppDispatch } from '../store/types';

const Notifications = () => {
  const { user } = useSelector((state: RootState) => state.userSlice);
  const { initialized, loading, notifications, error } = useSelector((state: RootState) => state.notificationsSlice);
  const dispatch = useDispatch<AppDispatch>();

  const spinnerStyles = 'absolute left-0 top-0 h-full w-full';
  const headingStyles = 'text-h2 m-0 mb-2 lg:mb-0 grow shrink';

  assertUser(user);

  if (!initialized) return null;
  if (loading) return <Spinner className={spinnerStyles} size='lg' />;

  assertNotifications(notifications);

  const handleRead = () => {
    dispatch(markReadNotificationAll(user.id));
  };

  const handleRemove = () => {
    dispatch(removeNotificationAll(user.id));
  };

  const hasNotifications = notifications.length > 0;
  const hasUnread = notifications.some((n) => !n.hasBeenRead);

  return (
    <div>
      <div className='mb-6 lg:flex lg:items-center'>
        <h1 className={headingStyles}>Notifications</h1>

        <div className='flex gap-2'>
          {hasUnread && (
            <Button size='xs' variant='primary' appearance='outline' onClick={handleRead}>
              Mark all as read
            </Button>
          )}
          {hasNotifications && (
            <Button size='xs' variant='secondary' onClick={handleRemove}>
              Remove all
            </Button>
          )}
        </div>
      </div>
      {notifications.map((n) => (
        <NotificationMessage key={n.id} notification={n} />
      ))}
    </div>
  );
};

export default Notifications;
