import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icons from '../common/Icons'
import tw from 'twrnc'
import { useUserInfo } from '@/hooks';
import { useRouter } from 'expo-router';
import ShowWrapper from '../common/ShowWrapper';
import { useGetProductReviewsQuery } from '@/services'
import ReviewProductCard from './ReviewProductCard'

const Reviews = (props) => {

  const { productID, productTitle, numReviews } = props;
  const { mustAuthAction } = useUserInfo();
  const router = useRouter();

  const handleOpenComment = () => {
    mustAuthAction(() => {
      router.push({ pathname: '/review/comment', params: { productID, productTitle, numReviews }})
    })
  }

  // api: get Product-Reviews Query
  const { isSuccess, isFetching, isError, error, data, refetch } = useGetProductReviewsQuery({
    id: productID,
    page: 1,
  }, {
    skip: !(numReviews > 0)
  })

  return (
    <View style={tw`px-3 py-3 space-y-4 gap-y-2`}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <Text style={tw`font-bold`}>商品评价</Text>
        <Text style={tw`text-xs text-sky-500`}>{ numReviews } 条评价</Text>
      </View>
      <Pressable onPress={handleOpenComment} style={tw`flex flex-row items-center`}>
        <Icons.EvilIcons name="comment" size={24} style={tw`icon`} />
        <Text style={tw`text-sm text-black ml-2`}>写下您对该商品的评价</Text>
        {/* 如果设置为 margin-left: auto ， 元素会尽量向右边界对齐*/}
        <Icons.MaterialIcons name="keyboard-arrow-right" size={24} style={tw`ml-auto icon`} />
      </Pressable>
      <Text style={tw`text-xs text-gray-500`}>提交确认后，通过将赠送积分</Text>
      <ShowWrapper
        isSuccess={isSuccess} isError={isError} isFetching={isFetching}
        refetch={refetch} error={error} dataLength={data ? data?.data?.reviewsLength : 0}
      >
        <View style={tw`px-2 py-3 space-y-4 divide-y-2`}>
          {
            data?.data?.reviews?.map(item => <ReviewProductCard item={item} key={item._id} />)
          }
        </View>
      </ShowWrapper>
      
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({})