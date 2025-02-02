import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OptionsMenuProps {
  visible: boolean;
  onClose: () => void;
  onMove: () => void;
  onFavorite: () => void;
  onDelete: () => void;
  isFavorite?: boolean;
}

export const OptionsMenu = ({ 
  visible, 
  onClose, 
  onMove,
  onFavorite,
  onDelete, 
  isFavorite 
}: OptionsMenuProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.menuItem} onPress={onMove}>
                <Ionicons name="folder-outline" size={24} color="#000000" />
                <Text style={styles.menuItemText}>Move to Folder</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem} onPress={onFavorite}>
                <Ionicons 
                  name={isFavorite ? "star" : "star-outline"} 
                  size={24} 
                  color="#000000" 
                />
                <Text style={styles.menuItemText}>
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
                <Ionicons name="trash-outline" size={24} color="#FF0000" />
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#000000',
  },
  deleteText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FF0000',
  },
});
