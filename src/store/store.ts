import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import documentsReducer from './slices/documentSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    documents: documentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
