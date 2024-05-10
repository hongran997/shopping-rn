import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router';

const Cart = () => {
  return (
    <View>
      <Text>Cart</Text>
      <Link href="/notFound" >Go to NotFound</Link>
      <Link href="(auth)/modal">Go to modal</Link>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})