cd /Users/juanjoseatenciapato/agenda-exora
cat > app/_layout.js <<'EOF'
import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { colors } from '../src/theme/exora';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <View style={{ flex: 1, backgroundColor: colors?.bg || '#f5f7fb' }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
EOF
