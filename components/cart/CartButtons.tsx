import { StyleSheet, Text, View, Pressable } from 'react-native'
import Icons from '../common/Icons'
import tw from 'twrnc';
import { formatNumber } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { increase, decrease, removeFromCart } from '@/store';

const CartButtons = (props) => {
  
  const { item } = props;
  const dispatch = useAppDispatch();

  return (
    <View style={tw`flex flex-row justify-evenly items-center py-2 bg-white text-sm rounded-md`}>
      {/* TODO: active: scale-90 */}
      <Pressable onPress={() => dispatch(increase(item.itemID))} style={tw`active:scale-90`}>
        <Icons.AntDesign name="plus" size={16} style={tw`text-red-500 icon`} />
      </Pressable>
      <Text style={tw`text-sm text-center min-w-[22px]`}>{formatNumber(item.quantity)}</Text>
      {
        item.quantity === 1
          ? <Pressable onPress={() => dispatch(removeFromCart(item.itemID))} style={tw`active:scale-90`}>
              <Icons.AntDesign name="delete" size={16} style={tw`text-red-500 icon`} />
            </Pressable>
          : <Pressable onPress={() => dispatch(decrease(item.itemID))} style={tw`active:scale-90`}>
            <Icons.AntDesign name="minus" size={16} style={tw`text-red-500 icon`} />
          </Pressable>
      }
    </View>
  )
}

export default CartButtons

const styles = StyleSheet.create({})