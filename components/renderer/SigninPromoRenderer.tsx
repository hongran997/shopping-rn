import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import tw from 'twrnc';

const SigninPromoRenderer = (props) => {
  const { tips = '立即登录，体验更多' } = props;

  const handleJumpLogin = () => {
    router.push('/login');
  }

  return (
    <View style={tw`h-full bg-white flex items-center`}>
      <Image source={require('@/assets/images/sign-in-promo.png')} style={tw`w-[100vw] h-[58vw]` } />
      <View style={tw`pb-4`}>
        <Text style={tw`m-auto text-lg`}>你尚未登录</Text>
        <Text style={tw`m-auto text-sm`}>{ tips}</Text>
      </View>
      <Pressable style={tw`mx-auto`} onPress={handleJumpLogin}>
        <Text style={tw`px-8 py-2 bg-red-500 text-white rounded-full text-sm`}>去登录</Text>
      </Pressable>
    </View>
  )
}

export default SigninPromoRenderer

const styles = StyleSheet.create({})