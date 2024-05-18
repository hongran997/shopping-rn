import { StyleSheet, Text, View, Pressable } from 'react-native'
import { router } from 'expo-router'
import Icons  from './common/Icons';
import React from 'react'

const Search = () => {
  const handleSearch = () => {
    router.push('/search');
  }

  return (
    <Pressable onPress={()=> handleSearch} style={styles.container}>
      <Text style={styles.searchBox}>善假于物，用好搜索...</Text>
      <Icons.EvilIcons style={ styles.searchIcon } name="search" size={24} color="black" />
    </Pressable>
    
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: "solid",
    display: "flex",
  },
  searchBox: {
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderStyle: "solid",
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    cursor: "pointer",
    fontSize: 13,
    padding: 5,
    marginHorizontal: 5,
  },
  searchIcon: {
    position: "absolute",
    right: 2,
    top: 0,
  }
})