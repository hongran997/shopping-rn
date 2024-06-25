import {View } from 'react-native'
import Skeleton from '../common/Skeleton'
import tw from 'twrnc'

const OrderSkeleton = () => {
  return (
    <View style={tw`bg-white pt-3`}>
      <Skeleton count={5}>
        <Skeleton.Items style={tw`mb-8 gap-y-2`}>
          <Skeleton.Item animated="background" height="h-5" width="w-64" style="rounded-full" />
          <Skeleton.Item animated="background" height="h-5" width="w-20" style="rounded-md" />
          <View style={tw`flex flex-row gap-x-3`}>
            <Skeleton.Item animated="background" height="h-20" width="w-20" style="rounded-md" />
            <Skeleton.Item animated="background" height="h-20" width="w-20" style="rounded-md" />
            <Skeleton.Item animated="background" height="h-20" width="w-20" style="rounded-md" />
            <Skeleton.Item animated="background" height="h-20" width="w-20" style="rounded-md" />
          </View>
        </Skeleton.Items>
      </Skeleton>
    </View>
  )
}

export default OrderSkeleton