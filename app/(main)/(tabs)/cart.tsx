import { StyleSheet, Text, View , ScrollView} from 'react-native'
import { Link, router, Stack } from 'expo-router';
import { AuthWrapper, Button, CartInfo, CartItem, EmptyCart } from '@/components';
import { useAppSelector, useUserInfo } from '@/hooks';
import { formatNumber } from '@/utils';
import tw from 'twrnc';

const Cart = () => {

  // getUserInfo
  const { mustAuthAction } = useUserInfo();

  // store
  const { cartItems, totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart);

  const handleRoute = () => {
    mustAuthAction(() => {
      router.push({pathname: '/payment', params: {}})
    })
  }

  return (
    <>
      <Stack.Screen options={{ title: `Cart(${cartItems.length} items)` }}></Stack.Screen>
      <AuthWrapper>
        {
          cartItems.length === 0 ? (
            <View style={tw`h-full bg-white py-20`}>
              <EmptyCart style={tw`mx-auto w-52 h-52`} />
              <Text style={tw`text-base font-bold text-center`}>您的购物车是空的！</Text>
            </View>
          ) : (
            <>
              <ScrollView style={tw`bg-white`}>
                <View style={tw`py-4`}>
                  {/* count */}
                  <View style={tw`flex flex-row justify-between px-4`}>
                    <Text style={tw`text-sm font-bold`}>您的购物车</Text>
                    <Text>{formatNumber(totalItems)}件商品</Text>
                  </View>
                  {/* cart Item */}
                  <View>
                    {
                      cartItems.map(item => (
                        <CartItem item={item} key={item.itemID}></CartItem>
                      ))
                    }
                    </View>
                    <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
                    <CartInfo />
                </View>
              </ScrollView>
              {/* go skiping  */}
                <View style={tw`fixed bottom-0 left-0 right-0 z-10 
                flex flex-row justify-between items-center 
                px-3 py-3 bg-white border-t border-gray-300 lg:hidden`}>
                <View>
                  <Text>总计购物车</Text>
                  <Text>{formatNumber(totalPrice - totalDiscount)}￥</Text>
                </View>
                <Button style='w-1/2' onPress={handleRoute}>继续</Button>
              </View>
            </>
          ) 
        }
      </AuthWrapper>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({})