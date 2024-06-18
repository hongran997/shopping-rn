import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useLocalSearchParams, Link, useRouter, Stack } from 'expo-router'
import {
  ProductHeader, InitialStore, ImageGallery, Description, FreeShipping, Info, OutOfStock, SelectColor,
  SelectSize, ShowWrapper, AddToCartOperation, SmilarProductsSlider, Specification, Reviews } from '../../../components'
import { useAppSelector } from '@/hooks'
import { formatNumber } from '@/utils'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useGetSingleProductDetailQuery } from '@/services'
import tw from 'twrnc';

const SingleProductScreen = () => {

  // Params
  const { id } = useLocalSearchParams();

  // Assets
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { totalItems } = useAppSelector(state => state.cart);

  // Api
  const {
    data: { product = {}, smilarProducts = {} },
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetSingleProductDetailQuery(
    { id },
    {
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {},
        ...args,
      }),
    }
  )

  // renders
  return (
    <>
      <Stack.Screen options={{
        headerRight: () => (<ProductHeader totalItems={totalItems}></ProductHeader>),
        title: product?.title || '',
        headerBackVisible: false
      }}></Stack.Screen>
      <ShowWrapper isFetching={isFetching} isLoading={isLoading} isSuccess={isSuccess} isError={isError}
        refetch={refetch} error={error} type="detail">
        <View style={tw`h-full bg-white relative`}>
          <ScrollView>
            <View style={tw`h-fit py-4 gap-y-4`}>
              <InitialStore product={product}></InitialStore>
              {/* Pisc */}
              <ImageGallery images={product.images} discount={product.discount}
                inStock={product.inStock} productName={product.title}></ImageGallery>
              {/* Attr */}
              <View style={tw`lg:col-span-4`}>
                {/* title */}
                <Text style={tw`p-4 text-base font-semibold leading-8 tracking-wide text-black/80`}>
                  {product.title}
                </Text>
                {/* divide */}
                <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
                {/* colors */}
                {
                  product.inStock > 0 && product.colors.length > 0 && <SelectColor colors={product.colors} />
                }
                {/* sizes */}
                {
                  product.inStock > 0 && product.sizes.length > 0 && <SelectSize sizes={product.sizes} />
                }
                {/* outOfStock */}
                {
                  product.inStock == 0 && <OutOfStock />
                }
                {/* Infos */}
                {
                  product.infos && <Info infos={product.infos} />
                }

                {/* Express */}
                <FreeShipping />
              </View>
              {/* desc */}
              {
                product?.description?.length > 0 && <Description description={product.description} />
              }
              {/* smilarProduct */}
              {
                smilarProducts?.products?.length > 0 && <SmilarProductsSlider smilarProducts={smilarProducts} />
              }
              <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
              {/* Specification */}
              <Specification specification={ product.specification } />
              <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
              {/* Review */}
              <Reviews numReviews={product.numReviews}
                prodouctID={product._id}
                productTitle={product.title} />
            </View>
          </ScrollView>
          {/* add to cart */}
          {
            product.inStock > 0 && (
              <View style={[tw`fixed left-0 right-0 z-20`, { bottom: insets.bottom }]}>
                <AddToCartOperation product={ product} />
              </View>
            )
          }
        </View>
      </ShowWrapper>
    </>
  )
}

export default SingleProductScreen

const styles = StyleSheet.create({})