import { StyleSheet, Text, View } from 'react-native'

const DiscountProduct = ({ discount }) => {
  return (
    <>
      <Text style={styles.text}>{discount}%</Text>
    </>
  )
}

export default DiscountProduct

const styles = StyleSheet.create({
  container: {
    width: 32,
    textAlign: "center",
  },
  text: {
    height: 16,
    lineHeight: 10,
    textAlign: "center",
    color: '#fff',
    backgroundColor: "red",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 3,
  }
})