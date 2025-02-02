import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {Header} from '../../components/common/Header/Header';
import {SelectableDocumentCard} from '../../components/DocumentCard/SelectableDocumentCard';
import {FolderCard} from '../../components/FolderCard/FolderCard';
import {useAppSelector, useAppDispatch} from '../../store/hooks';
import {selectDocuments, removeDocument} from '../../store/slices/documentSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {Document} from '../../types/document';
import {Folder} from '../../types/folder';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NewFolderCard} from '../../components/FolderCard/NewFolderCard';
import { selectFolders, addFolder, updateFolder } from '../../store/slices/folderSlice';
import FolderModal from '../../components/common/Modal/FolderModal';

export const LibraryScreen = () => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();
  const documents = useAppSelector(selectDocuments);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(
    new Set(),
  );
  const folders = useAppSelector(selectFolders);
  const [isNewFolderModalVisible, setIsNewFolderModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isMoveModalVisible, setIsMoveModalVisible] = useState(false);

  const getCurrentFolderContent = () => {
    const currentFolderDocs = currentFolder
      ? documents.filter((doc: { id: string; }) =>
          folders.find((f: { id: string; }) => f.id === currentFolder)?.documents.includes(doc.id),
        )
      : documents.filter(
        (doc: { id: string; }) => !folders.some((f: { documents: string | string[]; }) => f.documents.includes(doc.id)),
        );
    const currentFolderSubfolders = folders.filter(
      (f: { parentId: string | null; }) => f.parentId === currentFolder,
    );
    return {documents: currentFolderDocs, folders: currentFolderSubfolders};
  };

  const handleDocumentPress = (document: Document) => {
    if (isSelectionMode) {
      toggleDocumentSelection(document.id);
    } else {
      navigation.navigate('DocumentViewer', {
        uri: document.uri,
        title: document.name,
      });
    }
  };

  const handleDocumentLongPress = (documentId: string) => {
    setIsSelectionMode(true);
    setSelectedDocuments(new Set([documentId]));
  };

  const toggleDocumentSelection = (documentId: string) => {
    setSelectedDocuments(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(documentId)) {
        newSelection.delete(documentId);
        if (newSelection.size === 0) {
          setIsSelectionMode(false);
        }
      } else {
        newSelection.add(documentId);
      }
      return newSelection;
    });
  };

  const handleCreateFolder = () => {
    setIsNewFolderModalVisible(true);
  };

  const handleMoveToFolder = () => {
    setIsMoveModalVisible(true);
  };

  const handleDeleteSelected = () => {
    const selectedIds = Array.from(selectedDocuments);
    selectedIds.forEach(id => {
      dispatch(removeDocument(id));
    });
    setSelectedDocuments(new Set());
    setIsSelectionMode(false);
  };

  const createNewFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        parentId: currentFolder,
        documents: [],
      };
      dispatch(addFolder(newFolder));
      setNewFolderName('');
      setIsNewFolderModalVisible(false);
    }
  };

  const moveDocumentsToFolder = (targetFolderId: string | null) => {
    folders.forEach((folder: Folder) => {
      const updatedFolder: Folder = {
        ...folder,
        documents: folder.id === targetFolderId 
          ? [...folder.documents, ...Array.from(selectedDocuments)]
          : folder.documents.filter(docId => !selectedDocuments.has(docId))
      };
      dispatch(updateFolder(updatedFolder));
    });
    
    setSelectedDocuments(new Set());
    setIsSelectionMode(false);
    setIsMoveModalVisible(false);
  };  

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header
          title={currentFolder ? 'Folder' : 'Library'}
          showBack={!!currentFolder}
          onBackPress={() => setCurrentFolder(null)}
        />

        <View style={styles.content}>
          {/* Folders Grid Section */}
          <View style={styles.folderSection}>
            <FlatList
              data={[
                {id: 'new-folder', type: 'new-folder'},
                ...getCurrentFolderContent().folders.map((f: any) => ({
                  ...f,
                  type: 'folder' as const,
                })),
              ]}
              renderItem={({item}) => {
                if (item.type === 'new-folder') {
                  return <NewFolderCard onPress={handleCreateFolder} />;
                }
                return (
                  <FolderCard
                    folder={item as Folder}
                    onPress={() => setCurrentFolder(item.id)}
                  />
                );
              }}
              numColumns={3}
              columnWrapperStyle={styles.folderRow}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Action Buttons */}
          {isSelectionMode && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleMoveToFolder}>
                <View style={styles.moveButton}>
                  <Text style={styles.actionButtonText}>Move</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleDeleteSelected}>
                <View style={[styles.moveButton, styles.deleteButton]}>
                  <Text style={styles.actionButtonText}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Documents List */}
          <FlatList
            data={getCurrentFolderContent().documents}
            renderItem={({item}) => (
              <SelectableDocumentCard
                document={item}
                isSelected={selectedDocuments.has(item.id)}
                isSelectionMode={isSelectionMode}
                onPress={() => handleDocumentPress(item)}
                onLongPress={() => handleDocumentLongPress(item.id)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>

      {/* New Folder Modal */}
      <FolderModal
        visible={isNewFolderModalVisible}
        onClose={() => setIsNewFolderModalVisible(false)}
        type="new"
        folderName={newFolderName}
        onChangeFolderName={setNewFolderName}
        onCreateFolder={createNewFolder}
      />

      {/* Move to Folder Modal */}
      <FolderModal
        visible={isMoveModalVisible}
        onClose={() => setIsMoveModalVisible(false)}
        type="move"
        folders={folders}
        onSelectFolder={moveDocumentsToFolder}
      />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  folderSection: {
    paddingVertical: 4,
  },
  folderRow: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  moveButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#eee',
  },
  deleteButton: {
    backgroundColor: '#fee',
    borderColor: '#d66',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: 8,
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  primaryButtonText: {
    color: '#fff',
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  folderItemText: {
    marginLeft: 12,
    fontSize: 16,
  },
});
