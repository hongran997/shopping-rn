import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router';

const Cart = () => {
  return (
    <View>
      <Text>Cart</Text>
      <Link href="/notFound" >Go to NotFound</Link>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})