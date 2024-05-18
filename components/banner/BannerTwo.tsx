import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import FeedSectionContainer from '../common/FeedSectionContainer';
import { FlashList } from '@shopify/flash-list';


const Item = ({ content }) => {
  return (
    <View key={content._id} style={styles.imgBox}>
      {/* 放Text 可以，放Image 就显示不出来 */}
      <Image key={content._id} source={{ uri: content.image.url }} style={styles.img} />
    </View>
  )
}


const BannerTwo = (props) => {

  const { data } = props;

  return (
    <FeedSectionContainer title="推荐专题">
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => <Item content={item}></Item>}
      />
    </FeedSectionContainer>
  )
}

export default BannerTwo

const styles = StyleSheet.create({
  imgBox: {
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "red",
    // width: "auto",
    // height: "auto",
  },
  img: {
    // 因为父级组件的width, height都是0，所以用100%不生效，100vw又不是RN支持的单位，所以直接指定宽高大小是最好的
    width: 430,
    height: 230,
  }
})