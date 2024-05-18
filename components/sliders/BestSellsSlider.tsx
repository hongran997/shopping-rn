import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import FeedSectionContainer from '../common/FeedSectionContainer';
import { useGetProductsQuery } from '@/services';
import { Link } from 'expo-router';
import { truncate } from '@/utils';

const generateGroup = (arr, countNum) => {
  const result = [];
  for (let i = 0; i < arr.length; i+=countNum) {
    result.push(arr.slice(i, i + countNum));
  }
  return result;
}

const Item = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      { 
        item.map((row, rowIndex) => (
          <Link href="/category" style={styles.linkBox} key={row._id}>
            <Pressable style={styles.pressableBox}>
              <Image source={row.images[0].url} style={styles.img}></Image>
              <View style={styles.productDesc}>
                <Text style={styles.productIndex}>{index * 2 + rowIndex + 1}</Text>
                <Text style={styles.productTitle}>{truncate(row.title, 15)}</Text>
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
      <FlatList
        data={products}
        horizontal
        renderItem={({ item, index }) => <Item item={item} index={index} />}
      />
    </FeedSectionContainer>
  )
}

export default BestSellsSlider

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "red",
    // width: '100vw',
    // height: 100,
    // display: "flex",
    // flexDirection: "column",
    marginRight: 4,
  },
  linkBox: {
    paddingHorizontal: 1,
    paddingVertical: 4,
    width: 100
  },
  pressableBox: {
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: 24,
    height: 24,
    flexShrink: 0,
    marginRight: 2,
  },
  productDesc: {
    display: "flex",
    flexBasis: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgb(209 213 219)",
  },
  productIndex: {
    fontSize: 20,
    lineHeight: 28,
  },
  productTitle: {
    display: "flex",
    flexBasis: "auto",
    flexWrap: "wrap"
  }
  // linkBox: {
  //   borderWidth: 1,
  //   borderStyle: "solid",
  //   borderColor: "red",
  // }
})