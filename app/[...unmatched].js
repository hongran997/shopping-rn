import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router';

const NotFound = () => {
  return (
    <View>
      <Stack.Screen options={{title: '页面飞到外太空了'}}></Stack.Screen>
      <Text>notFound123123</Text>
    </View>
  )
}

export default NotFound

const styles = StyleSheet.create({})