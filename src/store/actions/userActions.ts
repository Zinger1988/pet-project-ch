import {
  USER_LOOKUP_START,
  USER_LOOKUP_FINISH,
  USER_LOOKUP_FAILURE,
  USER_LOGOUT,
  USER_CLEAR_ERROR,
} from "./actionTypes";
import { createUser, signInUser, signOutUser } from "../../services/userService";
import { AppThunk } from "../types";
import { User, UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const userSignOut = (): AppThunk => async (dispatch) => {
  try {
    await signOutUser();
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    let errorMessage = "default";
    if (error instanceof FirebaseError) {
      errorMessage = error.code;
    }
    dispatch(userLookupFailure(errorMessage));
  }
};

export const userLookupStart = () => {
  return { type: USER_LOOKUP_START };
};

export const userLookupFinish = (user: User | UserCredential | null) => {
  return { type: USER_LOOKUP_FINISH, payload: user };
};

export const userLookupFailure = (error: string) => {
  return { type: USER_LOOKUP_FAILURE, payload: error };
};

export const userClearError = () => {
  return { type: USER_CLEAR_ERROR };
};

type AuthCredentials = {
  email: string;
  password: string;
  mode: "login" | "register";
};

export const userLookup =
  ({ email, password, mode }: AuthCredentials): AppThunk =>
  async (dispatch) => {
    dispatch(userLookupStart());
    try {
      mode === "login"
        ? await signInUser({ email, password })
        : await createUser({ email, password });
    } catch (error) {
      let errorMessage = "An error occured during password reset";
      if (error instanceof FirebaseError) {
        errorMessage = error.code;
      }
      dispatch(userLookupFailure(errorMessage));
    }
  };
