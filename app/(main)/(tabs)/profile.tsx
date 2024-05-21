import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icons } from '@/components';
import { router, Stack } from 'expo-router';

const Profile = () => {

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
      path: '/profile/lists'
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

  const handlePressEvent = (path: string) => {
    router.push(path); 
  }

  return (
    <View>
      <Stack.Screen options={{ headerShown: false, title: 'profile'}}></Stack.Screen>
      {/* Avator + username + phone */}
      <ScrollView style={styles.container}>
        <View></View>
        {
          profilePaths.map((profileItem) => (
            <View style={styles.listItem}>
              <View style={styles.listLeft}>
                <profileItem.Icon name={profileItem.IconName} size={24} style={{paddingRight: 10}}></profileItem.Icon>
                <Text>{profileItem.name}</Text>
              </View>
              <Pressable onPress={() => handlePressEvent(profileItem.path)}>
                <Icons.AntDesign name="arrowright" size={18} color="black" />
              </Pressable>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
    // backgroundColor: '#fff',
    // width: '100%',
    // height: '100vh',
  },
  listLeft: {
    display: "flex",
    flexDirection: "row",
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  }
})