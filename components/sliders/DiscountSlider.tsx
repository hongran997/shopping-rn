import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native';
import FeedSectionContainer from '../common/FeedSectionContainer';
import Skeleton from '../common/Skeleton';
import DiscountProduct from '../product/DiscountProduct';
import ProductPrice from '../product/ProductPrice';
import { router, Link } from 'expo-router';
import { useGetProductsQuery } from '@/services';
import tw from 'twrnc';


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
      {
        isLoading
          ? <DiscountSkeleton />
          : !products.length
            ? null
            : <FlatList
                data={products}
                horizontal
                renderItem={({ item }) => (<Item content={item}></Item>)}
              />
      }
      
    </FeedSectionContainer>
  )
}

const Item = ({content}) => {
  return (
    <Link href={{ pathname: `/product/${content._id}` }} key={ content._id } asChild>
      <Pressable style={tw`w-fit h-fit mx-0.5 py-3`}>
        <Image style={tw`w-32 h-32`} source={{ uri: content.images[0]?.url }} />
        <View style={tw`flex flex-row px-2 mt-1.5 justify-evenly items-start gap-x-2`}>
          <DiscountProduct discount={content.discount}></DiscountProduct>
          <ProductPrice inStock={content.inStock} discount={content.discount} price={content.price} />
        </View>
      </Pressable>
    </Link>
  )
}

const DiscountSkeleton = () => {
  return (
    <FlatList
      data={Array(10).fill('_')}
      horizontal
      renderItem={({ item, index }) => (
        <Skeleton.Items style={tw`mr-2`} key={index}>
          <Skeleton.Item
            index={1}
            height="h-32 lg:h-36"
            width="w-32 lg:w-36"
            animated="background"
            style="mx-auto"
          />
          <Skeleton.Item
            index={2}
            height="h-5"
            width="w-32"
            animated="background"
            style="mt-4 mx-auto"
          />
          <Skeleton.Item
            index={3}
            height="h-5"
            width="w-20"
            animated="background"
            style="mt-4 mx-auto"
          />
        </Skeleton.Items>
      )}
    />
  )
}

export default DiscountSlider