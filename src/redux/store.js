import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { agentReducer } from "./reducers/agentReducer";
import { ticketReducer ,ticketListReducer} from "./reducers/ticketReducer";
const reducer = combineReducers({
  ticket: ticketReducer,
  agent: agentReducer,
  ticketList: ticketListReducer,
});
const initialState = {};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  devTools: import.meta.env.PROD === false, // Enable Redux DevTools in development mode
});

export default store;
