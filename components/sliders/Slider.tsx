import { StyleSheet, View, Image } from 'react-native'
import Swiper from 'react-native-swiper';
import tw from 'twrnc';

const Slider = (props: any) => {

  const { data } = props;
  if (data?.length === 0) return null;

  return (
    <View style={tw`w-full h-[200px] mt-3 rounded-2xl overflow-hidden`}>
      <Swiper style={tw``} showsPagination activeDotColor="#1D4ED8" dotColor="#E5E7EB">
        {
          data.filter((ele: any) => ele.isPublic).map((item: any, index: number) => (
            <Image key={item._id} source={{ uri: item.image.url}} style={tw`w-full h-full`}></Image>
          ))
        }
      </Swiper>
    </View>
    
  )
}

export default Slider

const styles = StyleSheet.create({

})