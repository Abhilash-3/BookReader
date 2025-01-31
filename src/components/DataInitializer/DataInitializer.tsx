import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setDocuments } from '../../store/slices/documentSlice';
import { setFolders } from '../../store/slices/folderSlice';
import { loadDocuments, loadFolders } from '../../utils/storage';

export const DataInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeData = async () => {
      const savedDocuments = await loadDocuments();
      const savedFolders = await loadFolders();
      
      dispatch(setDocuments(savedDocuments));
      dispatch(setFolders(savedFolders));
    };

    initializeData();
  }, [dispatch]);

  return null;
};
