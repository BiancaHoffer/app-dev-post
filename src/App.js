import React from 'react';
import { LogBox } from 'react-native';
import { AuthProvider } from './contexts/auth';

import { ThemeProvider } from 'styled-components';
import theme from './theme';

import { Routes } from './routes';

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release"]);

export function App() {
 return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
       <Routes/>
      </ThemeProvider>
    </AuthProvider>
  );
}
