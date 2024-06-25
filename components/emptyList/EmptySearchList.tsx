import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EmptySearch from '../svgs/empty-search.svg'
import tw from 'twrnc'

const EmptySearchList = () => {
  return (
    <View style={tw`py-20`}>
      <EmptySearch style={tw`mx-auto h-60 w-60`} />
      <View style={tw`max-w-md p-2 mx-auto space-y-2 border border-neutral-300 rounded-md`}>
        <View style={tw`flex items-center gap-x-2`}>
          <Text>没有找到结果</Text>
        </View>
        <Text style={tw`text-gray-500`}>使用更多可变单词或检查输入属性 </Text>
      </View>
    </View>
  )
}

export default EmptySearchList

const styles = StyleSheet.create({})