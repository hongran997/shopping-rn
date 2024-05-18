import { StyleSheet, Text, View , Image} from 'react-native'
import  FeedSectionContainer from '../common/FeedSectionContainer'

const BannerOne = (props) => {
  const { data, style } = props;

  if (data.length === 0) return null;

  // console.log(data);
  
  return (
    <FeedSectionContainer title="今日专题">
      {
        <View style={styles.container}>
          {
            data.map((item) => (
              <View style={styles.imgBox} key={item._id}>
                <Image source={{ uri: item.image.url }} style={styles.img} />
              </View>

            ))
          }
        </View>
      }
    </FeedSectionContainer>
  )
}

export default BannerOne

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  imgBox: {
    width: "49%",
    height: 24,
    marginBottom: "2%",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  }
})