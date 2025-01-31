import React from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/common/Button/Button';
import { Header } from '../../components/common/Header/Header';
import { DocumentList } from '../../components/DocumentList/DocumentList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addDocument, selectDocuments } from '../../store/slices/documentSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Document } from '../../types/document';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const documents = useAppSelector(selectDocuments);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDocumentPress = (document: Document) => {
    navigation.navigate('DocumentViewer', {
      uri: document.uri,
      title: document.name,
    });
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory'
      });
      
      const newDocument = {
        id: Date.now().toString(),
        name: result[0].name || 'Untitled',
        uri: result[0].fileCopyUri || result[0].uri,
        dateAdded: Date.now(),
        size: result[0].size || 0,
        type: result[0].type || 'application/pdf',
      };

      dispatch(addDocument(newDocument));
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error picking document:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <DocumentList 
        documents={documents}
        onDocumentPress={handleDocumentPress}
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
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    padding: 16,
  },
});
