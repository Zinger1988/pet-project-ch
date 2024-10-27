import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db } from '../firebase';

import { RoomDTO } from './types';
import { CreateRoomValues, MemberDTO, MemberRole, Room, User } from '../types/global';
import { convertRoomData } from './helpers';
import { DB_ROOMS, DB_USERS } from './constants';

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

export const apiOnRoomStateUpdate = ({
  id,
  callback,
}: {
  id: string;
  callback: (members: User[], blackList: string[], requestAudio: string[]) => void;
}) => {
  const roomRef = doc(db, DB_ROOMS, id);

  return onSnapshot(roomRef, async (snapshot) => {
    if (!snapshot.exists()) return;

    const data = snapshot.data() as RoomDTO;
    const membersRoles = data.members.map((member) => member.role);
    const membersReq = data.members.map((member) => {
      return getDoc(member.user);
    });
    const membersDocs = await Promise.all(membersReq);
    const membersData = membersRoles.map((role, i) => ({
      id: membersDocs[i].id,
      role,
      ...(membersDocs[i].data() as Omit<User, 'id'>),
    }));

    callback(membersData, data.blackList, data.requestAudio);
  });
};

export const apiDeleteRoom = async (roomId: string, userId: string) => {
  const roomRef = doc(db, DB_ROOMS, roomId);
  const userRef = doc(db, DB_USERS, userId);

  await updateDoc(userRef, {
    createdRoomRefs: arrayRemove(roomRef),
  });

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
  role = 'audience',
}: {
  userId: string;
  roomId: string;
  mode: 'add' | 'remove';
  role?: MemberRole;
}) => {
  const userRef = doc(db, DB_USERS, userId);
  const roomRef = doc(db, DB_ROOMS, roomId);
  const roomSnapshot = await getDoc(roomRef);
  const roomSnapshotData = roomSnapshot.data() as RoomDTO;
  const memberRef = doc(db, DB_USERS, userId);

  let updatedMembers: MemberDTO[] = [];

  if (mode === 'add') {
    const hasMember = roomSnapshotData.members.some((member) => member.user === memberRef);
    if (!hasMember) {
      updatedMembers = [...roomSnapshotData.members, { user: memberRef, role }];
    }
  } else {
    updatedMembers = roomSnapshotData.members.filter((member) => member.user.id !== memberRef.id);
  }

  try {
    Promise.all([
      updateDoc(userRef, {
        joinedRoomRefs: mode === 'add' ? arrayUnion(roomRef) : arrayRemove(roomRef),
      }),
      updateDoc(roomRef, {
        members: updatedMembers,
      }),
    ]);
  } catch (e) {
    console.error(e);
  }
};

export const apiHandleBlackList = async ({
  userId,
  roomId,
  mode,
}: {
  userId: string;
  roomId: string;
  mode: 'add' | 'remove';
}) => {
  const roomRef = doc(db, DB_ROOMS, roomId);

  try {
    await updateDoc(roomRef, {
      blackList: mode === 'add' ? arrayUnion(userId) : arrayRemove(userId),
    });
  } catch (e) {
    console.error(e);
  }
};

export const apiCreateRoom = async (values: CreateRoomValues & { createdBy: string }) => {
  const userRef = await doc(db, DB_USERS, values.createdBy);
  const roomRef = await addDoc(collection(db, DB_ROOMS), {
    ...values,
    createdBy: userRef,
    moderator: userRef,
    blackList: [],
    members: [{ user: userRef, role: 'speaker' }],
    requestAudio: [],
  });

  await updateDoc(userRef, {
    createdRoomRefs: arrayUnion(roomRef),
  });

  return roomRef;
};

export const apiRequestAudio = async ({
  userId,
  roomId,
  mode,
}: {
  userId: string;
  roomId: string;
  mode: 'add' | 'remove';
}) => {
  const roomRef = await doc(db, DB_ROOMS, roomId);
  await updateDoc(roomRef, {
    requestAudio: mode === 'add' ? arrayUnion(userId) : arrayRemove(userId),
  });
};
