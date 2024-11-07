import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer, roomsReducer, singleRoomReducer, tokensReducer, notificationsReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserState } from './reducers/userReducer';
import { RoomsState } from './reducers/roomsReducer';
import { SingleRoomState } from './reducers/singleRoomReducer';
import { TokensState } from './reducers/tokensReducer';
import { NotificationsState } from './reducers/notificationsReducer';

const rootReducer = combineReducers({
  userSlice: userReducer,
  roomsSlice: roomsReducer,
  singleRoomSlice: singleRoomReducer,
  tokensSlice: tokensReducer,
  notificationsSlice: notificationsReducer,
});

export type RootState = {
  userSlice: UserState;
  roomsSlice: RoomsState;
  singleRoomSlice: SingleRoomState;
  tokensSlice: TokensState;
  notificationsSlice: NotificationsState;
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
