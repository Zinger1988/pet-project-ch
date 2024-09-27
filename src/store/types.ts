import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from ".";
import { AnyAction } from "redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type Action = {
  type: string;
  payload?: any;
};
