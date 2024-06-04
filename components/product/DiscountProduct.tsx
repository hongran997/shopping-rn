import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc'

const DiscountProduct = ({ discount }) => {
  return (
    <View style={tw`w-fit h-fit pt-0.5 px-3 bg-red-500  block rounded-full overflow-hidden`}>
      <Text style={tw`text-white`}>{discount}%</Text>
    </View>
  )
}

export default DiscountProduct