// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import applicationReducer from './reducers/applicationReducer';
import componentReducer from './slices/componentSlice';
import jobReducer from './slices/jobSlice'; 
import channelReducer from './slices/channelSlice';

const store = configureStore({
  reducer: {
    applications: applicationReducer,
    components: componentReducer,
    jobs: jobReducer,
    channels: channelReducer,
    
    // Add other reducers here
  },
  devTools: composeWithDevTools(), // Enables Redux DevTools
});

export default store;
