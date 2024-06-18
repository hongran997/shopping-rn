import { StyleSheet, Text, View } from 'react-native'
import FreeShippingSvg from './svgs/freeShipping.svg'
import tw from 'twrnc'

const FeedShipping = () => {
  return (
    <View style={tw`px-4 py-5 bg-gray-100`}>
      <View style={tw`flex flex-row justify-between bg-white border border-gray-300 rounded-lg`}>
        <View style={tw`p-3`}>
          <Text>免费送货</Text>
          <Text style={tw`mt-2 text-xs text-gray-500 lg:text-sm`}>订单量超过50万</Text>
        </View>
        <FreeShippingSvg style={tw`w-32 h-20 px-4`} />
      </View>
    </View>
  )
}

export default FeedShipping

const styles = StyleSheet.create({})