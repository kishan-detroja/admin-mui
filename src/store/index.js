import { configureStore } from '@reduxjs/toolkit';

import usersReducer from 'src/pages/users/slice/usersSlice';

import uiReducer from './slices/uiSlice';
import authReducer from '../pages/auth/slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
