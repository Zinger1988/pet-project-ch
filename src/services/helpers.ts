import { collection, DocumentReference, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

import { User, Room } from '../types/global';
import { RoomDTO } from './types';
import { db } from '../firebase';
import { DB_MEMBERSHIP } from './constants';

export const convertRoomData = async ({
  room,
  isDetailed = false,
}: {
  room: RoomDTO;
  isDetailed?: boolean;
}): Promise<Room> => {
  const createdBy = await getDoc(room.createdBy);
  const moderator = await getDoc(room.moderator);
  const roomId = room.id;
  const members = await getMembers(roomId);
  let visibleMembers = null;

  if (!isDetailed) {
    visibleMembers = members.collection.slice(0, 4);
  } else {
    visibleMembers = members.collection;
  }

  return {
    ...room,
    id: roomId,
    createdBy: {
      id: createdBy.id,
      ...(createdBy.data() as { name: string; email: string }),
    },
    moderator: {
      id: moderator.id,
      ...(moderator.data() as { name: string; email: string }),
    },
    members: {
      id: members.id,
      total: visibleMembers.length,
      collection: visibleMembers,
    },
    isDetailed,
  };
};

export const getMembers = async (roomId: string): Promise<{ id: string; collection: User[] }> => {
  const memebrshipCollectionRef = collection(db, DB_MEMBERSHIP);
  const q = query(memebrshipCollectionRef, where('roomId', '==', roomId), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    const membersReq = data.members.map((ref: DocumentReference) => {
      return getDoc(ref);
    });
    const membersDocs = await Promise.all(membersReq);
    const membersData = membersDocs.map((p) => ({ id: p.id, ...p.data() }));

    return {
      id: doc.id,
      collection: membersData,
    };
  }

  throw new FirebaseError('404', 'No room participators founded');
};
