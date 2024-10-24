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
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  description: string;
  isPrivate: boolean;
  moderator: {
    id: string;
    name: string;
    email: string;
  };
  name: string;
  members: Member[];
  membersCount: number;
  blackList: string[];
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
}
