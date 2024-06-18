import { StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import ResponsiveImage from '../common/ResponsiveImage'
import tw from 'twrnc';

const ImageGallery = (props) => {

  const { images, productName } = props;

  return (
    <View style={tw`mb-5`}>
      <Swiper style={tw`w-full aspect-square `}
        showsButtons activeDotColor="#1D4ED8" dotColor="#E5E7EB">
        {
          images.map(((image,index) => (
            <ResponsiveImage
              key={index}
              source={image.url}
              style={tw`w-full aspect-square`}
              imageStyles={tw`h-full w-full `}
              alt={productName}
            ></ResponsiveImage>
          )))
        }
      </Swiper>
    </View>
  )
}

export default ImageGallery

const styles = StyleSheet.create({})