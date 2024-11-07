import { DocumentReference } from 'firebase/firestore';
import { MemberDTO, Room } from '../types/global';

export type RoomDTO = Omit<Room, 'members' | 'moderators' | 'createdBy'> & {
  moderators: DocumentReference[];
  createdBy: DocumentReference;
  members: MemberDTO[];
};
