import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import { useGetCategoriesQuery } from '@/services'
import { useState, useEffect } from 'react';
import { Stack, router, Link } from 'expo-router';
import { Icons, ShowWrapper } from '@/components';
import tw from 'twrnc';



const Category = () => {

  const { categories, isSuccess, isFetching, error, isError, refetch } = useGetCategoriesQuery(
    undefined,
    {
      selectFromResult: ({ data, ...args }) => ({
        categories: data?.data?.categories || [],
        ...args,
      }),
    }
  )

  const handleSearch = () => {
    router.push('/search');
  }

  const handleActive = (topCategory) => {
    setActiveMinCat(topCategory);
  }

  const [activeMinCat, setActiveMinCat] = useState({});

  useEffect(() => {
    if (categories.length) {
      setActiveMinCat(categories.filter((category) => category.level === 1)[0]);
    }
  }, [categories])


  return (
    <>
      <Stack.Screen options={{
        headerRight: () =>
          <><Icons.EvilIcons name="search"
            size={30}
            color="#1F2937"
            style={tw`px-2 py-1`}
            onPress={handleSearch}
          /></>
      }}></Stack.Screen>
      <ShowWrapper error={error} isError={isError} refetch={refetch} isFetching={isFetching} isSuccess={isSuccess}
        dataLength={categories?.length ?? 0} type="list">
        <View style={tw`h-full bg-white flex flex-row`}>
          {/* left category */}
          <ScrollView style={tw`w-3/12 h-full bg-neutral-100 shrink-0`}>
            {
              categories.length ? categories.filter((category) => category.level === 1).map(topCategory =>
                  <Pressable
                      style={tw`flex flex-col items-center px-2 py-3 space-y-2 border-b border-r border-neutral-200 bg-neutral-100 ${topCategory._id === activeMinCat._id ? 'bg-white border-r-0' : ''} `}
                      key={topCategory._id}
                      onPress={() => handleActive(topCategory)}>
                        <View style={tw`rounded-full border-solid border-2 border-slate-200 overflow-hidden`}>
                          <Image source={{uri: topCategory.image}} style={tw`w-7 h-7`} />
                        </View>
                        <Text>{topCategory.name}</Text>
                   </Pressable>
                 )  : null
            }
          </ScrollView>
          {/* right subcategory */}
          <ScrollView style={tw`w-9/12 h-full bg-white ml-2`}>
            {
              activeMinCat ? categories.map((secondCategory) => {
                if (secondCategory.parent === activeMinCat._id) {
                  return (
                    <View key={secondCategory._id}>
                      <Link href={{ pathname: '/products', params: { category: secondCategory.slug }}} asChild>
                        <Pressable>
                          <Text style={tw`break-words py-2 text-neutral-900`}>{ secondCategory.name}</Text>
                        </Pressable>
                      </Link>
                      <View style={tw`flex flex-row flex-wrap`}>
                        {
                          categories.filter(category => category.parent === secondCategory._id).map((thirdCategory, index) => (
                              <Link href={{ pathname: '/product', params: { category: thirdCategory.slug } }} key={ thirdCategory._id } asChild>
                                <Pressable style={tw`flex items-center w-[25%] mr-[11%] space-y-2 my-4 ${index % 3 == 2 ? 'mr-0' : ''}`}>
                                  <View style={tw`flex items-center justify-center w-full aspect-square rounded-full border-solid border-2 border-slate-200 overflow-hidden`}>
                                    <Image source={{ uri: thirdCategory.image}} style={tw`w-[70%] h-[70%]`} />
                                  </View>
                                  <Text style={tw`text-gray-700`}>{ thirdCategory.name }</Text>
                                </Pressable>
                              </Link>
                          ))
                        }
                      </View>
                    </View>
                  )
                }
              })
              : null
            }
          </ScrollView>
        </View>
      </ShowWrapper>
    </>
    
  )
}

export default Category

const styles = StyleSheet.create({})