import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc';

const Info = (props) => {

  const { infos } = props;

  return (
    <View style={tw`px-4 pb-2`}>
      <Text style={tw`py-3`}>属性</Text>
      <View style={tw`gap-x-2`}>
        {
          infos.map((item, index) => (
            <View style={tw`ml-1 flex flex-row gap-x-2 tracking-wide text-gray-500`} key={index}>
              <Text style={tw`leading-6 font-light`}>{ item.title } : </Text>
              <Text style={tw`leading-6 text-gray-900 flex-1`}>{ item.value }</Text>
            </View>
          ))  
        }
      </View>
    </View>
  )
}

export default Info

const styles = StyleSheet.create({})