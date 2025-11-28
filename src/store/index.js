import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import usersReducer from '../pages/users/slice/usersSlice';

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
