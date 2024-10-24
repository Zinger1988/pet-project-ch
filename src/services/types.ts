import { DocumentReference } from 'firebase/firestore';
import { MemberDTO, Room } from '../types/global';

export type RoomDTO = Omit<Room, 'members' | 'moderator' | 'createdBy'> & {
  moderator: DocumentReference;
  createdBy: DocumentReference;
  members: MemberDTO[];
};
