import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc';
import React from 'react'

const DisplayError = (props) => {
  const { errors } = props;
  return (
    <View style={tw`min-h-[29px]`}>
      {
        errors && (
          <View style={tw`min-w-max mt-1.5 inline-flex gap-x-1 text-sm`}>
            <Text style={tw``}>{ errors.message}</Text>
          </View>
        )
      }
    </View>
  )
}

export default DisplayError

const styles = StyleSheet.create({})