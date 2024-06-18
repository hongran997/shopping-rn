import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useDisclosure } from '@/hooks'
import RenderHtml from 'react-native-render-html'
import Icons from '../common/Icons'
import tw from 'twrnc'

const Specification = (props) => {

  const { specification } = props;

  // 当页面尺寸或者字体大小发生变化时， 可自动更新当前应用窗口的宽，高，字体大小
  const { width } = useWindowDimensions();

  const [isShowSpec, showSpecHandlers] = useDisclosure();

  const renderSpecification = isShowSpec ? specification : specification.slice(0, 7);

  return (
    <View style={tw`px-4 pt-4 lg:max-w-3xl xl:max-w-5xl`}>
      <Text style={tw`mb-3 h-fit w-fit`}>规格</Text>
      {/* TODO space-y-4 生效了嘛 */}
      <View style={tw`space-y-4`}>
        {
          renderSpecification.map((item, i) => {
            if (!item.value) return;
            else return (
              <View style={tw`flex flex-row`} >
                {/* TODO 字母间距为什么用tracking-wide, 看不懂 */}
                <Text style={tw`py-2 font-light leading-5 tracking-wide text-gray-500 w-1/2 pl-3`}>
                  {item.title}
                </Text>
                <Text style={tw`py-2 font-normal leading-5 tracking-wide text-gray-600 break-all`}>
                  <RenderHtml source={{html: item.value}} contentWidth={width/2}/>
                </Text>
              </View>
            )
          })  
        }
      </View>
      {
        specification.length > 7 && (
          <Pressable style={tw`flex flex-row justify-end items-center py-2 text-sm text-sky-400`}
            onPress={showSpecHandlers.toggle}>
            {
              isShowSpec
                ? <Text style={tw`text-sm text-sky-400`}>收起</Text>
                : <Text style={tw`text-sm text-sky-400`}>查看更多</Text>
            }
            {
              !isShowSpec && <Icons.MaterialIcons name="keyboard-arrow-right" size={24} style={tw`text-sky-400`} />
            }
          </Pressable>
        )
      }
    </View>
  )
}

export default Specification

const styles = StyleSheet.create({})