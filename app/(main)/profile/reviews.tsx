import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { ShowWrapper, EmptyCommentsList, ReveiwSkeleton, ReveiwCard } from '@/components'
import { FlashList } from '@shopify/flash-list'
import tw from 'twrnc'
import { useGetReviewsQuery } from '@/services'
import { useState } from 'react'


const reviews = () => {

  const [page, setPage] = useState(1)

  const { data, hasNextPage, isSuccess, isFetching, error, isError, refetch, originalArgs } =
    useGetReviewsQuery(
      {
        pageSize: 5,
        page,
      },
      {
        selectFromResult: ({ data, ...args }) => {
          return {
            hasNextPage: data?.data?.pagination?.hasNextPage ?? false,
            data,
            ...args,
          }
        },
      }
    )

  const onEndReachedThreshold = () => {
    if (!hasNextPage) return
    setPage(Number(page) + 1)
  }


  return (
    <>
      <Stack.Screen options={{ title: '我的评论', headerBackTitleVisible: false }} />
      <View style={tw`h-full bg-white`}>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data?.data?.reviewsLength : 0}
          emptyComponent={<EmptyCommentsList />}
          loadingComponent={<ReveiwSkeleton />}
          originalArgs={originalArgs}
        >
          <View style={tw`px-4 py-3 space-y-3 h-full`}>
            <FlashList
              data={data?.data?.reviews}
              renderItem={({ item, index }) => <ReveiwCard key={item._id} item={item} />}
              onEndReached={onEndReachedThreshold}
              onEndReachedThreshold={0}
              estimatedItemSize={200}
            />
          </View>
        </ShowWrapper>
      </View>
    </>
  )
}

export default reviews

const styles = StyleSheet.create({})