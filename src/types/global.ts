import { DocumentReference } from 'firebase/firestore';

export type Theme = 'light' | 'dark';

export interface StatusBannerItem {
  status?: 'operational' | 'issue';
  statusText?: string;
}

export interface SystemStatusItem {
  description: string;
  label: string;
  status: 'operational' | 'issue';
  statusText: string;
}

export interface SystemIncidentItem {
  date: string;
  description: string;
  label: string;
  status: 'investigating' | 'resolved';
}

export interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  passwordRepeat: string;
  agreement: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdRoomRefs: DocumentReference[];
  joinedRoomRefs: DocumentReference[];
}

export interface RemoteUser extends User {
  hasAudio: boolean;
}

export interface Room {
  id: string;
  createdBy: User;
  description: string;
  isPrivate: boolean;
  moderators: User[];
  name: string;
  members: Member[];
  blackList: string[];
  requestAudio: string[];
  newMemberRole: MemberRole;
  maxRoomCapacity: number | null;
  isClosed: boolean;
  joinRequests: JoinRequestNotification[];
}

export type MemberRole = 'audience' | 'speaker';

export type MemberDTO = {
  user: DocumentReference;
  role: MemberRole;
};

export type Member = User & {
  role: MemberRole;
};

export type RoomStateDTO = {
  roomId: string;
  members: MemberDTO[];
  blackList: string[];
};

export type RoomState = {
  roomId: string;
  members: Member[];
  blackList: string[];
};

export interface CreateRoomValues {
  name: string;
  description: string;
  isPrivate: boolean;
  newMemberRole: MemberRole;
  maxRoomCapacity: number | null;
}

export enum NotificationTypes {
  JoinRoom = 'joinRoom',
  Moderate = 'moderate',
  Alert = 'alert',
  JoinRequest = 'joinRequest',
}

export interface Notification {
  id: string;
  hasBeenRead?: boolean;
}

export interface AlertNotification extends Notification {
  type: 'alert';
  message: string;
}

export interface RoleNotification extends Notification {
  type: 'moderate' | 'joinRoom';
  roomName: string;
  roomId: string;
}

export interface JoinRequestNotification extends Notification {
  type: NotificationTypes.JoinRequest;
  userId: string;
  userName: string;
  roomId: string;
  roomName: string;
}

export type UserNotification = AlertNotification | RoleNotification;

export interface AppNotificationDTO {
  notifications: UserNotification[];
}
