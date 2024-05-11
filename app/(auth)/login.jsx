import { StyleSheet, View, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { Stack, useRouter, userLocalSearchParams } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const params = userLocalSearchParams();
  const [email, setEmail] = useState('zhaohongran@163.com');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const onLogin = async () => {
    signIn({ email });
    router.back();
  }
  return (
    <View>
      <Stack.Screen name="login" options={{ headerShown: true, title: 'login.js' }}></Stack.Screen>
      {/* <View>用户名：</View><TextInput value={username} onChangeText={(username)=>{setUsername(username)}}></TextInput><br />
      <View>密码:</View> <TextInput value={password} onChangeText={(password) => { setPassword(password) }}></TextInput> */}
      <Pressable onPress={onLogin}><Text>Login</Text></Pressable>
    </View>
  ) 
}

export default Login

const styles = StyleSheet.create({})