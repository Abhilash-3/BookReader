import { useState } from 'react';
import { Document } from '../types/document';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDocumentPress = (document: Document) => {
    navigation.navigate('DocumentViewer', {
      uri: document.uri,
      title: document.name,
    });
  };

  return {
    documents,
    setDocuments,
    handleDocumentPress,
  };
};
