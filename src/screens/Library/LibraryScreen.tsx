import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {Header} from '../../components/common/Header/Header';
import {SelectableDocumentCard} from '../../components/DocumentCard/SelectableDocumentCard';
import {useAppSelector} from '../../store/hooks';
import {selectDocuments} from '../../store/slices/documentSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import {Document} from '../../types/document';
import {FlatList} from 'react-native';

export const LibraryScreen = () => {
  const {theme} = useTheme();
  const documents = useAppSelector(selectDocuments);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());

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

  const renderItem = ({item}: {item: Document}) => (
    <SelectableDocumentCard
      document={item}
      isSelected={selectedDocuments.has(item.id)}
      isSelectionMode={isSelectionMode}
      onPress={() => handleDocumentPress(item)}
      onLongPress={() => handleDocumentLongPress(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Library" />
      <Text style={styles.debug}>Selected: {selectedDocuments.size}</Text>
       <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  debug: {
    padding: 8,
    fontSize: 14,
  },
});
