import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import FeedSectionContainer  from './common/FeedSectionContainer';
import { FlashList } from "@shopify/flash-list";
import { Link } from 'expo-router';
import tw from 'twrnc';

const Categories = (props: any) => {
  
  const { childCategories, color, name } = props;

  if (childCategories.categories.length > 0 && color && name) {
    return (
      <FeedSectionContainer title="分类" >
        <FlashList
          data={childCategories.categories}
          horizontal
          renderItem={({ item, index }) => (
            <Link key={item._id} href={{ pathname: '/product', params: { category: item.slug } }} asChild >
              <Pressable style={tw`flex items-center mr-3`}>
                <View style={tw`w-14 h-14 rounded-full border-solid border-2 border-slate-200 overflow-hidden`}>
                  <Image key={index} source={{ uri: item.image }} style={tw`w-full h-full `} />
                </View>
                <Text style={tw`text-gray-700` }>{ item.name }</Text>
              </Pressable>
            </Link>
          )}
          estimatedItemSize={200}
        >
        </FlashList>
      </FeedSectionContainer>
    )
  }
}

export default Categories