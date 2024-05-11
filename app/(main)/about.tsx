import { StyleSheet, Text, View } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router';

const About = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View>
      <Text
        onPress={() => {
          router.setParams({ name: 'Updated' })
        }}
      >
        Update the title
      </Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({

})