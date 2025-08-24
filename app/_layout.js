import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';

// Layout principal con tema oscuro y soporte para gestos
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
