import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header/Header';
import { DocumentList } from '../../components/DocumentList/DocumentList';
import { useAppSelector } from '../../store/hooks';
import { selectFavorites } from '../../store/slices/documentSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Document } from '../../types/document';

export const FavoritesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favoriteDocuments = useAppSelector(selectFavorites);

  const handleDocumentPress = (document: Document) => {
    navigation.navigate('DocumentViewer', {
      uri: document.uri,
      title: document.name
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Favorites" />
      <DocumentList 
        documents={favoriteDocuments}
        onDocumentPress={handleDocumentPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
