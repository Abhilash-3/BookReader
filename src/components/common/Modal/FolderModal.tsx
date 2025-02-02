import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FolderModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'new' | 'move';
  folderName?: string;
  onChangeFolderName?: (text: string) => void;
  onCreateFolder?: () => void;
  folders?: any[];
  onSelectFolder?: (folderId: string | null) => void;
}

const FolderModal: React.FC<FolderModalProps> = ({
  visible,
  onClose,
  type,
  folderName,
  onChangeFolderName,
  onCreateFolder,
  folders,
  onSelectFolder,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>
                {type === 'new' ? 'Create New Folder' : 'Move to Folder'}
              </Text>
              
              {type === 'new' ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={folderName}
                    onChangeText={onChangeFolderName}
                    placeholder="Folder name"
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.button, styles.primaryButton]} 
                      onPress={onCreateFolder}
                    >
                      <Text style={styles.primaryButtonText}>Create</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <FlatList
                  data={folders}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.folderItem}
                      onPress={() => onSelectFolder?.(item.id)}>
                      <Ionicons name="folder" size={24} color="#000" />
                      <Text style={styles.folderItemText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  ListHeaderComponent={() => (
                    <TouchableOpacity
                      style={styles.folderItem}
                      onPress={() => onSelectFolder?.(null)}>
                      <Ionicons name="folder" size={24} color="#000" />
                      <Text style={styles.folderItemText}>Root Folder</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  folderItemText: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default FolderModal;
