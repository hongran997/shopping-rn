import { StyleSheet, Text, View } from 'react-native'
import ResponsiveImage from '../common/ResponsiveImage'
import SpecialSell from '../product/SpecialSell'
import CartButtons from './CartButtons'
import { Link } from 'expo-router'
import Icons from '../common/Icons'
import tw from 'twrnc'
import DiscountCartItem from './DiscountCartItem'
import { formatNumber } from '@/utils'

const CartItem = (props) => {

  const { item } = props;
  
  return (
    <View style={tw`flex flex-row px-4 py-5`}>
      {/* left: pic */}
      <View style={tw`w-28`}>
        <ResponsiveImage style={tw`w-28 aspect-square`} imageStyles={tw`w-full h-full`} source={item.img.url} alt={item.name}></ResponsiveImage>
        <SpecialSell discount={item.discount} inStock={item.inStock} style="w-20 mx-auto"/>
        <CartButtons item={item} />
      </View>
      {/* right: Attr */}
      <View style={tw`flex-1 gap-y-2`}>
        { 
          item.name && <Link href={`/product/${item.productID}`}>{item.name}</Link>
        }
        {
          item.color && (
            <View style={tw`flex flex-row gap-x-2`}>
              <View style={[tw`w-5 h-5 rounded-full`, { backgroundColor: item.color.hashCode }]}></View>
              <Text>{ item.color.name }</Text>
            </View>
          )
        }
        {
          item.size && (
            <View style={tw`flex flex-row gap-x-2`}>
              <Icons.MaterialIcons name="rule" size={20} style={tw`icon`} />
              <Text>{ item.size.size}</Text>
            </View>
          )
        }
        <View style={tw`flex flex-row gap-x-2`}>
          <Icons.Ionicons name="shield-checkmark-outline" size={20} style={tw`icon`} />
          <Text style={tw`font-light`}>正品保证和发货保证</Text>
        </View>
        <View style={tw`flex flex-row gap-x-2`}>
          <Icons.MaterialIcons name="save" size={20} style={tw`icon text-sky-400`} />
          <Text style={tw`font-light`}>仓库有售</Text>
        </View>
        {
          (item.discount > 0 && item.price)
            ? <DiscountCartItem discount={item.discount} price={item.price} />
            : item.price
              ? <View style={tw`flex flex-row items-center gap-x-2`}>
                  <Text style={tw`text-sm text-gray-700`}>{formatNumber(item.price)}</Text>
                  <Text>￥</Text>
                </View>
              : null
        }
      </View>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({})