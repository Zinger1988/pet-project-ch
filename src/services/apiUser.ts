import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { DB_USERS } from './constants';
import { UserDTO } from '../types/global';
import { UID } from 'agora-rtc-react';

export const apiSignIn = async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials;
  await signInWithEmailAndPassword(auth, email, password);
};

export const apiSignOut = async () => {
  signOut(auth);
};

export const apiSignUp = async (credentials: { name: string; email: string; password: string }) => {
  const { email, password } = credentials;
  const userData = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, DB_USERS, userData.user.uid), {
    name: credentials.name,
    email: userData.user.email,
  });

  return userData;
};

export const apiResetPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const getUsers = async (arraiIds: UID[]) => {
  const usersCollectionRef = collection(db, DB_USERS);
  const usersQuery = query(usersCollectionRef, where('__name__', 'in', arraiIds));
  const usersSnapshot = await getDocs(usersQuery);
  const users: UserDTO[] = [];

  usersSnapshot.forEach((doc) => {
    users.push({
      ...(doc.data() as UserDTO),
      id: doc.id,
    });
  });

  return users;
};

export const getUser = async (userId: string) => {
  const userRef = doc(db, DB_USERS, userId);
  const userDoc = await getDoc(userRef);

  return {
    id: userDoc.id,
    ...userDoc.data(),
  };
};
