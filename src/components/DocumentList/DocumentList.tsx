import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { DocumentCard } from '../DocumentCard/DocumentCard';
import { Document } from '../../types/document';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DocumentListProps {
  documents: Document[];
  onDocumentPress: (document: Document) => void;
  screenType?: 'home' | 'library' | 'favorites';
}

export const DocumentList = ({ documents, onDocumentPress, screenType = 'home' }: DocumentListProps) => {
  const getEmptyMessage = () => {
    switch(screenType) {
      case 'home':
        return 'No documents yet. Upload a PDF to get started!';
      case 'library':
        return 'Your library is empty. Add documents to organize them here!';
      case 'favorites':
        return 'No favorite documents yet. Star documents to see them here!';
      default:
        return 'No documents available';
    }
  };

  if (documents.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-text-outline" size={45} color="#ccc" />
        <Text style={styles.emptyText}>{getEmptyMessage()}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={documents}
      renderItem={({ item }) => (
        <DocumentCard
          document={item}
          onPress={() => onDocumentPress(item)}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
});
