import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OptionsMenuProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  position: { x: number; y: number };
}

export const OptionsMenu = ({ visible, onClose, onDelete, position }: OptionsMenuProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={[styles.menu, { top: position.y, left: position.x }]}>
          <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="#FF0000" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  deleteText: {
    marginLeft: 8,
    color: '#FF0000',
    fontSize: 16,
  },
});
