import { configureStore } from '@reduxjs/toolkit';
import companySlice from './slices/companySlice';

export const store = configureStore({
  reducer: {
    companies: companySlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
