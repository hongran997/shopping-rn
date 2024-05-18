import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import FeedSectionContainer  from './common/FeedSectionContainer';
import { FlashList } from "@shopify/flash-list";
import { Link } from 'expo-router';

const Categories = (props: any) => {
  const { childCategories, color, name } = props;

  if (childCategories.categories.length > 0 && color && name) {
    return (
      <FeedSectionContainer title="分类">
        <FlashList
          data={childCategories.categories}
          horizontal
          renderItem={({ item, index }) => (
            <Link key={item._id} href={{ pathname: '/product', params: { category: item.slug } }} asChild >
              <Pressable style={styles.categoryBox}>
              <Image key={index} source={{ uri: item.image }} style={styles.img} />
                {/* <Text style={styles.categroyDes}>{ item.name }</Text> */}
              </Pressable>
            </Link>
          )}
          estimatedItemSize={200}
        >
        </FlashList>
      </FeedSectionContainer>
    )
  }
}

export default Categories

const styles = StyleSheet.create({
  categoryBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 14,
    height: 14,
    marginRight: 3,
  },
  categroyDes: {
    fontSize: 14
  }

})