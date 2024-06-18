import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc'

const OutOfStock = () => {
  return (
    <View style={tw`mx-3 my-5 p-1.5 rounded bg-gray-50/50`}>
      <View style={tw`flex justify-between items-center gap-x-2`}>
        <View style={tw`h-[3px] bg-gray-300 flex-1`}></View>
        <Text style={tw`text-base font-bold text-gray-500`}>库存不足</Text>
        <View style={tw`h-[3px] bg-gray-300 flex-1`}></View>
      </View>
      <Text style={tw`px-3 text-sm text-gray-700`}>
        此商品目前不可用，库存不足，您可以拨打我们电话，在其库存存在后立即通知您。
      </Text>
    </View>
  )
}

export default OutOfStock

const styles = StyleSheet.create({})