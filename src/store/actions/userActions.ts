import {
  USER_AUTH_START,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_LOGOUT,
  USER_CLEAR_ERROR,
} from "./actionTypes";
import { signInUser, signOutUser, createUser } from "../../services/userService";
import { errorsMap } from "../../helpers/errors";
import { AppThunk } from "../types";

type AuthCredentials = {
  email: string;
  password: string;
  mode: "login" | "register";
};

export const authUserAction =
  ({ email, password, mode }: AuthCredentials): AppThunk =>
  async (dispatch) => {
    dispatch({ type: USER_AUTH_START });
    try {
      const user =
        mode === "login"
          ? await signInUser({ email, password })
          : await createUser({ email, password });
      dispatch({ type: USER_AUTH_SUCCESS, payload: user });
    } catch (error: any) {
      dispatch({
        type: USER_AUTH_FAILURE,
        payload: new Error(error.code || "default"),
      });
    }
  };

export const signOutUserAction = (): AppThunk => async (dispatch) => {
  try {
    await signOutUser();
    dispatch({ type: USER_LOGOUT });
  } catch (error: any) {
    dispatch({
      type: USER_AUTH_FAILURE,
      payload: new Error(error.code || "default"),
    });
  }
};

export const clearUserError = () => {
  return { type: USER_CLEAR_ERROR };
};
