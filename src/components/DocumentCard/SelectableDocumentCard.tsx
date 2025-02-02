import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Document } from '../../types/document';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeDocument, toggleFavorite } from '../../store/slices/documentSlice';
import { selectFolders, updateFolder } from '../../store/slices/folderSlice';
import { OptionsMenu } from '../common/OptionsMenu/OptionsMenu';
import FolderModal from '../common/Modal/FolderModal';

interface SelectableDocumentCardProps {
  document: Document;
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export const SelectableDocumentCard = ({
  document,
  isSelected,
  isSelectionMode,
  onPress,
  onLongPress,
}: SelectableDocumentCardProps) => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolders);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);

  const handleOptionsPress = (event: any) => {
    event.stopPropagation();
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
      <TouchableOpacity
        style={[styles.container, isSelected && styles.selected]}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.content}>
          <Ionicons name="document-text" size={24} color="#000000" style={styles.icon} />
          <Text style={styles.title} numberOfLines={2}>
            {document.name}
          </Text>
          {!isSelectionMode && (
            <TouchableOpacity style={styles.optionsButton} onPress={handleOptionsPress}>
              <Ionicons name="ellipsis-vertical" size={20} color="#666" />
            </TouchableOpacity>
          )}
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
        onSelectFolder={moveDocumentsToFolder}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  selected: {
    backgroundColor: '#f0f0f0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  optionsButton: {
    padding: 8,
  },
});