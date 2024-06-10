import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import SubCategoriesSkeleton from '../skeleton/SubCategoriesSkeleton';
import ResponsiveImage from '../common/ResponsiveImage';
import { Link } from 'expo-router';
import tw from 'twrnc';

const SubCategories = (props) => {
  const { isLoading, childCategories, name } = props;

  return (
    <View style={tw`mb-2`}>
      {
        isLoading
          ? <SubCategoriesSkeleton />
          : childCategories && childCategories.length > 0
            ? (
              <View>
                <Text style={tw`mb-4 text-base text-black`}>{name}</Text>
                <ScrollView horizontal style={tw`flex pb-2`}>
                  {
                    childCategories.map((childCategory) => (
                      <Link
                        key = {childCategory._id}
                        style = {tw`px-3 pt-4 pb-2 text-center border-2 border-gray-100 rounded-md mr-3`}
                        href = {{pathname: '/products', params: {category: childCategory.slug}}}
                        asChild>
                        <Pressable>
                          <ResponsiveImage source={{ uri: childCategory.image }} style={tw`w-14 h-14 mx-auto`} imageStyles={tw`w-full h-full`} alt={childCategory.name} />
                          <Text style={tw`inline-block text-xs text-neutral-600 mt-2 text-center`}>{childCategory.name}</Text>
                        </Pressable>
                      </Link>
                    ))
                  }
                </ScrollView>
              </View>
              )
            : null
      }
    </View>
  )
}

export default SubCategories

const styles = StyleSheet.create({})