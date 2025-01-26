import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from '../../types/document';

interface DocumentsState {
  items: Document[];
}

const initialState: DocumentsState = {
  items: [],
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Document>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addDocument } = documentsSlice.actions;
export const selectDocuments = (state: { documents: DocumentsState }) => state.documents.items;
export default documentsSlice.reducer;
