import { configureStore } from '@reduxjs/toolkit';
import documentReducer from './slices/documentSlice';
import folderReducer from './slices/folderSlice';

export const store = configureStore({
  reducer: {
    documents: documentReducer,
    folders: folderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
