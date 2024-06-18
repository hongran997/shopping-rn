import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icons from '../common/Icons'
import { Link } from 'expo-router'
import tw from 'twrnc'
import React from 'react'
import { formatNumber } from '@/utils'

const ProductHeader = (props) => {

  const { totalItems } = props;
  
  return (
    <View style={ tw`flex flex-row items-center`}>
      <Link href="/cart" style={tw`relative`}>
        <Pressable>
          <Icons.AntDesign name="shoppingcart" size={24} color="#1F2937" style={tw`px-2 py-1`} />
          {
            formatNumber(totalItems) && (
              <Text style={tw`absolute outline outline-2 bottom-3.5 left-5 bg-red-500 w-5 h-5 p-0.5 rounded-md text-white text-sm text-center`}>
                {formatNumber(totalItems)}
              </Text>
            )
          }
        </Pressable>
      </Link>
      <Icons.Feather name="heart" size={20} color="#1F2937" style={tw`px-2 py-1`}></Icons.Feather>
    </View>
  )
}

export default ProductHeader

const styles = StyleSheet.create({})