import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer, testReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  authSlice: authReducer,
  testSlice: testReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
