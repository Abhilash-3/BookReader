import AsyncStorage from '@react-native-async-storage/async-storage';
import { Document } from '../types/document';
import { Folder } from '../types/folder';

const STORAGE_KEYS = {
  DOCUMENTS: '@bookreader_documents',
  FOLDERS: '@bookreader_folders',
};

export const saveDocuments = async (documents: Document[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  } catch (error) {
    console.error('Error saving documents:', error);
  }
};

export const loadDocuments = async () => {
  try {
    const documents = await AsyncStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return documents ? JSON.parse(documents) : [];
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

export const saveFolders = async (folders: Folder[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  } catch (error) {
    console.error('Error saving folders:', error);
  }
};

export const loadFolders = async () => {
  try {
    const folders = await AsyncStorage.getItem(STORAGE_KEYS.FOLDERS);
    return folders ? JSON.parse(folders) : [];
  } catch (error) {
    console.error('Error loading folders:', error);
    return [];
  }
};
