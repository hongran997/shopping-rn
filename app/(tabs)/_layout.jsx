import { StyleSheet } from 'react-native'
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react'

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'feed',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'category',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="category" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'cart',
          tabBarIcon: ({ color }) => <Feather size={28} name="shopping-cart" color={color} />,
          href: null
        }}
        
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          href: null
        }}
      />
    </Tabs>
  );
}

export default TabLayout

const styles = StyleSheet.create({})