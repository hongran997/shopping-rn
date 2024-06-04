import { StyleSheet, Text, View, Pressable } from 'react-native'
import Icons from './Icons';
import tw from 'twrnc';

const FeedSectionContainer = (props: any) => {
  const { title, showMore = false, onJumptoMore, children, style = {} } = props;

  const handleJumpMore = () => {
    onJumptoMore();
  }
  return (
    <View style={tw`flex flex-col mt-6`}>
      <View style={tw`flex flex-row justify-between items-center mb-3`}>
        <Text style={tw`mr-auto text-base font-bold`}>{title}</Text>
        {
          showMore && (
            <Pressable style={ styles.goMore} onPress={()=> handleJumpMore}>
              <Text style={tw`text-base text-neutral-400`}>更多</Text>
              <Icons.AntDesign name="arrowright" size={14} color="rgb(163 163 163)" />
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