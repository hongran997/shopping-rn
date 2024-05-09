import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';

import { Stack } from 'expo-router/stack';
import { persistStore } from 'redux-persist';
import store from '../store/index';
const persistor = persistStore(store);
console.log(DefaultTheme);

export default function AppLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'app.js' }} />
            </Stack>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

