import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Document} from '../../types/document';
import {useTheme} from '../../hooks/useTheme';
import {Text} from 'react-native';

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
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={500}
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
      ]}>
      <View style={styles.content}>
        <Icon 
          name="picture-as-pdf" 
          size={25} 
          color={theme.colors.primary}
          style={styles.icon}
        />
        <View style={styles.documentInfo}>
          <Text style={styles.documentName} numberOfLines={1}>
            {document.name}
          </Text>
          <Text style={styles.documentMeta}>
            {new Date(document.dateAdded).toLocaleDateString()}
          </Text>
        </View>
        {isSelectionMode && (
          <View style={styles.checkboxContainer}>
            <Icon
              name={isSelected ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={isSelected ? theme.colors.primary : theme.colors.textSecondary}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'theme.colors.text',
    borderBottomWidth: 0.3,
    borderBottomColor: 'grey'
  },
  selectedContainer: {
    // backgroundColor: '#E3F2FD',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
    marginRight: 8,
  },
  documentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  documentMeta: {
    fontSize: 12,
    color: '#666666',
  },
  checkboxContainer: {
    marginLeft: 8,
  },
});
