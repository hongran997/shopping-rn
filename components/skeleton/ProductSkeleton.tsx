import { StyleSheet, View, Text } from 'react-native'
import Skeleton from '../common/Skeleton'
import tw from 'twrnc';

const ProductSkeleton = () => {
  return (
    <>
      <Skeleton count={10}>
        <Skeleton.Items style={tw`flex flex-row mb-6 gap-3 space-x-3`}>
          <Skeleton.Item width="w-28" height="h-26" animated="background" style="rounded-md" />
          <View style={tw`flex-col flex-1 gap-y-2 w-full`}>
            <Skeleton.Item width="w-[100%]" height="h-5" animated="background" />
            <Skeleton.Item width="w-[70%]" height="h-5" animated="background" />
            <Skeleton.Item width="w-28" height="h-5" animated="background" />
            <View style={tw`flex flex-row justify-between`}>
              <Skeleton.Item width="w-20" height="h-5" animated="background" />
              <Skeleton.Item width="w-20" height="h-5" animated="background" />
            </View>
          </View>
        </Skeleton.Items>
      </Skeleton>
    </>
  )
}

export default ProductSkeleton

const styles = StyleSheet.create({})