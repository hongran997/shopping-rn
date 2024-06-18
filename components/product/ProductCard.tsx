import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import ResponsiveImage from '../common/ResponsiveImage';
import Icons from '../common/Icons';
import ProductPrice from './ProductPrice';
import Depot from './Depot';
import SpecialSell from './SpecialSell';
import { truncate } from '@/utils';
import { Link } from 'expo-router';
import tw from 'twrnc';
import DiscountProduct from './DiscountProduct';

const ProductCard = (props) => {

  // Props
  const { product } = props;

  // Renders
  return (
    <Link href={`/product/${product._id}`}
      asChild>
      <Pressable style={tw`relative py-2 border-b border-gray-300`}>
        {/* SpecialSell - absolute */}
        <View style={tw`absolute top-2 left-0 z-10`}>
          <SpecialSell discount={product.discount} inStock={ product.inStock}></SpecialSell>
        </View>
        {/* left and right */}
        <View style={tw`w-[100%] flex flex-row justify-between items-end`}>
          {/* Product Image and Product Color */}
          <View style={tw`flex w-1/3 p-1`}>
            <ResponsiveImage
              source={product.images[0]?.url}
              style={tw`w-26 h-26`}
              imageStyles={tw`w-full h-full`}
              alt={product.title}
            />
            <View style={tw`flex flex-row gap-1.5 items-end justify-around`}>
              {
                product.inStock != 0 && product.colors &&
                product.colors?.slice(0, 3).map(color => (
                  <View
                    key={color.id}
                    style={[tw`w-2.5 h-2.5 inline-block rounded-xl border-gray-300 shadow border`, { backgroundColor: color.hashCode }]}
                  ></View>
                ))
              }
              {
                product.colors.length > 3 && product.inStock > 0 && (
                  <Icons.AntDesign name="plus" style={tw`w-2.5 h-2.5`}></Icons.AntDesign>
                )
              }
            </View>
          </View>
          {/* 
            1. Product Detail 
            2. Product Instock and Product Rating 
            3. Product Discount and Product Price 
          */}
          <View style={tw`flex  w-2/3 px-2`}>
            {/* Product Detail */}
            <Text style={tw`w-[100%] h-12 leading-6 text-sm text-gray-800 break-all`}>
              {truncate(product.title, 70)}
            </Text>
            {/* Product Instock and Product Rating */}
            <View style={tw`w-[100%] flex flex-row ${(product.discount && product.inStock > 0) ? 'justify-between' : 'justify-end'} py-2 items-center`} >
              {product.inStock == 0 ? null : <Depot inStock={product.inStock}></Depot>}
              <View style={tw`flex flex-row items-center gap-x-1`}>
                <Text style={tw`text-neutral-500`}>{ product.rating }</Text>
                <Icons.AntDesign name="star" size={ 16 } style={tw`text-amber-400`}></Icons.AntDesign>
              </View>
            </View>
            {/* Product Discount and Product Price */}
            <View style={tw`w-[100%] flex flex-row ${(product.discount && product.inStock > 0) ? 'justify-between' : 'justify-end'} items-center`}>
              {
                product.discount > 0 && product.inStock != 0 && (
                  <DiscountProduct discount={product.discount}></DiscountProduct>
                )
              }
              {
                product.inStock != 0 ? (
                  <ProductPrice inStock={product.inStock} discount={product.discount} price={ product.price}></ProductPrice>
                ) : <Text style={tw`h-12 my-0.5`}>不可用</Text>
              }
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}

export default ProductCard

const styles = StyleSheet.create({})