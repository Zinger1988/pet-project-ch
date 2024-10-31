import { RTMClient } from 'agora-rtm-sdk';
import { AppNotification, Room, User } from './global';

export function assertRoom(room: Room | null): asserts room is Room {
  if (room === null) {
    throw new Error('value should have been a Room type.');
  }
}

export function assertUser(user: User | null): asserts user is User {
  if (user === null) {
    throw new Error('value should have been a User type.');
  }
}

export function assertNotifications(
  notifications: AppNotification[] | null,
): asserts notifications is AppNotification[] {
  if (!notifications) {
    throw new Error('value should have been a Notifications type.');
  }
}

export function assertRTMClinet(rtmClient: RTMClient | undefined): asserts rtmClient is RTMClient {
  if (!rtmClient) {
    throw new Error('value should have been a User type.');
  }
}

export function assertCondition(condition: any, errorMessage: string): asserts condition {
  if (!condition) {
    throw new Error(errorMessage);
  }
}
