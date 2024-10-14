import { Action } from '../types';
import {
  TOKEN_LOADING,
  TOKEN_GENERATED,
  TOKEN_FAILURE,
  TOKEN_CLEAR_ERROR,
  TOKEN_REMOVED,
  TOKEN_CLEAR,
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
    case TOKEN_LOADING:
      return { ...state, loading: true };
    case TOKEN_GENERATED:
      return { ...state, loading: false, tokens: [...state.tokens, action.payload] };
    case TOKEN_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case TOKEN_REMOVED:
      return {
        ...state,
        tokens: state.tokens.filter(({ roomId }) => roomId !== action.payload),
      };
    case TOKEN_CLEAR:
      return initialState;
    case TOKEN_CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default tokensReducer;
