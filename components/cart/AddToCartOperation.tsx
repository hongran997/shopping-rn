import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react';
import { Button } from '../common/Buttons'
import CartButtons from './CartButtons';
import tw from 'twrnc'
import { useUserInfo, useAppDispatch, useAppSelector } from '@/hooks'
import Toast from 'react-native-toast-message'
import { addToCart } from '@/store'
import ProductPrice from '../product/ProductPrice';
import { existItem } from '@/utils';

const AddToCartOperation = (props) => {

  // !Important 这个页面的逻辑也很多，比较复杂，对于学习很有帮助,
  // 尤其是增加了我对useEffect的了解，缺少了useEffect 很多功能都走不通了
  // 还增加了state, redux【slice】, hooks, props, params, components, utils, package, service 组成部分的了解

  // Props
  const { product } = props;

  // State
  const [currentItemInCart, setCurrentItemInCart] = useState(undefined);
  const dispatch = useAppDispatch();
  const { cartItems, tempColor, tempSize } = useAppSelector(state => state.cart);


  // hooks
  const { mustAuthAction } = useUserInfo();
   

  // Re-Renders
  useEffect(() => {
    const item = existItem(cartItems, product._id, tempColor, tempSize);
    setCurrentItemInCart(item);
  }, [tempColor, tempSize, cartItems])

  // Fun
  const handleAddItem = () => {
    mustAuthAction(() => { 
      if (product.inStock === 0) {
        return Toast.show({
          type: 'error',
          text2: '此商品缺货'
        })
      }
      dispatch(
        addToCart({
          productID: product._id,
          name: product.title,
          price: product.price,
          discount: product.discount,
          inStock: product.inStock,
          sold: product.sold,
          img: product.images[0],
          color: tempColor,
          size: tempSize,
          quantity: 1
        })
      )
    })
  }

  return (
    <View style={tw`flex flex-row justify-between items-center px-5 py-3 bg-white border-t border-gray-300 shadow-3xl`}>
      {
        currentItemInCart
          ? <View style={tw`flex gap-x-4 w-44`}>
              <CartButtons item={currentItemInCart } />
            </View>
          : <Button onPress={handleAddItem} style={tw`px-12 text-sm btn`}>添加到购物车</Button>
      }
      <View style={tw`min-w-fit`}>
        <ProductPrice inStock={product.inStock} discount={product.discount} price={product.price}/>
      </View>
    </View>
  )
}

export default AddToCartOperation

const styles = StyleSheet.create({})