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
      state.documents = state.documents.filter((doc: { id: string; }) => doc.id !== action.payload);
      saveDocuments(state.documents);
    },
  },
});

export const { addDocument, setDocuments, removeDocument } = documentSlice.actions;
export const selectDocuments = (state: RootState) => state.documents.documents;
export default documentSlice.reducer;
