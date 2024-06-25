import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc'
import { ResponsiveImage, Icons } from '@/components'
import { useState } from 'react'

const ReviewCard = (props) => {

  const { item } = props;

  const [status, setStatus] = useState(item.status)


  return (
    <>
      <View style={tw`flex flex-row py-4 space-y-3 border-b border-gray-200 gap-x-3`}>
        {/* image */}
        <View>
          <ResponsiveImage
            dimensions="w-16 h-12"
            imageStyles={tw`w-16 h-12`}
            source={item.product.images[0].url}
          />

          <View
            style={tw`w-5 h-5 text-center pt-0.5 inline-block rounded-md ml-10 mt-2  
              ${item.rating <= 2 ? 'bg-red-500' : item.rating === 3 ? 'bg-amber-500' : 'bg-green-500'}`}
          >
            <Text style={tw`text-white text-center`}>{item.rating}</Text>
          </View>
        </View>

        <View style={tw`flex-1`}>
          {/* header */}
          <View style={tw`flex pb-1 border-b border-gray-100 justify-between gap-y-2`}>
            <Text style={tw`pt-2`}>{item.title}</Text>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View
                style={tw`flex flex-row w-fit items-center p-1 rounded-md ${status === 1 ? 'bg-amber-100 ' : status === 2 ? 'bg-green-100 ' : 'bg-red-100 '
                  } `}
              >
                {status === 1 ? (
                  <View style={tw`bg-amber-500 rounded-full p-0.5 icon`}>
                    <Icons.AntDesign name="clockcircle" size={16} style={tw`text-white`} />
                  </View>
                ) : status === 2 ? (
                    <View style={tw`rounded-full p-0.5 bg-green-500 icon`}>
                      <Icons.AntDesign name="checkcircle" size={16} style={tw`text-white`} />
                  </View>
                ) : (
                      <View style={tw`rounded-full p-0.5 icon bg-red-500`}>
                        <Icons.Entypo name="circle-with-cross" size={16} style={tw`text-white`} />
                  </View>
                )}
                <Text
                  style={tw`ml-2 ${status === 1
                      ? 'text-amber-500'
                      : status === 2
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                >
                  {status === 1 ? '等待确认' : status === 2 ? '已经确认' : '不见了'}
                </Text>
              </View>
              <Icons.Feather name="more-vertical" size={18} />
            </View>
          </View>

          {/* content */}
          <View style={tw`py-4 space-y-2`}>
            <Text>{item.comment}</Text>
            <View>
              {item.positivePoints.map(point => (
                <View style={tw`flex flex-row items-center gap-x-1`} key={point.id}>
                  <Icons.AntDesign name="plus" size={20} style={tw`text-green-400 icon`} />
                  <Text>{point.title}</Text>
                </View>
              ))}
            </View>
            <View>
              {item.negativePoints.map(point => (
                <View style={tw`flex flex-row items-center gap-x-1`} key={point.id}>
                  <Icons.AntDesign name="minus" size={20} style={tw`text-red-400 icon`} />
                  <Text>{point.title}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default ReviewCard

const styles = StyleSheet.create({})