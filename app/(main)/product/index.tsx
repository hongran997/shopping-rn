import { Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import { useGetProductsQuery, useGetCategoriesQuery } from '@/services';
import { Filter, ProductCard, ProductSkeleton, Sort, SubCategories } from '@/components';
import { useChangeRoute } from '@/hooks';
import tw from 'twrnc';
import { FlashList } from '@shopify/flash-list';

const ProductsScreen = () => {
  
  const params = useLocalSearchParams();

  const category = params?.category?.toString() ?? '';
  const page_size = params?.page_size?.toString() ?? 10;
  const page = params?.page?.toString() ?? '';
  const sort = params?.sort?.toString() ?? '';
  const search = params?.search?.toString() ?? ''; 
  const inStock = params?.inStock?.toString() ?? '';
  const discount = params?.discount?.toString() ?? '';
  const price = params?.price?.toString() ?? '';


  const { data, hasNextPage, isFetching: isFetchingProduct } = useGetProductsQuery(
    // Params
    {
      category, page_size, page, sort, search, inStock, discount, price
    },
    // Result 
    {
      selectFromResult: ({ data, ...args }) => ({
        hasNextPage: data?.data?.pagination?.hasNextPage ?? false,
        data,
        ...args
      })
    }
  )

  // isLoading 与 isLoadingCategories 有什么不同
  const { isLoading: isLoadingCategories, childCategories, currentCategory } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ isLoading, data }) => {
      const currentCategory = data?.data?.categories.find(c => c.slug === category);
      const childCategories = data?.data?.categories.filter(c => c.parent === currentCategory?._id);
      return { isLoading, childCategories, currentCategory }
    }
  })

  const onEndReachedThreshold = () => {
    if (!hasNextPage) return;
    changeRoute({
      page: Number(page) + 1,
    })
  }

  const changeRoute = useChangeRoute();

  const handleChangeRoute = newQueries => {
    changeRoute({
      ...params,
      page: 1, 
      ...newQueries
    })
  }


  return (
    <>
      <Stack.Screen options={{ title: params.category}} />
      <View style={tw`w-full h-full bg-white px-4 pt-4`}>
        {/* Category */}
        <SubCategories isLoading={isLoadingCategories} childCategories={childCategories} name={currentCategory?.name} />
        {/* Main */}
        <View style={tw`px-1 flex-1`}>
          {/* Filters & Sort & Product Sum */}
          <View style={tw`divide-y-2 divide-neutral-200`}>
            {/* Filters & Sort */}
            <View style={tw`flex flex-row py-2 gap-x-3 `}>
              <Filter
                mainMaxPrice={data?.data?.mainMaxPrice}
                mainMixPrice={data?.data?.mainMinPrice}
                handleChangeRoute={handleChangeRoute} />
              <Sort handleChangeRoute={handleChangeRoute} />
            </View>
            {/* Product Sum */}
            <View style={tw`flex flex-row justify-between items-center py-2`}>
              <Text style={tw`text-base text-neutral-600`}>所有商品</Text>
              <Text style={tw`text-base text-neutral-600`}>{data?.data?.productsLength} 件商品</Text>
            </View>
          </View>
          {/* Product List , TODO 为什么用 isFetchingProduct */}
          {isFetchingProduct && <ProductSkeleton /> }
          {
            data && data?.data?.products.length > 0
              ? <FlashList
                  data = {data.data.products}
                  renderItem = {({ item,index }) => (<ProductCard product={item} key = {item._id} />) }
                  onEndReached = {onEndReachedThreshold}
                  onEndReachedThreshold = {0}
                  estimatedItemSize = {200}
                />
              : <Text style={tw`text-center text-red-500`}>没有找到商品</Text>
          }
        </View>
        {/*  */}
      </View>
    </>
  )
}

export default ProductsScreen