import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { DocumentCard } from '../DocumentCard/DocumentCard';
import { Document } from '../../types/document';

interface DocumentListProps {
  documents: Document[];
  onDocumentPress: (document: Document) => void;
}

export const DocumentList = ({ documents, onDocumentPress }: DocumentListProps) => {
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
});
