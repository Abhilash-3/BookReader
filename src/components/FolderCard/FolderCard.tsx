import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Folder} from '../../types/folder';
import {useTheme} from '../../hooks/useTheme';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 70) / 3; // 48 accounts for margins

interface FolderCardProps {
  folder: Folder;
  onPress: () => void;
}

export const FolderCard = ({folder, onPress}: FolderCardProps) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.folderName} numberOfLines={2}>
        {folder.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: '#F5F5F5',
    margin: 8,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  folderName: {
    marginTop: 8,
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
    textAlign: 'center',
  },
});
