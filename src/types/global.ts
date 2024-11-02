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
  closed: boolean;
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
  Join = 'join',
  Moderate = 'moderate',
  Alert = 'alert',
}

export interface Notification {
  id: string;
  hasBeenRead?: boolean;
}

export interface AlertNotification extends Notification {
  type: 'alert';
  message: string;
}

export interface RoomNotification extends Notification {
  type: 'moderate' | 'join';
  roomName: string;
  roomId: string;
}

export type AppNotification = AlertNotification | RoomNotification;

export interface AppNotificationDTO {
  notifications: AppNotification[];
}
