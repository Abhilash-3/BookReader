import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/common/Button/Button';
import { Header } from '../../components/common/Header/Header';
import { DocumentCard } from '../../components/DocumentCard/DocumentCard';
import { Document } from '../../types/document';
import { RootStackParamList } from '../../navigation/types';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory'
      });
      
      const newDocument: Document = {
        id: Date.now().toString(),
        name: result[0].name || 'Untitled',
        uri: result[0].fileCopyUri || result[0].uri,
        dateAdded: Date.now(),
        size: result[0].size || 0,
        type: result[0].type || 'application/pdf',
      };

      setDocuments(prev => [...prev, newDocument]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleDocumentPress = (document: Document) => {
    navigation.navigate('DocumentViewer', {
      uri: document.uri,
      title: document.name,
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <FlatList
        data={documents}
        renderItem={({ item }) => (
          <DocumentCard
            document={item}
            onPress={() => handleDocumentPress(item)}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button
          label="Upload Document"
          onPress={handleDocumentPick}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  buttonContainer: {
    padding: 16,
  },
});

export default HomeScreen;
