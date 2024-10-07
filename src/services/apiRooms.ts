import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';

import { db } from '../firebase';
import { RoomDTO } from './types';
import { convertRoomData } from './helpers';
import { CreateRoomValues } from '../types/global';
import { DB_MEMBERSHIP, DB_ROOMS, DB_USERS } from './constants';

export const apiCreateRoom = async (values: CreateRoomValues & { createdBy: string }) => {
  const userRef = await doc(db, DB_USERS, values.createdBy);
  const room = await addDoc(collection(db, DB_ROOMS), {
    ...values,
    createdBy: userRef,
    moderator: userRef,
  });

  await addDoc(collection(db, DB_MEMBERSHIP), {
    roomId: room.id,
    members: [userRef],
  });

  return room;
};

export const apiGetRooms = async ({ userId, userRooms = false }: { userId: string; userRooms?: boolean }) => {
  const roomsCollectionRef = collection(db, DB_ROOMS);
  const userRef = await doc(db, DB_USERS, userId);
  const rooms: RoomDTO[] = [];
  let roomsQuery = null;

  if (userRooms) {
    // fetching rooms where user has membership
    const roomsAsMember = await getRoomsWhereUserHasMembership(userId);
    rooms.push(...roomsAsMember);
    roomsQuery = query(roomsCollectionRef, where('createdBy', '==', userRef));
  } else {
    roomsQuery = query(roomsCollectionRef, where('createdBy', '!=', userRef));
  }

  const roomsSnapshot = await getDocs(roomsQuery);

  roomsSnapshot.forEach((doc) => {
    rooms.push({
      ...(doc.data() as RoomDTO),
      id: doc.id,
    });
  });

  const roomsData = rooms.map((room: RoomDTO) => convertRoomData({ room }));
  return Promise.all(roomsData);
};

export const getRoomsWhereUserHasMembership = async (userId: string) => {
  const userRef = await doc(db, DB_USERS, userId);
  const roomsCollectionRef = collection(db, DB_ROOMS);
  const membershipCollectionRef = collection(db, DB_MEMBERSHIP);
  const roomsId: string[] = [];

  const membershipsQuery = query(membershipCollectionRef, where('members', 'array-contains', userRef));

  const membershipsSnapshot = await getDocs(membershipsQuery);

  membershipsSnapshot.forEach((doc) => {
    const { roomId } = doc.data();
    roomsId.push(roomId);
  });

  const roomsQuery = query(roomsCollectionRef, where('__name__', 'in', roomsId));
  const roomsSnapshot = await getDocs(roomsQuery);
  const rooms: RoomDTO[] = [];

  roomsSnapshot.forEach((doc) => {
    const docData = doc.data();

    if (docData.createdBy.id !== userRef.id) {
      rooms.push({
        ...(docData as RoomDTO),
        id: doc.id,
      });
    }
  });

  return rooms;
};
