import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export const signInUser = async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials;
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response.user;
};

export const signOutUser = async () => {
  signOut(auth);
};

export const createUser = async (credentials: { email: string; password: string }) => {
  const { email, password } = credentials;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};
