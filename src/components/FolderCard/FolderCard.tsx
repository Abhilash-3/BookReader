import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Folder } from '../../types/folder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../../store/hooks';
import { removeFolder } from '../../store/slices/folderSlice';
import ConfirmationModal from '../common/Modal/ConfirmationModal';

interface FolderCardProps {
  folder: Folder;
  onPress: () => void;
}

export const FolderCard = ({ folder, onPress }: FolderCardProps) => {
  const dispatch = useAppDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleOptionsPress = (event: any) => {
    event.stopPropagation();
    setIsDeleteModalVisible(true);
  };

  const handleDelete = () => {
    dispatch(removeFolder(folder.id));
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={handleOptionsPress}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
        <View style={styles.content}>
          <Ionicons name="folder" size={35} color="#B0B0B0" />
          <Text style={styles.name} numberOfLines={2}>
            {folder.name}
          </Text>
        </View>
      </TouchableOpacity>

      <ConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDelete}
        heading={`Delete Folder`}
        title={`Are you sure you want to delete "${folder.name}"?`}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '29%',
    height: '87%',
    margin: 8,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    elevation: 2,
  },
  content: {
    alignItems: 'center',
  },
  name: {
    marginTop: '30%',
    textAlign: 'center',
    fontSize: 16,
  },
  optionsButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
});
