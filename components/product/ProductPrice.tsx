import { StyleSheet, Text, View } from 'react-native'
import { formatNumber } from '@/utils'

const ProductPrice = ({ inStock, discount, price }) => {
  return (
    <View>
      <Text style={styles.discountPrice}>{ formatNumber(price - (discount * price) / 100)} ￥</Text>
      <Text style={styles.realPrice}>{ formatNumber(price)}</Text>
    </View>
  )
}

export default ProductPrice

const styles = StyleSheet.create({
  discountPrice: {
    fontSize: 8,
  },
  realPrice: {
    fontSize: 8,
    textDecorationLine: "line-through"
  }
})