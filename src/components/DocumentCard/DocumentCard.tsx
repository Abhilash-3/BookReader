import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Document} from '../../types/document';
import {OptionsMenu} from '../common/OptionsMenu/OptionsMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from '../../store/hooks';
import {removeDocument, toggleFavorite} from '../../store/slices/documentSlice';
import FolderModal from '../common/Modal/FolderModal';
import { useAppSelector } from '../../store/hooks';
import { selectFolders } from '../../store/slices/folderSlice';
import { updateFolder } from '../../store/slices/folderSlice';

interface DocumentCardProps {
  document: Document;
  onPress: () => void;
}

export const DocumentCard = ({document, onPress}: DocumentCardProps) => {
  const dispatch = useAppDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);
  const folders = useAppSelector(selectFolders);

  const handleOptionsPress = (event: any) => {
    const {pageX, pageY} = event.nativeEvent;
    setMenuPosition({x: pageX - 100, y: pageY + 10});
    setMenuVisible(true);
  };

  const handleDelete = () => {
    dispatch(removeDocument(document.id));
    setMenuVisible(false);
  };

  const handleFavorite = () => {
    dispatch(toggleFavorite(document.id));
    setMenuVisible(false);
  };

  const handleMove = () => {
    setMenuVisible(false);
    setIsMoveModalVisible(true);
  };
  
  const moveDocumentsToFolder = (targetFolderId: string | null) => {
    folders.forEach(folder => {
      const updatedFolder = {
        ...folder,
        documents: folder.id === targetFolderId 
          ? [...folder.documents, document.id]
          : folder.documents.filter(docId => docId !== document.id)
      };
      dispatch(updateFolder(updatedFolder));
    });
    setIsMoveModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.content}>
          <Ionicons
            name="document-text"
            size={24}
            color="#000000"
            style={styles.icon}
          />
          <Text style={styles.title} numberOfLines={2}>
            {document.name}
          </Text>
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={handleOptionsPress}>
            <Ionicons name="ellipsis-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <OptionsMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onMove={handleMove}
        onFavorite={handleFavorite}
        onDelete={handleDelete}
        isFavorite={document.isFavorite}
      />
      <FolderModal
        visible={isMoveModalVisible}
        onClose={() => setIsMoveModalVisible(false)}
        type="move"
        folders={folders}
        onSelectFolder={(folderId) => {
          moveDocumentsToFolder(folderId);
          setIsMoveModalVisible(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  optionsButton: {
    padding: 8,
  },
  icon: {
    marginRight: 12,
  },
});
