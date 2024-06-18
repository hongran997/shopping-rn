import { StyleSheet, Text, View } from 'react-native'
import { formatNumber } from '@/utils'
import tw from 'twrnc'

const DiscountCartItem = (props) => {

  const { discount, price } = props;

  const discountPercent = discount / 100; 

  return (
    <>
      <View style={tw`flex flex-row`}>
        <Text style={tw`text-red-500`}>{formatNumber(+(price * discountPercent).toFixed())}</Text>
        <Text style={tw`text-red-500`}>￥折扣</Text>
      </View>
      <View style={tw`flex flex-row text-red-500`}>
        <Text>{formatNumber(+(price - (discount * price) / 100))}</Text>
        <Text>￥</Text>
      </View>
    </>
  )
}

export default DiscountCartItem

const styles = StyleSheet.create({})