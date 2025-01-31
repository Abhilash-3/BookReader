import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../hooks/useTheme';
import { Dimensions } from 'react-native';

interface NewFolderCardProps {
  onPress: () => void;
}

export const NewFolderCard = ({onPress}: NewFolderCardProps) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 70) / 3;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: '#F5F5F5',
    margin: 8,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  text: {
    marginTop: 8,
    fontSize: 30,
    color: '#757575',
    fontWeight: '500',
    textAlign: 'center',
  }
});
