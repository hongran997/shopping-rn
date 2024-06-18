import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc'

const EmptyCustomList = () => {
  return (
    <View style={tw`flex flex-1 bg-white`}>
      <Text style={tw`text-center pt-[30%]`}>数据还没准备好呢</Text>
    </View>
  )
}

export default EmptyCustomList

const styles = StyleSheet.create({})