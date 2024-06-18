import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from 'moment-jalaali'
import tw from 'twrnc'
import Icons from '../common/Icons'

const ReviewProductCard = (props) => {

  const { item } = props;

  return (
    <View style={tw`flex flex-row pt-3 w-full`}>
      {/* left: rating */}
      <View style={tw`w-5 h-5 text-center rounded-md text-white 
        ${item.rating <= 2 ? 'bg-red-500' : item.rating == 3 ? 'bg-amber-500' : 'bg-green-500'}`}>
        {item.rating}
      </View>
      {/* right: title + comment + positive comment + negative comment */}
      {/* Good flex-1 */}
      <View style={tw`flex-1 px-2.5 lg:px-6 gap-y-2`}>
        {/* title */}
        <View style={tw`w-full flex flex-row items-center flex-wrap border-b border-gray-300 gap-x-2`}>
          <Text >{ item.title}</Text>
          <Text >{moment(item.updatedAt).format('YYYY-MM-DD')}</Text>
          <Text >{ item.user?.name }</Text>
        </View>
        {/* comment */}
        <Text style={tw`w-full`}>{ item.comment }</Text>
        {/* positive comment */}
        {
          item.positivePoints.map((point) => (
            <View style={tw`flex flex-row flex-wrap gap-x-1`} key={point._id }>
              <Icons.AntDesign size={16} name="plus" style={tw`text-green-400 icon`} />
              <Text>{point.title}</Text>
            </View>
          ))
        }
        {/* negative comment */}
        {
          item.negativePoints.map((point) => (
            <View style={tw`flex flex-row flex-wrap gap-x-1 `} key={point._id}>
              <Icons.AntDesign size={16} name="minus" style={tw`text-red-400 icon`} />
              <Text>{point.title}</Text>
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default ReviewProductCard

const styles = StyleSheet.create({})