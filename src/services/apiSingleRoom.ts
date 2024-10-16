import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db } from '../firebase';

import { RoomDTO } from './types';
import { Room, User } from '../types/global';
import { convertRoomData } from './helpers';
import { DB_MEMBERSHIP, DB_ROOMS, DB_USERS } from './constants';

export const apiGetRoom = async (roomId: string) => {
  const roomRef = doc(db, DB_ROOMS, roomId);
  const roomSnapshot = await getDoc(roomRef);

  if (roomSnapshot.exists()) {
    const roomData = await convertRoomData({
      room: { ...(roomSnapshot.data() as RoomDTO), id: roomSnapshot.id },
      isDetailed: true,
    });
    return roomData;
  }

  throw new FirebaseError('404', 'Room doesn`t exists');
};

export const apiOnRoomUpdates = ({ roomId, callback }: { roomId: string; callback: (room: Room) => void }) => {
  const roomRef = doc(db, DB_ROOMS, roomId);
  return onSnapshot(roomRef, async (snapshot) => {
    const roomData = await convertRoomData({
      room: {
        ...(snapshot.data() as RoomDTO),
        id: snapshot.id,
      },
    });
    callback(roomData);
  });
};

export const apiOnRoomMembersUpdate = ({ id, callback }: { id: string; callback: (members: User[]) => void }) => {
  const docRef = doc(db, DB_MEMBERSHIP, id);
  return onSnapshot(docRef, async (snapshot) => {
    const data = snapshot.data();
    const membersReq = data?.members.map((ref: DocumentReference) => {
      return getDoc(ref);
    });
    const membersDocs = await Promise.all(membersReq);
    const membersData = membersDocs.map((p) => ({ id: p.id, ...p.data() }));

    callback(membersData);
  });
};

export const apiDeleteRoom = async (roomId: string) => {
  const roomRef = doc(db, DB_ROOMS, roomId);
  const memebrshipCollectionRef = collection(db, DB_MEMBERSHIP);
  const queryRes = query(memebrshipCollectionRef, where('roomId', '==', roomId));
  const querySnapshot = await getDocs(queryRes);
  const roomParticipationsRef = querySnapshot.docs[0].ref;

  await deleteDoc(roomParticipationsRef);
  await deleteDoc(roomRef);
};

export const apiBlockUser = async (roomId: string, userId: string) => {
  const roomRef = doc(db, DB_ROOMS, roomId);

  await updateDoc(roomRef, {
    blackList: arrayUnion(userId),
  });
};

export const apiUnblockUser = async (roomId: string, userId: string) => {
  const roomRef = doc(db, DB_ROOMS, roomId);

  await updateDoc(roomRef, {
    blackList: arrayRemove(userId),
  });
};

export const apiHandleMembership = async ({
  userId,
  roomId,
  mode,
}: {
  userId: string;
  roomId: string;
  mode: 'add' | 'remove';
}) => {
  const userRef = doc(db, DB_USERS, userId);
  const memebrshipCollectionRef = collection(db, DB_MEMBERSHIP);
  const queryRes = query(memebrshipCollectionRef, where('roomId', '==', roomId), limit(1));
  const querySnapshot = await getDocs(queryRes);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    const memberDoc = await getDoc(userRef);

    await updateDoc(docRef, {
      members: mode === 'add' ? arrayUnion(userRef) : arrayRemove(userRef),
    });

    return {
      ...(memberDoc.data() as User),
      id: memberDoc.id,
    };
  } else {
    throw new FirebaseError('404', 'Membership connection doesn`t exists');
  }
};
