import { StyleSheet, View, TextInput } from 'react-native'
import { useState } from 'react'
import { Stack } from 'expo-router';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  return (
    <View>
      <Stack.Screen name="login" options={{ headerShown: true, title: 'login.js' }}></Stack.Screen>
      <View>用户名：</View><TextInput value={username} onChangeText={(username)=>{setUsername(username)}}></TextInput><br />
      <View>密码:</View> <TextInput value={password} onChangeText={(password) => { setPassword(password) }}></TextInput>
    </View>
  ) 
}

export default Login

const styles = StyleSheet.create({})