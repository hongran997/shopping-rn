import { StyleSheet, Text, View, Pressable } from 'react-native'
import Icons from '../common/Icons'
import { truncate } from '@/utils'
import { useDisclosure } from '@/hooks'
import tw from 'twrnc'

const Description = (props) => {

  // Props
  const { description } = props;

  // Assets
  const [ isShowDesc, showDescHandlers ] = useDisclosure();

  // Render(s)
  return (
    <Pressable>
      <View style={tw`px-3 pb-4`}>
        <Text style={tw`mb-3 w-fit lg:border-b-2 lg:border-red-500`}>介绍</Text>
        <Text style={tw`text-sm leading-6 tracking-wider text-gray-600 lg:text-sm lg:leading-8`}>
          {isShowDesc ? description : truncate(description, 100)}
        </Text>
        {
          description.length > 100 && (
            <Pressable
              onPress={showDescHandlers.toggle}
              style={tw`flex flex-row justify-end items-center py-2`}>
              {
                isShowDesc
                  ? <Text style={tw`text-sm text-sky-400`}>收起</Text>
                  : <Text style={tw`text-sm text-sky-400`}>查看更多</Text>
              }
              {
                !isShowDesc && <Icons.MaterialIcons name="keyboard-arrow-right" size={24} style={tw`text-sky-400` } />
              }
            </Pressable>
          )
        }
      </View>
      <View style={tw`section-divide-y h-2 bg-gray-100`}></View>
    </Pressable>
  )
}

export default Description

const styles = StyleSheet.create({})