import React from 'react';

import { useColorScheme } from 'react-native';
import getTheme from './src/theme';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import StatusModal from './src/components/StatusModal';
import RootNavigator from './src/RootNavigator';
import ToastContainer from './src/components/Toast';

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={getTheme(scheme)}>
      <StatusBar />
      <RootNavigator />
      <ToastContainer />
    </NavigationContainer>
  );
}
