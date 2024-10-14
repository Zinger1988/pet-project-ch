import { apiGenerateToken } from '../../services/apiTokens';
import { AppThunk } from '../types';
import {
  TOKEN_LOADING,
  TOKEN_GENERATED,
  TOKEN_REMOVED,
  TOKEN_CLEAR,
  TOKEN_FAILURE,
  TOKEN_CLEAR_ERROR,
} from './actionTypes';

export const loadTokenStart = () => ({ type: TOKEN_LOADING });
export const generationTokenFinish = (data: { roomId: string; token: string }) => ({
  type: TOKEN_GENERATED,
  payload: data,
});

export const tokensFailure = (error: unknown) => {
  let errorMessage = 'An error occured during token loading';
  if (typeof error === 'string') {
    errorMessage = `Error generating token: ${error}`;
  }
  return { type: TOKEN_FAILURE, payload: errorMessage };
};

export const generateToken =
  (data: { roomId: string; userId: string }): AppThunk =>
  async (dispatch) => {
    dispatch(loadTokenStart());
    try {
      const token = await apiGenerateToken(data);
      dispatch(generationTokenFinish({ roomId: data.roomId, token }));
    } catch (error) {
      dispatch(tokensFailure(error));
    }
  };

export const clearToken = () => {
  return { type: TOKEN_CLEAR };
};

export const сlearTokensError = () => {
  return { type: TOKEN_CLEAR_ERROR };
};
