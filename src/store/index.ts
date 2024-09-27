import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userReducer, roomsReducer, singleRoomReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserState } from "./reducers/userReducer";
import { RoomsState } from "./reducers/roomsReducer";
import { SingleRoomState } from "./reducers/singleRoomReducer";

const rootReducer = combineReducers({
  userSlice: userReducer,
  roomsSlice: roomsReducer,
  singleRoomSlice: singleRoomReducer,
});

export type RootState = {
  userSlice: UserState;
  roomsSlice: RoomsState;
  singleRoomSlice: SingleRoomState;
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
