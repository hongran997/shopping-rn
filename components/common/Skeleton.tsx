import tw from 'twrnc';
import { View } from 'react-native'
import React from 'react';

const Skeleton = props => {
  //? Porps
  const { count, children } = props

  //? Assets
  const arr = Array(count).fill('_')

  //? Render(s)
  return (
    <>
      {arr.map((item, index) =>
        React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index })
          }
          return child
        })
      )}
    </>
  )
}

const Items = props => {
  //? Props
  const { index, children, style } = props
  //? Render(s)
  return (
    <View style={style}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index })
        }
        return child
      })}
    </View>
  )
}

export const Item = (props) => {

  // Good
  const { width, height, animated, style, index } = props
  
  return (
    <View
      key={index}
      style={tw` ${height} ${width} ${animated === 'background'
          ? 'animate-pulse bg-red-200'
          : animated === 'border'
            ? 'animate-pulse border-2 border-red-200'
            : 'bg-white'
        } rounded-md ${style}`}
    >
      {/* {children} */}
    </View>
  )
}

const _default = Object.assign(Skeleton, {
  Skeleton,
  Items,
  Item,
})

export default _default