import { Text, View } from 'react-native'
import React from 'react';
import tw from 'twrnc';

const notice = () => {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text>Notice Scrren</Text>
    </View>
  )
}

export default notice