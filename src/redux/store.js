
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { agentReducer } from './reducers/agentReducer';
const reducer = combineReducers({
    agent: agentReducer,
    // other reducers can be added here
});
const initialState = {

  
};



const store = configureStore({
    reducer,
    preloadedState: initialState,
    devTools: import.meta.env.PROD === false, // Enable Redux DevTools in development mode
});


export default store;


