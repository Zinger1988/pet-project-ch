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
import { v4 as uuidv4 } from 'uuid';

import { RoomDTO } from './types';
import { CreateRoomValues, MemberDTO, MemberRole, Room } from '../types/global';
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

export const apiOnRoomChange = ({ id, callback }: { id: string; callback: (room: Room) => void }) => {
  const roomRef = doc(db, DB_ROOMS, id);

  return onSnapshot(roomRef, async (snapshot) => {
    if (!snapshot.exists()) return;

    const data = snapshot.data() as RoomDTO;
    const room = await convertRoomData({ room: data, isDetailed: true });

    callback(room);
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
        moderators:
          mode === 'remove'
            ? roomSnapshotData.moderators.filter((moderator) => moderator.id !== userId)
            : roomSnapshotData.moderators,
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

export const apiHandleRole = async ({ userId, roomId, role }: { userId: string; roomId: string; role: MemberRole }) => {
  const roomRef = doc(db, DB_ROOMS, roomId);

  try {
    const roomDoc = await getDoc(roomRef);
    const { members } = roomDoc.data() as RoomDTO;
    const updatedMembers = members.map((m) => {
      return m.user.id === userId ? { ...m, role } : m;
    });

    await updateDoc(roomRef, {
      members: updatedMembers,
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
    moderators: [userRef],
    blackList: [],
    members: [{ user: userRef, role: 'speaker' }],
    requestAudio: [],
    joinRequests: [],
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

export const apiHandleModerator = async ({
  userId,
  roomId,
  mode,
}: {
  userId: string;
  roomId: string;
  mode: 'add' | 'remove';
}) => {
  const userRef = await doc(db, DB_USERS, userId);
  const roomRef = await doc(db, DB_ROOMS, roomId);
  await updateDoc(roomRef, {
    moderators: mode === 'add' ? arrayUnion(userRef) : arrayRemove(userRef),
  });
};

export const apiHandleCloseRoom = async ({ roomId, mode }: { roomId: string; mode: 'open' | 'close' }) => {
  const roomRef = await doc(db, DB_ROOMS, roomId);
  await updateDoc(roomRef, {
    isClosed: mode === 'close',
  });
};

export const apiJoinRequest = async ({
  roomId,
  userId,
  userName,
  mode,
  roomName,
}: {
  roomId: string;
  userId: string;
  userName: string;
  roomName: string;
  mode: 'add' | 'remove';
}) => {
  const roomRef = await doc(db, DB_ROOMS, roomId);
  const roomDoc = await getDoc(roomRef);
  const roomData = roomDoc.data() as RoomDTO;
  const joinRequests =
    mode === 'add'
      ? [...roomData.joinRequests, { id: uuidv4(), roomId, userName, userId, roomName, type: 'joinRequest' }]
      : roomData.joinRequests.filter((jr) => jr.userId !== userId);

  await updateDoc(roomRef, {
    joinRequests,
  });
};
