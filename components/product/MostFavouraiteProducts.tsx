import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import FeedSectionContainer from '../common/FeedSectionContainer';
import ProductPrice from './ProductPrice';
import DiscountProduct from './DiscountProduct';
import { useGetProductsQuery } from '@/services';
import { Link } from 'expo-router';
import Icons from '../common/Icons';
import Skeleton from '../common/Skeleton';
import tw from 'twrnc';

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
      <View style={tw`flex flex-row justify-between flex-wrap`}>
        {
          isLoading
            ? Array(10)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} style={ tw`w-[48%] mb-4`} >
                  <Skeleton.Item index={1} height="h-32 md:h-46" width="w-32 md:w-36" animated="background" style="rounded-md mx-auto" />
                  <Skeleton.Item index={2} height="h-5" width="w-32" animated="background" style="mt-4 mx-auto" />
                  <Skeleton.Item index={3} height="h-5" width="w-20" animated="background" style="mt-4 mx-auto" />
                </Skeleton.Items>
              ))
            : products?.map((product, index) => (
              <Link href={{ pathname: `/products/${product._id}` }} asChild key={product._id}>
                {/* TODO transition */}
                <Pressable style={tw`w-[48%] mb-2 p-1 transition border border-gray-200`}>
                  {/* rating */}
                  <View style={tw`flex flex-row gap-x-2`}>
                    {/* TODO: text-base */}
                    <Text style={tw`text-base`}>{product.rating.toFixed(1)}</Text>
                    <Icons.FontAwesome name="star" size={24} color='rgb(251 191 36)'></Icons.FontAwesome>
                  </View>
                  {/* image */}
                  <Image source={{ uri: product.images[0].url }} style={tw`h-32 w-28 my-3 mx-auto`} />
                  {/* price */}
                  <View style={tw`flex flex-row items-start ${product.discount ? 'justify-evenly' : 'justify-end pl-8'} mt-2 gay-x-2` }>
                    {
                      product.discount ? <DiscountProduct discount={product.discount}></DiscountProduct> : null
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