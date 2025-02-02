import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from '../../types/document';
import { RootState } from '../store';
import { saveDocuments } from '../../utils/storage';

interface DocumentState {
  documents: Document[];
}

const initialState: DocumentState = {
  documents: [],
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
      saveDocuments(state.documents);
    },
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter(doc => doc.id !== action.payload);
      saveDocuments(state.documents);
    },
    updateReadingProgress: (state, action: PayloadAction<{ id: string; page: number }>) => {
      const document = state.documents.find(doc => doc.id === action.payload.id);
      if (document) {
        document.lastReadPage = action.payload.page;
        saveDocuments(state.documents);
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const document = state.documents.find(doc => doc.id === action.payload);
      if (document) {
        document.isFavorite = !document.isFavorite;
        saveDocuments(state.documents);
      }
    },
  },
});

export const { 
  addDocument, 
  setDocuments, 
  removeDocument, 
  updateReadingProgress,
  toggleFavorite 
} = documentSlice.actions;

export const selectDocuments = (state: RootState) => state.documents.documents;
export const selectFavorites = (state: RootState) => 
  state.documents.documents.filter(doc => doc.isFavorite);

export default documentSlice.reducer;
