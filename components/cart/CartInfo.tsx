import { StyleSheet, Text, View } from 'react-native'
import { useAppSelector } from '@/hooks'
import { formatNumber } from '@/utils'
import tw from 'twrnc'

const CartInfo = (props) => {

  const { totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart);

  return (
    <View style={tw`px-4 py-2 lg:mt-0 lg:h-fit lg:py-4 gap-y-2`}>
      {/* total cart price */}
      <View style={tw`flex flex-row justify-between items-center border-b border-gray-200 pb-2`}>
        <Text>商品价格({formatNumber(totalItems)}件商品)</Text>
        <Text style={tw`gap-x-1 text-sm`}>{formatNumber(totalPrice)}¥</Text>
      </View>
      {/* total cart items */}
      <View style={tw`flex flex-row justify-between items-center`}>
        <Text>总计购物车</Text>
        <Text style={tw`gap-x-1 text-sm`}>{formatNumber(totalPrice - totalDiscount)}¥</Text>
      </View>
      {/*  */}
      <Text style={tw`w-full pb-2 border-b border-gray-200 inline-block`}>
        运费是根据您的货件的地址、交货时间、重量和体积计算的
      </Text>
      {/* total cart profit */}
      <View style={tw`flex flex-row justify-between items-center`}>
        <Text style={tw`text-red-500`}>您从购买中省去的金额</Text>
        <Text style={tw`text-red-500`}>({((totalDiscount / totalPrice) * 100).toFixed(1)}%) {formatNumber(totalDiscount)}¥</Text>
      </View>
    </View>
  )
}

export default CartInfo

const styles = StyleSheet.create({})