import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { saveFolders } from '../../utils/storage';
import { Folder } from '../../types/folder';

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [],
};

const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
      saveFolders(state.folders);
    },
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload;
    },
    updateFolder: (state, action: PayloadAction<Folder>) => {
      const index = state.folders.findIndex((f: { id: string; }) => f.id === action.payload.id);
      if (index !== -1) {
        state.folders[index] = action.payload;
        saveFolders(state.folders);
      }
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter((folder: { id: string; }) => folder.id !== action.payload);
      saveFolders(state.folders);
    },
  },
});

export const { addFolder, setFolders, updateFolder, removeFolder } = folderSlice.actions;
export const selectFolders = (state: RootState) => state.folders.folders;
export default folderSlice.reducer;
