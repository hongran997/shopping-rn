import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import React from 'react'

// TODO
const Loading = (props) => {
  const { style } = props;
  const onePoint = useSharedValue(0);
  const twoPoint = useSharedValue(0);
  const threePoint = useSharedValue(0);
  const fourPoint = useSharedValue(1);

  const animatedOnePointStyles = useAnimatedStyle(() => ({ transform: [{ scaleX: onePoint.value }, { scaleY: onePoint.value }] }));
  const animatedTwoPointStyles = useAnimatedStyle(() => ({ transform: [{ scaleX: twoPoint.value }, { scaleY: twoPoint.value }] }));
  const animatedThreePointStyles = useAnimatedStyle(() => ({ transform: [{ scaleX: threePoint.value }, { scaleY: threePoint.value }] }));
  const animatedFourPointStyles = useAnimatedStyle(() => ({ transform: [{ scaleX: fourPoint.value }, { scaleY: fourPoint.value }] }));

  React.useEffect(() => {
    onePoint.value = withRepeat(withTiming(1, { duration: 600 }), -1, false);
    twoPoint.value = withRepeat(withTiming(24, { duration: 600 }), -1, false);
    threePoint.value = withRepeat(withTiming(24, { duration: 600 }), -1, false);
    fourPoint.value = withRepeat(withTiming(0, { duration: 600 }), -1, false);
  }, []);

  return (
    <View>
      <Animated.View style={animatedOnePointStyles} />
      <Animated.View style={animatedTwoPointStyles} />
      <Animated.View style={animatedThreePointStyles} />
      <Animated.View style={animatedFourPointStyles} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})