import { Room, User } from './global';

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
