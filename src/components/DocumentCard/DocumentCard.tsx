import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../hooks/useTheme';
import { Document } from '../../types/document';

interface DocumentCardProps {
  document: Document;
  onPress: () => void;
}

export const DocumentCard = ({ document, onPress }: DocumentCardProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
    >
      <Icon name="description" size={30} color={theme.colors.primary} />
      <View style={styles.details}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
          {document.name}
        </Text>
        <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
          {new Date(document.dateAdded).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
  },
});
