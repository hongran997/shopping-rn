import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false, title: '(authLayout/login)' }}></Stack.Screen>
      <Stack.Screen name="register" options={{ headerShown: false, title: '(authLayout/register)' }}></Stack.Screen>
      <Stack.Screen name="modal" options={{ headerShown: true, title: '(authLayout/modal)', presentation: 'modal' }}></Stack.Screen>
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})