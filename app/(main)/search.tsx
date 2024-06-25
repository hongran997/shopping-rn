import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import { useState } from 'react'
import { Stack, Link } from 'expo-router'
import tw from 'twrnc'
import { Icons, ShowWrapper, ResponsiveImage, ProductPrice, DiscountProduct, EmptySearchList } from '@/components'
import { FlashList } from '@shopify/flash-list'
import { truncate } from '@/utils'
import { useGetProductsQuery } from '@/services'
import { useDebounce } from '@/hooks'

const search = () => {

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  // hooks 就是这样用的
  const debouncedSearch = useDebounce(search, 1200);

  const handleChange = value => {
    setSearch(value)
  }

  const handleRemoveSearch = () => {
    setSearch('')
    setPage(1)
  }

  const { data, isSuccess, isFetching, error, isError, refetch, hasNextPage, originalArgs } =
    useGetProductsQuery(
      {
        search,
        page,
        page_size: 2,
      },
      {
        skip: !debouncedSearch || search !== debouncedSearch,
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
      <Stack.Screen
        options={{ title: '搜索', headerBackTitleVisible: false}}
      />
      <View style={tw`flex flex-col h-full py-3 px-4 bg-white gap-y-3`}>
        <View style={tw`flex flex-row items-center rounded-md bg-zinc-200/80`}>
          <View style={tw`p-2`}>
            <Icons.EvilIcons name="search" size={24} color="#1F2937" />
          </View>
          <TextInput
            style={tw`flex-grow p-1 text-left bg-transparent outline-none input focus:border-none`}
            type="text"
            value={search}
            onChangeText={handleChange}
          />
          <Pressable type="button" style={tw`p-2`} onPress={handleRemoveSearch}>
            <Icons.AntDesign name="close" size={14} style={tw`icon text-gray-500`} />
          </Pressable>
        </View>
        <View style={tw`flex-1 py-3`}>
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data?.data?.productsLength : 0}
            emptyComponent={<EmptySearchList />}
            type="list"
            originalArgs={originalArgs}
          >
            <View style={tw`h-full divide-y divide-neutral-200 space-y-3`}>
              {data?.data?.productsLength && data?.data.productsLength > 0 && search.length > 0 && (
                <FlashList
                  data={data?.data?.products}
                  renderItem={({ item, index }) => (
                    <View key={item._id} style={tw`py-2`}>
                      <Link href={`/products/${item._id}`} asChild>
                        <Pressable>
                          <ResponsiveImage
                            dimensions="w-20 h-20"
                            imageStyles={tw`w-20 h-20`}
                            source={item.images[0].url}
                            alt={item.title}
                          />
                          <Text style={tw`py-2 text-sm`}>{truncate(item.title, 70)}</Text>
                          <View style={tw`flex flex-row justify-between`}>
                            <View>
                              {item.discount > 0 && <DiscountProduct discount={item.discount} />}
                            </View>
                            <ProductPrice
                              inStock={item.inStock}
                              discount={item.discount}
                              price={item.price}
                            />
                          </View>
                        </Pressable>
                      </Link>
                    </View>
                  )}
                  onEndReached={onEndReachedThreshold}
                  onEndReachedThreshold={0}
                  estimatedItemSize={200}
                />
              )}
            </View>
          </ShowWrapper>
        </View>
      </View>
    </>
  )
}

export default search

const styles = StyleSheet.create({})