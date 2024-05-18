import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';

const Slider = (props: any) => {
  const { data } = props;
  if (data?.length === 0) return null;
  return (
    <View style={styles.container}>
      <Swiper style={styles.container} showsButtons={true} showsPagination >
        {
          data.filter((ele: any) => ele.isPublic).map((item: any, index: number) => (
            <Image key={item._id} source={{ uri: item.image.url}} style={styles.img}></Image>
          ))
        }
      </Swiper>
    </View>
    
  )
}

export default Slider

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: "solid",
    height: 200,
  },
  img: {
    height: 200,
  }
})