import { StyleSheet, Text, View, Pressable } from 'react-native'
import { router } from 'expo-router'
import Icons  from './common/Icons';
import tw from 'twrnc';

const Search = () => {
  
  const handleSearch = () => {
    router.push('/search');
  }

  return (
    <Pressable onPress={handleSearch}
      style={tw`flex flex-row rounded-md bg-zinc-100/80 justify-between items-center p-1`}>
      <Text style={tw`flex-grow py-1 px-3 text-left bg-transparent cursor-pointer text-gray-400 focus:border-none`}>
        善假于物，用好搜索...
      </Text>
      <Icons.EvilIcons name="search" size={24} color="black" />
    </Pressable>
    
  )
}

export default Search

const styles = StyleSheet.create({
  searchBox: {
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    cursor: "pointer",
    fontSize: 13,
    padding: 5,
    marginHorizontal: 5,
  },
})