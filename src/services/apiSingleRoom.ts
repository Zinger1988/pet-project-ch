import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { db } from "../firebase";
import { RoomDTO } from "./types";
import { Member } from "../types/global";
import { convertRoomData } from "./helpers";
import { DB_MEMBERSHIP, DB_ROOMS, DB_USERS } from "./constants";

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

  throw new FirebaseError("404", "Room doesn`t exists");
};

export const apiDeleteRoom = async (roomId: string) => {
  const roomRef = doc(db, DB_ROOMS, roomId);
  const memebrshipCollectionRef = collection(db, DB_MEMBERSHIP);

  const queryRes = query(
    memebrshipCollectionRef,
    where("roomId", "==", roomId),
    limit(1)
  );

  const querySnapshot = await getDocs(queryRes);
  const roomPerticipationsRef = querySnapshot.docs[0].ref;

  Promise.all([deleteDoc(roomPerticipationsRef), deleteDoc(roomRef)]);
};

export const apiHandleMembership = async ({
  userId,
  roomId,
  mode,
}: {
  userId: string;
  roomId: string;
  mode: "add" | "remove";
}) => {
  const userRef = doc(db, DB_USERS, userId);
  const memebrshipCollectionRef = collection(db, DB_MEMBERSHIP);

  const queryRes = query(
    memebrshipCollectionRef,
    where("roomId", "==", roomId),
    limit(1)
  );
  const querySnapshot = await getDocs(queryRes);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    const memberDoc = await getDoc(userRef);
    await updateDoc(docRef, {
      members: mode === "add" ? arrayUnion(userRef) : arrayRemove(userRef),
    });

    return {
      ...(memberDoc.data() as Member),
      id: memberDoc.id,
    };
  } else {
    throw new FirebaseError("404", "Membership connection doesn`t exists");
  }
};
