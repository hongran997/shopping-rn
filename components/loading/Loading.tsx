import React from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import tw from 'twrnc'

// TODO  loading  可以展示出来，不知道为什么这样展示
export default function Loading(props) {
  //? Props
  const { style } = props

  //? Assets
  const onePoint = useSharedValue(0)
  const twoPoint = useSharedValue(0)
  const threePoint = useSharedValue(0)
  const fourPoint = useSharedValue(1)

  const animatedOnePointStyles = useAnimatedStyle(() => ({
    transform: [{ scaleX: onePoint.value }, { scaleY: onePoint.value }],
  }))

  const animatedTwoPointStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: twoPoint.value }, { translateY: 0 }],
  }))

  const animatedThreePointStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: threePoint.value }, { translateY: 0 }],
  }))

  const animatedFourPointStyles = useAnimatedStyle(() => ({
    transform: [{ scaleX: fourPoint.value }, { scaleY: fourPoint.value }],
  }))

  React.useEffect(() => {
    onePoint.value = withRepeat(withTiming(1, { duration: 600 }), -1, false)
    twoPoint.value = withRepeat(withTiming(24, { duration: 600 }), -1, false)
    threePoint.value = withRepeat(withTiming(24, { duration: 600 }), -1, false)
    fourPoint.value = withRepeat(withTiming(0, { duration: 600 }), -1, false)
  }, [])

  return (
    <View style={tw`w-[80] h-[24] relative inline-block ${style}`}>
      <Animated.View
        style={[tw`w-[13] h-[13] bg-white rounded-full absolute top-[15%] left-[8]`, animatedOnePointStyles]}
      />
      <Animated.View
        style={[tw`w-[13] h-[13] bg-white rounded-full absolute top-[15%] left-[8]`, animatedTwoPointStyles]}
      />
      <Animated.View
        style={[tw`w-[13] h-[13] bg-white rounded-full absolute top-[15%] left-[32]`, animatedThreePointStyles]}
      />
      <Animated.View
        style={[tw`w-[13] h-[13] bg-white rounded-full absolute top-[15%] left-[56]`, animatedFourPointStyles]}
      />
    </View>
  )
}