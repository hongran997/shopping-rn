import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native';
import FeedSectionContainer from '../common/FeedSectionContainer';
import DiscountProduct from '../product/DiscountProduct';
import ProductPrice from '../product/ProductPrice';
import { router, Link } from 'expo-router';
import { useGetProductsQuery } from '@/services';


const DiscountSlider = ({ currentCategory }) => {

  const handleJumpMore = () => {
    router.push('/category');
  }

  const { products, isLoading } = useGetProductsQuery(
    {
      sort: 6,
      category: currentCategory?.slug,
      page_size: 15,
      discount: true,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data?.data?.products || [],
        isLoading,
      }),
    }
  )

  return (
    <FeedSectionContainer title="折扣商品" showMore onJumptoMore={handleJumpMore}>
      <FlatList
        data={products}
        horizontal
        renderItem={({ item }) => (<Item content={item}></Item>)}
      />
    </FeedSectionContainer>
  )
}

const Item = ({content}) => {
  return (
    <Link href={{ pathname: `/products/${content._id}` }} asChild>
      <Pressable style={styles.discountProductItem}>
        <Image style={styles.img} source={{ uri: content.images[0].url }} />
        <View style={styles.productDesc}>
          <DiscountProduct discount={content.discount}></DiscountProduct>
          <ProductPrice inStock={content.inStock} discount={content.discount} price={content.price} />
        </View>
      </Pressable>
    </Link>
  )
}

export default DiscountSlider

const styles = StyleSheet.create({
  container: {

  },
  discountProductItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 50
  },
  productDesc: {
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: 32,
    height: 32,
  }
})