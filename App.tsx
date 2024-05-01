import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [name, setName] = useState<string | undefined>(undefined);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"yellow"}}>
      <View style={styles.container}>
        {
          name ? <Text>My Name is {name}</Text> :
            <View>
              <Text>Pls input your name: </Text>
              <TextInput
                value={name}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => setName(text)}>
              </TextInput>
            </View>
        }
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
