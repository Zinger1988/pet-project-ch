import { collection, doc, DocumentSnapshot, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

import { RoomDTO } from './types';
import { User } from '../types/global';
import { convertRoomData } from './helpers';
import { DB_ROOMS, DB_USERS } from './constants';

export const apiGetRooms = async ({ userId, userRooms = false }: { userId: string; userRooms?: boolean }) => {
  const rooms = await getUserRooms(userId, userRooms);
  const roomsData = await Promise.all(rooms.map((room: RoomDTO) => convertRoomData({ room })));

  if (!userRooms) {
    const nonUserRooms = roomsData.filter((room) => {
      const isClosed = room.closed;
      const isMember = room.members.some((m) => m.id === userId);

      return !isClosed && !isMember;
    });

    return nonUserRooms;
  }

  return roomsData;
};

export const getUserRooms = async (userId: string, userRooms: boolean = false) => {
  const roomsSnap: DocumentSnapshot[] = [];
  const userRef = await doc(db, DB_USERS, userId);

  if (userRooms) {
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as User;

    const { createdRoomRefs, joinedRoomRefs } = userData;
    const createdRoomsReq = createdRoomRefs.map((roomRef) => getDoc(roomRef));
    const joinedRoomReq = joinedRoomRefs.map((roomRef) => getDoc(roomRef));

    const [createdRoomsSnap, joinedRoomSnap]: [DocumentSnapshot[], DocumentSnapshot[]] = await Promise.all([
      Promise.all(createdRoomsReq),
      Promise.all(joinedRoomReq),
    ]);

    [...createdRoomsSnap, ...joinedRoomSnap].forEach((snap) => {
      snap.exists() && roomsSnap.push(snap);
    });
  } else {
    const roomsCollectionRef = collection(db, DB_ROOMS);
    const otherRoomsQuery = query(roomsCollectionRef, where('createdBy', '!=', userRef));
    const otherRoomsSnap = await getDocs(otherRoomsQuery);

    otherRoomsSnap.forEach((snap) => snap.exists() && roomsSnap.push(snap));
  }

  const rooms = roomsSnap.map((snap) => {
    return { id: snap.id, ...(snap.data() as Omit<RoomDTO, 'id'>) };
  });

  return rooms;
};
