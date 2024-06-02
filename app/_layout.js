import { Stack } from 'expo-router/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { StatusBar } from 'react-native'

import { store } from '@/store'

const persistor = persistStore(store)

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={{ tw:`flex pt:${StatusBar.currentHeight}`}}>
          <Stack>
            <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(main)/product/index" getId={({ params }) => params.category} />
          </Stack>
          <Toast />
          </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}