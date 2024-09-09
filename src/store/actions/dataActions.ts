import { AppThunk } from "../types";
import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "./actionTypes";

export const fetchData = (): AppThunk => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();
    dispatch({ type: FETCH_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: FETCH_FAILURE, payload: new Error(error.message) });
  }
};
