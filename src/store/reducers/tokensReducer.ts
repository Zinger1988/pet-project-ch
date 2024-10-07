import { Action } from '../types';
import {
  TOKEN_LOADING_START,
  TOKEN_GENERATION_FINISH,
  TOKEN_FAILURE,
  TOKEN_CLEAR_ERROR,
  TOKEN_REMOVE_FINISH,
  TOKEN_CLEAR_FINISH,
} from '../actions/actionTypes';

export type TokensState = {
  loading: boolean;
  tokens: { roomId: string; token: string }[];
  error: null | string;
};

const initialState: TokensState = {
  loading: false,
  tokens: [],
  error: null,
};

const tokensReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case TOKEN_LOADING_START:
      return { ...state, loading: true };
    case TOKEN_GENERATION_FINISH:
      return { ...state, loading: false, tokens: [...state.tokens, action.payload] };
    case TOKEN_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case TOKEN_REMOVE_FINISH:
      return {
        ...state,
        tokens: state.tokens.filter(({ roomId }) => roomId !== action.payload),
      };
    case TOKEN_CLEAR_FINISH:
      return { ...state, tokens: [] };
    case TOKEN_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default tokensReducer;
