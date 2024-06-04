import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useGetFeedInfoQuery } from '@/services';
import {
  ShowWrapper, FeedHeader, Slider as MainSlider, MostFavouraiteProducts,
  BannerOne, BannerTwo, Categories, DiscountSlider, BestSellsSlider
} from '@/components/';
import tw from 'twrnc';

const Feed = () => {
  // get Feeds Query
  const {
    data: { childCategories, currentCategory, sliders, bannerOneType, bannerTwoType },
    isLoading,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetFeedInfoQuery(
    {},
    {
      selectFromResult: ({ data, ...args }) => ({
        data: data?.data || {},
        ...args,
      }),
    }
  )
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: props => <FeedHeader />}} />
      <ShowWrapper error={error} isError={isError} refetch={refetch} isFetching={isFetching} isSuccess={isSuccess} type="detail">
        <ScrollView style={tw`px-3`}>
          <MainSlider data={sliders} ></MainSlider>
          <Categories childCategories={{ categories: childCategories, title: '所有分类' }}
            color={currentCategory?.colors?.start}
            name={currentCategory?.name}
          ></Categories>
          <DiscountSlider currentCategory={currentCategory}></DiscountSlider>
          <BannerOne data={bannerOneType} />
          <BestSellsSlider categorySlug={currentCategory?.slug} />
          <BannerTwo data={bannerTwoType} />
          <MostFavouraiteProducts categorySlug={currentCategory?.slug} style={styles.box} />
        </ScrollView>
      </ShowWrapper>
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    flex: 1
  },
  box: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#4f4f",
  }
})