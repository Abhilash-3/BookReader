import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type DocumentViewerProps = {
  route: RouteProp<RootStackParamList, 'DocumentViewer'>;
};

export default function DocumentViewer({ route }: DocumentViewerProps) {
  const { uri } = route.params;
  
  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});
