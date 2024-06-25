import { View } from 'react-native'
import { useState } from 'react'
import { Stack } from 'expo-router'
import { ShowWrapper, EmptyOrdersList, OrderSkeleton, OrderCard } from '@/components'
import tw from 'twrnc'
import { FlashList } from '@shopify/flash-list'
import { useGetOrdersQuery } from '@/services'


const orders = () => {

  const [page, setPage] = useState(1)

  //? Get Orders Data
  const { data, hasNextPage, isSuccess, isFetching, error, isError, refetch, originalArgs } =
    useGetOrdersQuery(
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
      <Stack.Screen options={{ title: '我的订单', headerBackTitleVisible: false }} />
      <View style={tw`h-full bg-white`}>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data?.data?.ordersLength : 0}
          emptyComponent={<EmptyOrdersList />}
          loadingComponent={<OrderSkeleton />}
          originalArgs={originalArgs}
        >
          <View style={tw`px-4 py-3 space-y-3 h-full bg-white`}>
            <FlashList
              data={data?.data?.orders}
              renderItem={({ item }) => <OrderCard key={item._id} order={item} />}
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

export default orders