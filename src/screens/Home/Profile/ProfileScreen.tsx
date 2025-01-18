import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';

export const ProfileScreen = () => {
  const {theme} = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: theme.colors.text}}>Profile Screen</Text>
    </View>
  );
};
