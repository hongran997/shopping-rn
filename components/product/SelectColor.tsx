import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/hooks'
import Icons  from '../common/Icons' 
import tw from 'twrnc'
import { setTempColor } from '@/store'

const SelectColor = (props) => {

  // Props
  const { colors } = props;

  // Assets
  const dispatch = useAppDispatch();

  // Store
  const { tempColor } = useAppSelector(state => state.cart);

  return (
    <>
      <View style={tw`flex flex-row justify-between items-center p-4`}>
        <Text style={tw`text-sm text-gray-700` }>颜色：{ tempColor?.name }</Text>
        <Text style={tw`text-sm` }>{ colors.length } 种颜色</Text>
      </View>
      <View style={tw`flex flex-row flex-wrap gap-3 px-5 my-3` }>
        {
          colors.map((item) => (
            <Pressable key={item._id} onPress={() => dispatch(setTempColor(item))}
              style={tw`px-1 py-1.5 flex flex-row items-center gap-x-2 rounded-full cursor-pointer border-2 
                          ${item.id === tempColor.id ? 'border-sky-500' : 'border-gray-300'}`}>
              <View style={tw.style(`w-5 h-5 rounded-full flex items-center justify-center`, {backgroundColor: `${item.hashCode}`})}>
                {
                  tempColor?.id === item._id &&
                  <Icons.AntDesign
                      name="checkcircleo"
                      size={16}
                      style={tw`${item.hashCode === '#ffffff' ? 'text-gray-600' : (item.hashCode === '#000000' ? 'text-gray-200' : 'text-white')}`}>    
                  </Icons.AntDesign>
                }
              </View>
              <Text>{ item.name }</Text>
            </Pressable>
          ))
        }
      </View>
    </>
  )
}

export default SelectColor

const styles = StyleSheet.create({})