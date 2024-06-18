import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc'
import { FlashList } from '@shopify/flash-list'
import ProductCard from '../product/ProductCard'

const SmilarProductsSlider = (props) => {

  const { smilarProducts } = props;

  return (
    <View style={tw`px-3 py-4 overflow-hidden`}>
      <Text style={tw`mb-3 w-24`}>{smilarProducts.title}</Text>
      <FlashList
        data={smilarProducts?.products}
        renderItem={({ item, index }) => (<ProductCard product={item} key={item._id} />)}
        estimatedItemSize={200}
        horizontal
      />
    </View>
  )
}

export default SmilarProductsSlider

const styles = StyleSheet.create({})