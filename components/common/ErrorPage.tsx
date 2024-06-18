import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const ErrorPage = (props) => {
  
  const { error, refetch } = props;

  return (
    <View style={styles.container}>
      {/* Good */}
      <Text style={styles.warnTitle}>出现异常</Text>
      <Text style={styles.warnMsg}>{error?.error}</Text>
      <Pressable style={styles.touchbtn} onPress={refetch}>
        <Text style={styles.retrybtn}>重试</Text>
      </Pressable>
    </View>
  )
}

export default ErrorPage

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: "30%",
    flex: 1,
    backgroundColor: 'white'
  },
  warnTitle: {
    fontSize: 15,
    marginBottom: 3,
    marginLeft: "30%"
  },
  warnMsg: {
    color: 'red',
    marginBottom: 10,
    marginLeft: "30%"
  },
  touchbtn: {
    display: "flex",
    alignItems: "center"
  },
  retrybtn: {
    color: '#fff',
    backgroundColor: 'red',
    borderRadius: 5,
    width: 40,
    height: 20,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  }
})