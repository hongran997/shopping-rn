import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import FeedSectionContainer from '../common/FeedSectionContainer';
import { useGetProductsQuery } from '@/services';
import { Link } from 'expo-router';
import { truncate } from '@/utils';
import Skeleton from '../common/Skeleton';
import tw from 'twrnc';

const generateGroup = (arr, countNum) => {
  const result = [];
  for (let i = 0; i < arr.length; i+=countNum) {
    result.push(arr.slice(i, i + countNum));
  }
  return result;
}

const Item = ({ item, index }) => {
  return (
    <View style={tw`mr-4`} key={index}>
      { 
        item.map((row, rowIndex) => (
          <Link href={{pathname: `/product/${row._id}`}} style={tw`px-1 py-4 w-60`} key={row._id}>
            <Pressable style={tw`flex flex-row`}>
              {/* flex-shrink: 0;  不收缩 flex: 1 1 auto; 自适应空间同步放大和缩小  */}
              <Image source={row.images[0].url} style={tw`w-24 h-24 shrink-0 mr-2`}></Image>
              <View style={tw`flex flex-row items-center flex-auto border-b border-gray-200`}>
                <Text style={tw`text-2xl text-sky-500 mx-2`}>{index * 2 + rowIndex + 1}</Text>
                <Text style={tw`flex-auto`}>{truncate(row.title, 15)}</Text>
              </View>
            </Pressable>
          </Link>
        ))
      }
    </View>
  )
}

const BestSellsSlider = (props) => {
  const { categorySlug, style } = props;

  const { products, isLoading } = useGetProductsQuery(
    {
      sort: 2,
      page_size: 15,
      category: categorySlug,
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data?.data?.products ? generateGroup(data?.data?.products, 2) : [],
        isLoading,
      }),
    }
  )

  return (
    <FeedSectionContainer title="畅销商品">
      {
        isLoading
          ? Array(2)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} style={tw`flex flex-row p-2`}>
                  <Skeleton.Item index={1} height="h-24" width="w-24" animated="background" style="mr-4" />
                  <Skeleton.Items style={tw`flex items-start`}>
                    <Skeleton.Item index={1} height="h-5" width="w-56" animated="background" style="mt-4" />
                    <Skeleton.Item index={2} height="h-5" width="w-32" animated="background" style="mt-4" />
                  </Skeleton.Items>
                </Skeleton.Items>
                ))
          : <FlatList
              data={products}
              horizontal
              renderItem={({ item, index }) => <Item item={item} index={index} />}
            />
      }
      
    </FeedSectionContainer>
  )
}

export default BestSellsSlider