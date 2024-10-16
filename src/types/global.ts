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
  members: {
    id: string;
    total: number;
    collection: User[];
  };
  isDetailed: boolean;
  blackList: string[];
}

export interface CreateRoomValues {
  name: string;
  description: string;
  isPrivate: boolean;
}
