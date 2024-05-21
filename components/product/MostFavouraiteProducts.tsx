import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import FeedSectionContainer from '../common/FeedSectionContainer';
import ProductPrice from './ProductPrice';
import DiscountProduct from './DiscountProduct';
import { useGetProductsQuery } from '@/services';
import { Link } from 'expo-router';
import Icons from '../common/Icons';

const MostFavouraiteProducts = (props) => {
  const { categorySlug } = props;

  const { products, isLoading } = useGetProductsQuery(
    {
      sort: 5,
      category: categorySlug,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data?.data?.products,
        isLoading,
      }),
    }
  )

  // console.log(products);
  
  return (
    <FeedSectionContainer title="热销商品">
      <View style={styles.container}>
        {
          products?.map((product, index) => (
            <Link href={{ pathname: `/products/${product._id}` }} asChild key={product._id}>
              <Pressable style={styles.productBox}>
                <View style={styles.ratingLine}>
                  <Text style={{marginRight: 10}}>{product.rating.toFixed(1)}</Text>
                  <Icons.FontAwesome name="star" size={24} color='rgb(251 191 36)'></Icons.FontAwesome>
                </View>
                <Image source={{ uri: product.images[0].url }} style={styles.img} />
                <View style={styles.priceLine}>
                  {
                    product.discount ? <DiscountProduct discount={product.discount}></DiscountProduct> : <View></View>
                  }
                  <ProductPrice inStock={product.inStock} discount={product.discount} price={product.price}></ProductPrice>
                </View>
              </Pressable>
            </Link>
          ))
        }
      </View>
    </FeedSectionContainer>
  )
}

export default MostFavouraiteProducts

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productBox: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'gray',
    marginBottom: 10,
  },
  ratingLine: {
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: 160,
    height: 140,
    marginVertical: 3,
    marginHorizontal: 'auto',
  },
  priceLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
})