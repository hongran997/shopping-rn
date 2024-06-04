import { StyleSheet, Text, View } from 'react-native'
import { formatNumber } from '@/utils'
import tw from 'twrnc'

const ProductPrice = ({ inStock, discount, price }) => {
  return (
    <View>
      {/* align-self: flex-end 向容器的底部对齐 */}
      <View style={tw`flex flex-row items-center self-end`}>
        <Text style={tw`text-sm text-gray-700`}>{formatNumber(price - (discount * price) / 100)}</Text>
        <Text style={tw`ml-1`}>￥</Text>
      </View>
      <Text style={tw`text-sm text-gray-500 line-through ml-2`}>{formatNumber(price)}<Text style={tw`ml-1`}>￥</Text></Text>
    </View>
  )
}

export default ProductPrice

const styles = StyleSheet.create({
  discountPrice: {
    fontSize: 8,
  },
  realPrice: {
    fontSize: 8,
    textDecorationLine: "line-through"
  }
})