import { Stack } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { Address, Icons, Skeleton, WithAddressModal } from '@/components'
import { useUserInfo } from '@/hooks'
import tw from 'twrnc'

const BasicAddresses = ({ addressModalProps }) => {
  const { isAddress, address, isLoading, openAddressModal } = addressModalProps || {}

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          title: '地址管理',
          headerBackTitleVisible: false,
        }}
      />
      <View style={tw`flex h-full bg-white`}>
        {isLoading ? (
          <View style={tw`flex-1 px-5`}>
            <View style={tw`flex flex-row justify-between py-4 border-b border-gray-200`}>
              <Skeleton.Item animated="background" height="h-5" width="w-52" />
            </View>
            <View style={tw`my-2 space-y-3 text-gray-500`}>
              <View style={tw`flex flex-row items-center gap-x-2`}>
                <Icons.Entypo name="address" size={16} style={tw`text-gray-500 icon`} />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </View>
              <View style={tw`flex flex-row items-center gap-x-2`}>
                <Icons.MaterialIcons
                  name="local-post-office"
                  size={16}
                  style={tw`text-gray-500 icon`}
                />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </View>
              <View style={tw`flex flex-row items-center gap-x-2`}>
                <Icons.Entypo name="phone" size={16} style={tw`text-gray-500 icon`} />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </View>

              <View style={tw`flex flex-row items-center gap-x-2`}>
                <Icons.AntDesign name="user" size={16} style={tw`text-gray-500 icon`} />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </View>
            </View>
          </View>
        ) : isAddress ? (
            <View style={tw`flex-1 px-5`}>
              <View style={tw`flex flex-row justify-between py-4 border-b border-gray-200`}>
                <Text style={tw`text-sm`}>{address?.street}</Text>
                <Pressable onPress={openAddressModal}>
                  <Icons.FontAwesome5 name="edit" size={16} style={tw`text-gray-500 icon`} />
                </Pressable>
            </View>
              <View style={tw`my-2 space-y-3 text-gray-500`}>
                <View style={tw`flex flex-row items-center gap-x-2`}>
                  <Icons.Entypo name="address" size={16} style={tw`text-gray-500 icon`} />
                  <Text style={tw`text-xs md:text-sm`}>
                    {address?.province.name}, {address?.city.name}, {address?.area.name}
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center gap-x-2`}>
                  <Icons.MaterialIcons
                      name="local-post-office"
                      size={16}
                      style={tw`text-gray-500 icon`}
                  />
                  <Text style={tw`text-xs md:text-sm`}>{address?.postalCode}</Text>
                </View>
                {userInfo?.mobile && (
                    <View style={tw`flex flex-row items-center gap-x-2`}>
                      <Icons.Entypo name="phone" size={16} style={tw`text-gray-500 icon`} />
                      <Text style={tw`text-xs md:text-sm`}>{userInfo?.mobile}</Text>
                  </View>
                )}
                <View style={tw`flex flex-row items-center gap-x-2`}>
                  <Icons.AntDesign name="user" size={16} style={tw`text-gray-500 icon`} />
                  <Text style={tw`text-xs md:text-sm`}>{userInfo?.name}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={tw`flex flex-col items-center py-20 gap-y-4`}>
            <Address style={tw`h-52 w-52`} />
            <Text>您尚未填写地址</Text>
            <Pressable
                style={tw`flex flex-row items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3`}
                onPress={openAddressModal}
            >
              <Icons.Entypo name="location" size={16} style={tw`text-gray-500 icon`} />
              <Text>新增地址</Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  )
}

const Addresses = () => (
  <WithAddressModal>
    <BasicAddresses />
  </WithAddressModal>
)

export default Addresses