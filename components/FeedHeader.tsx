import { StyleSheet, Text, View, Pressable, TouchableOpacity  } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import Logo from './svgs/logo.svg';
import Icons from './common/Icons';

import { useAppSelector } from '@/hooks';
import { formatNumber } from '@/utils';
import { router } from 'expo-router';
import Search from './Search';


const FeedHeader = () => {
  const insets = useSafeAreaInsets();

  const { totalItems } = useAppSelector(state => state.cart);

  const handleTouchClick = (path: string) => {
    router.push(path);
  }

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: 10, backgroundColor: '#fff'}} >
      <View style={[styles.container, { justifyContent: "space-between" }]}>
        <View style={styles.section}>
          <Logo width={120} height={40} />
        </View>
        <View style={styles.section}>
          <Pressable onPress={() => handleTouchClick('/notice')}>
            <Icons.Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>

          <Pressable onPress={() => handleTouchClick('/cart')}>
            <Icons.AntDesign name="shoppingcart" size={24} color="black" />
            {
              formatNumber(totalItems) && (
                <View style={styles.cartNum}>
                  <Text style={{ color: 'red' }}>{formatNumber(totalItems)}</Text>
                </View>
              )
            }
          </Pressable>
        </View>
      </View>
      <Search />
    </View>
  )
}

export default FeedHeader

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  cartNum: {
    position: "absolute",
    top: -5,
    right: -2,
  }
})