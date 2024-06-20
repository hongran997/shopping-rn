import { Link, Stack } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { EmptyCart, ResponsiveImage } from '@/components'
import { useAppSelector } from '@/hooks'
import { truncate } from '@/utils'
import tw from 'twrnc'

const UserHistoryScreen = () => {
  //? Store
  const { lastSeen } = useAppSelector(state => state.user)


  //? selector
  return (
    <>
      <Stack.Screen
        options={{
          title: '最近访问',
          headerBackTitleVisible: false,
        }}
      />
      {lastSeen.length > 0 ? (
        <ScrollView style={tw`px-3 space-y-4 bg-white`}>
          {lastSeen.map(item => (
            <View style={tw`border-b border-gray-200`} key={item.productID}>
              <Link href={`/products/${item.productID}`} asChild>
                <Pressable style={tw`flex flex-row items-center gap-4 py-4`}>
                  <ResponsiveImage
                    style={tw`w-36 h-36 md:mx-auto`}
                    imageStyles={tw`w-36 h-36`}
                    source={item.image.url}
                    alt={item.title}
                  />
                  <Text style={tw`flex-1 px-3 text-left text-gray-800 leadiri-6`}>
                    {truncate(item.title, 80)}
                  </Text>
                </Pressable>
              </Link>
            </View>
          ))}
        </ScrollView>
      ) : (
          <View style={tw`py-20`}>
            <EmptyCart style={tw`mx-auto h-52 w-52`} />
            <Text style={tw`text-centet`}>您的最近访问列表为空</Text>
        </View>
      )}
    </>
  )
}

export default UserHistoryScreen