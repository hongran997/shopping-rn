import { StyleSheet, ScrollView } from 'react-native'
import Skeleton from '../common/Skeleton';
import tw from 'twrnc';

const SubCategoriesSkeleton = () => {
  return (
    <>
      <Skeleton.Item width="w-24" height="h-5" index={1} animated="background" style="mb-4"></Skeleton.Item>
      {/* 设置flex, col 排列 horizontal 横向滚动 */}
      <ScrollView horizontal style={tw`flex pb-2`}>
        <Skeleton count={8}>
          <Skeleton.Items style={tw`px-3 pt-4 pb-2 text-center border-2 border-gray-100 rounded-md mr-3`}>
            <Skeleton.Item width="w-14" height="h-14" animated="background" style="mb-2 rounded-2xl" />
            <Skeleton.Item width="w-12" height="h-4" animated="background" style="mx-auto rounded-md" />
          </Skeleton.Items>
        </Skeleton>
      </ScrollView>
    </>
  )
}

export default SubCategoriesSkeleton

const styles = StyleSheet.create({})