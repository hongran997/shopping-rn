import { StyleSheet, Text, View, Pressable } from 'react-native'
import Icons from './Icons';
import React from 'react'

const FeedSectionContainer = (props: any) => {
  const { title, showMore = false, onJumptoMore, children, style = {} } = props;

  const handleJumpMore = () => {
    onJumptoMore();
  }
  return (
    <View style={[style, { marginTop: 6 , display: "flex", flexDirection: "column"}]}>
      <View style={styles.container}>
        <Text>{title}</Text>
        {
          showMore && (
            <Pressable style={ styles.goMore} onPress={()=> handleJumpMore}>
              <Text >更多</Text>
              <Icons.AntDesign name="arrowright" size={18} color="black" />
            </Pressable>
          )
        }
      </View>
      {children}
    </View>
  )
}

export default FeedSectionContainer

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  goMore: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  }
})