import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { Stack, useRouter, Link } from 'expo-router'
import { useCreateOrderMutation } from '@/services'
import Toast from 'react-native-toast-message'
import { useAppDispatch, useAppSelector, useUserInfo } from '@/hooks'
import { clearCart } from '@/store'
import { formatNumber } from '@/utils'
import tw from 'twrnc'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import { AuthWrapper, HandleResponse, Button, Icons, WithAddressModal, CartInfo } from '@/components'
import ResponsiveImage from '@/components/common/ResponsiveImage'
import { RadioButton } from 'react-native-paper'

const payment = () => {

  const dispatch = useAppDispatch();
  const { userInfo } = useUserInfo();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('在线支付');

  const { cartItems, totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart)

  const [ postData, { data, isSuccess, isError, isLoading, error } ] = useCreateOrderMutation()

  const handleCreateOrder = () => {
    if (!userInfo?.address?.city && !userInfo?.address?.province && !userInfo?.address?.area && 
      !userInfo?.address?.street && !userInfo?.address?.postalCode
    ) {
      return Toast.show({type:'error', text2: '请填写您的地址'})
    } else {
      postData({
        body: {
          city: userInfo.address.city.name,
          provinces: userInfo.address.province.name,
          postalCode: userInfo.address.postalCode,
          area: userInfo.address.area.name,
          street: userInfo.address.street,
        },
        mobile: userInfo.mobile,
        cart: cartItems,
        totalItems,
        totalPrice,
        totalDiscount,
        paymentMethod,
      })
    }
  }

  const ChangeAddress = () => {
    const BasicChangeAddress = ({ addressModalProps }) => {
      const { openAddressModal } = addressModalProps || {}
      // right arrow
      return (
        <Pressable onPress={openAddressModal} type="button" style={tw`flex items-center ml-auto`}>
          <Icons.AntDesign name="right" size={16} style={tw`icon text-sky-500`} />
        </Pressable>
      )
    }

    return (
      <WithAddressModal>
        <BasicChangeAddress />
      </WithAddressModal>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: '填写订单', headerBackTitleVisible: false }} />
      {
        (isSuccess || isError) &&
        <HandleResponse isSuccess={isSuccess} isError={isError}
          error={error?.data?.message} message={data?.message} onSuccess={() => {
            dispatch(clearCart());
            router.push('/profile')
          }} />
      }
      <AuthWrapper>
        <View style={tw`h-full bg-white relative`}>
          <ScrollView style={tw`bg-white`}>
            {/* Header */}
            <View style={tw`py-2 space-y-3`}>
              <View style={tw`flex flex-row justify-evenly items-center`}>
                <Link href='./cart' asChild>
                  <Pressable style={tw`flex items-center`}>
                    <Icons.AntDesign name="shoppingcart" size={18} style={tw`text-red-300 icon`} />
                    <Text>购物车</Text>
                  </Pressable>
                </Link>
                <View style={tw`w-8 h-[1px] bg-red-300`}></View>
                <Link href='' asChild>
                  <Pressable style={tw`flex items-center`}>
                    <Icons.Entypo name="location" size={16} style={tw`text-red-300 icon`} />
                    <Text>付款方式</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
            <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
            {/* Address */}
            <View style={tw`flex flex-row items-center px-3 py-4 gap-x-3`}>
              {/* location */}
              <Icons.Entypo name="location" size={16} style={tw`text-black`} />
              {/* user info */}
              {
                userInfo?.address
                  ? (<View style={tw`space-y-1`}>
                      <Text style={tw`text-black`}>{userInfo?.address?.street}</Text>
                      <Text style={tw`text-sm text-neutral-600`}>{userInfo?.name}</Text>
                    </View>)
                  : <Text style={tw`text-black`}>填写地址</Text>
              }
              <ChangeAddress />
            </View>
            <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
            {/* selected products */}
            <View style={tw`px-2 py-4 mx-3 border border-gray-200 rounded-lg m-3`}>
              <View style={tw`flex flex-row items-start mb-5`}>
                <Image source={require('@/assets/images/car.png')} style={tw`mr-4`} width={40} height={40} alt="icon" />
                <View>
                  <Text style={tw`text-base text-block`}>正常发货</Text>
                  <Text style={tw`block text-neutral-600`}>有现货</Text>
                </View>
                <View style={tw`inline-block px-2 py-1 ml-3 bg-gray-100 rounded-lg h-auto`}>
                  <Text style={tw`text-neutral-600`}>{formatNumber(totalItems)}件商品</Text>
                </View>
              </View>
              <View style={tw`flex flex-row flex-wrap justify-start gap-x-8 gap-y-5`}>
                {
                  cartItems.map(item => (
                    <View key={item.itemID}>
                      <ResponsiveImage dimensions="w-28 h-28" imageStyles={tw`w-28 h-28`} source={item.img.url} alt={item.name} />
                      {
                        item.color && (
                          <View style={tw`flex flex-row items-center gap-x-2 ml-3 mt-1.5`}>
                            <View
                              style={[tw`inline-block w-4 h-4 shadow rounded-xl`, { backgroundColor: item.color.hashCode }]}
                            />
                            <Text>{item.color.name}</Text>
                          </View>
                        )
                      }
                      {
                        item.size && (
                          <View style={tw`flex flex-row items-center gap-x-2`}>
                            <Icons.MaterialIcons name="rule" size={20} style={tw`icon`} />
                            <Text>{item.size.size}</Text>
                          </View>
                        )
                      }
                    </View>
                  ))
                }
              </View>
              <Link href="/cart" style={tw`inline-block mt-6 text-sm text-sky-500`}>
                返回购物车
              </Link>
            </View>
            <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
            {/* cart info */}
            <View style={tw`lg:border lg:border-gray-200 lg:rounded-md lg:h-fit`}>
              <CartInfo />
              <View style={tw`px-3 py-2 space-y-3`}>
                <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
                  <RadioButton.Item label="在线支付" value="在线支付" />
                  <RadioButton.Item label="银行卡" value="银行卡" />
                </RadioButton.Group>
              </View>
            </View>
          </ScrollView>
          <View style={[tw`fixed left-0 right-0 bottom-0 z-10 
            flex flex-row justify-center items-center px-3 py-3 bg-white
            border-t border-gray-300`, {paddingBottom: insets.bottom}]}>
            <Button style="w-full" isLoading={isLoading} onPress={handleCreateOrder}>完成购买</Button>
          </View>
        </View>
      </AuthWrapper>
    </>
  )
}

export default payment

const styles = StyleSheet.create({})