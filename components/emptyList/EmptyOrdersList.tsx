import { StyleSheet, Text, View } from 'react-native'
import OrderEmpty from '../svgs/order-empty.svg'
import tw from 'twrnc'

const EmptyOrdersList = () => {
  return (
    <View style={tw`py-20`}>
      <OrderEmpty style={tw`mx-auto h-52 w-52`} />

      <Text style={tw`text-center`}>列表为空</Text>
    </View>
  )
}

export default EmptyOrdersList

const styles = StyleSheet.create({})