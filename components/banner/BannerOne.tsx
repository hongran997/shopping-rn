import { StyleSheet, Text, View , Image} from 'react-native'
import FeedSectionContainer from '../common/FeedSectionContainer'
import tw from 'twrnc'

const BannerOne = (props) => {
  const { data, style } = props;

  if (data.length === 0) return null;

  // console.log(data);
  
  return (
    <FeedSectionContainer title="今日专题">
      {
        <View style={tw`flex flex-row flex-wrap justify-between`}>
          {
            data.map((item) => (
              <View style={tw`w-[49%] h-24 mb-[2%]`} key={item._id}>
                <Image source={{ uri: item.image.url }} style={tw`w-full h-full rounded-lg`} />
              </View>

            ))
          }
        </View>
      }
    </FeedSectionContainer>
  )
}

export default BannerOne