import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import { AuthWrapper, Icons, Person } from '@/components';
import { router, Stack, Link } from 'expo-router';
import { useUserInfo } from '@/hooks';
import tw from 'twrnc';
import Toast from 'react-native-toast-message'
import { useAppDispatch } from '@/hooks';
import { userLogout } from '@/store';

const Profile = () => {

  const { userInfo, isLoading } = useUserInfo();

  const profilePaths = [
    {
      name: '我的订单',
      Icon: Icons.SimpleLineIcons,
      IconName: 'handbag',
      path: '/profile/orders'
    },
    {
      name: '我的收藏',
      Icon: Icons.Feather,
      IconName: 'heart',
      path: '/profile/collections'
    },
    {
      name: '我的评价',
      Icon: Icons.FontAwesome5,
      IconName: 'comment',
      path: '/profile/reviews'
    },
    {
      name: '地址管理',
      Icon: Icons.MaterialIcons,
      IconName: 'location-city',
      path: '/profile/addresses'
    },
    {
      name: '最近访问',
      Icon: Icons.AntDesign,
      IconName: 'clockcircleo',
      path: '/profile/user-history'
    },
    {
      name: '账户信息',
      Icon: Icons.AntDesign,
      IconName: 'user',
      path: '/profile/personal-info'
    }
  ];

  const dispatch = useAppDispatch();

  const handlePressEvent = (path: string) => {
    router.push(path); 
  }

  const handleLogout = () => {
    dispatch(userLogout())
    Toast.show({
      type: "success",
      text2: '已退出登录'
    })
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <AuthWrapper>
        <ScrollView style={tw`bg-white`}>
          {/* Avator + username + phone */}
          <View style={tw`flex flex-row items-center justify-between pt-5 px-5 pb-3`}>
            <View style={tw`flex flex-row items-center`}>
              <Person style={tw`w-12 h-12 pr-5`} />
              {
                isLoading ? (
                  <>
                    <Text style={tw`h-5 bg-red-200 rounded-md animate-pulse`}></Text>
                    <Text style={tw`w-32 h-5 bg-red-200 rounded-md animate-pulse`}></Text>
                  </>
                ): (
                    <>
                      <Text style = {tw`text-xl font-bold`}>{userInfo?.name}</Text>
                      <Text style={tw`text-sm`}>{userInfo?.mobile}</Text>
                    </> 
                )
              }
              
            </View>
            <Link href="/profile/personal-info">
              <Icons.Feather name="edit" ssize={30} color="black" style={tw`icon text-gray-700  lg:mr-3`} />
            </Link>
          </View>
          {/* About mine */}
          <View style={tw`mt-7 px-4`}>
            {
              profilePaths.map((profileItem) => (
                <View style={tw`flex flex-row justify-between py-1 border-b-2 border-b-slate-400 border-solid`} key={profileItem.path}>
                  <View style={tw`flex flex-row`}>
                    <profileItem.Icon name={profileItem.IconName} size={24} style={{ paddingRight: 10 }}></profileItem.Icon>
                    <Text>{profileItem.name}</Text>
                  </View>
                  <Pressable onPress={() => handlePressEvent(profileItem.path)}>
                    <Icons.AntDesign name="arrowright" size={24} color="black" />
                  </Pressable>
                </View>
              ))
            }
          </View>
          {/* logout */}
          <View style={tw`mt-3 px-4`}>
            <Pressable onPress={handleLogout} style={tw`flex flex-row justify-between`}>
              <Text>退出</Text>
              <Icons.AntDesign name="arrowright" size={18} color="black" />
            </Pressable>
          </View>
        </ScrollView>
      </AuthWrapper>
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
})