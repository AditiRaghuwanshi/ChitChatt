






import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

// Combine all reducers
const appReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [miscSlice.name]: miscSlice.reducer,
  [chatSlice.name]: chatSlice.reducer,
  [api.reducerPath]: api.reducer,
});

// Custom root reducer to reset state on logout
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined; // reset entire redux state
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(api.middleware),
});

export default store;
