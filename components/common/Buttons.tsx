import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Loading from '../loading/Loading';
import tw from 'twrnc';

export const Button = (props) => {
  const { isLoading = false, children, style = '', isRounded = false, ...restProps } = props;

  return (
    <Pressable
      disabled={isLoading}
      style={tw`px-8 py-3 flex items-center outline-none rounded-md active:scale-[.98] bg-red-500 button ${isRounded ? 'rounded-3xl' : ''} ${style}`}
      {...restProps}>
      {
        isLoading ? <Loading /> : <Text style={tw`text-white ${style}`}>{ children }</Text>
      }
    </Pressable>
  )
}

export const LoginBtn = ({children, ...restProps}) => {
  return (
    <Button style={tw`mx-auto rounded-3xl w-44`} {...restProps}>
      {children}
    </Button>
  )
}

export const SubmitBtn = ({children, ...restProps}) => {
  return (
    <Button style={tw`w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0`} {...restProps}>
      {children}
    </Button>
  )
}

const styles = StyleSheet.create({})