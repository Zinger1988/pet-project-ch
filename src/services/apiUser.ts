import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { User } from '../types/global';
import { DB_USERS } from './constants';

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

export const apiGetUsers = async (arrayIds: string[]) => {
  const usersCollectionRef = collection(db, DB_USERS);
  const usersQuery = query(usersCollectionRef, where('__name__', 'in', arrayIds));
  const usersSnapshot = await getDocs(usersQuery);
  const users: User[] = [];

  usersSnapshot.forEach((doc) => {
    users.push({
      ...(doc.data() as User),
      id: doc.id,
    });
  });

  return users;
};

export const apiGetUser = async (userId: string) => {
  const userRef = doc(db, DB_USERS, userId);
  const userDoc = await getDoc(userRef);

  return {
    ...(userDoc.data() as User),
    id: userDoc.id,
  };
};
