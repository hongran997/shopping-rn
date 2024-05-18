import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Item = (props) => {
  const { index, height, width, animated, children, style } = props;
  return (
    <View
      key = {index}
      style={{ height: height, width: width, borderWidth: 2, borderStyle: "solid", borderColor: "red", borderRadius: 6 }}>
      {children}
    </View>
  )
}

const Items = (props) => {
  const { index, children, style } = props;
  return (
    <View style={style}>
      {
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index });
          }
        })
      }
    </View>
  )
}

const Skeleton = (props) => {
  const { count, children } = props;
  const arr = Array(count).fill('_');
  return (
    <>
      {
        arr.map(((item, index) => 
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {index})
            }
          })
        ))
      }
    </>
  )
}

const _default = Object.assign(Skeleton, { Skeleton, Items, Item });

export default _default

const styles = StyleSheet.create({})