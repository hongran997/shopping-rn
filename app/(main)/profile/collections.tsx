import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

import { FavoritesListEmpty } from '@/components'
import tw from 'twrnc'

const ListsScreen = () => {
  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          title: '我的收藏',
          headerBackTitleVisible: false,
        }}
      />
      <View style={tw`py-20 bg-white h-full`}>
        <FavoritesListEmpty style={tw`mx-auto h-52 w-52`} />
        <Text style={tw`text-center`}>您的收藏夹列表为空</Text>
        <Text style={tw`block my-3 text-base text-center text-amber-500`}>（即将上线）</Text>
      </View>
    </>
  )
}

export default ListsScreen