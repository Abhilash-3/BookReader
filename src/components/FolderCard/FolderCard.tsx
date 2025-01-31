import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Folder } from '../../types/folder';
import { OptionsMenu } from '../common/OptionsMenu/OptionsMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../../store/hooks';
import { removeFolder } from '../../store/slices/folderSlice';

interface FolderCardProps {
  folder: Folder;
  onPress: () => void;
}

export const FolderCard = ({ folder, onPress }: FolderCardProps) => {
  const dispatch = useAppDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleOptionsPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX - 100, y: pageY + 10 });
    setMenuVisible(true);
  };

  const handleDelete = () => {
    dispatch(removeFolder(folder.id));
    setMenuVisible(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {folder.name}
        </Text>
        <TouchableOpacity 
          style={styles.optionsButton}
          onPress={handleOptionsPress}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <OptionsMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onDelete={handleDelete}
        position={menuPosition}
      />
    </TouchableOpacity>
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
