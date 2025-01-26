import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { RootStackParamList } from './types';
import { useTheme } from '../hooks/useTheme';
import DocumentViewer from '../screens/DocumentViewer/DocumentViewer';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerShown: true,
          contentStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Stack.Screen 
          name="BottomTabs" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="DocumentViewer" 
          component={DocumentViewer}
          options={({ route }) => ({ 
            title: route.params.title,
            headerShown: true 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
