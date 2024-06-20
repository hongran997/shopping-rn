import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import tw from 'twrnc';
import Icons from './Icons';

const Modal = (props) => {

  // Props
  // TODO effect 是什么意思？
  const { isShow, onClose, closeOnClickOverlay, modalStyles, effect, children, ...restProps } = props;


  // Handers
  const handleBackdropPress = () => {
    closeOnClickOverlay && onClose();
  } 

  // Renders
  return (
    <ReactNativeModal
      isVisible={isShow}
      onBackdropPress={handleBackdropPress}
      {...restProps}>
      {
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClose })
          }
          return child
        })
      }
    </ReactNativeModal>
  )
}

const Content = (props) => {

  // Props
  const { onClose, children, ...restProps } = props;
  
  // Renders
  return (
    <View {...restProps}>
      {
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // cloneElement 后面的onClose 是干什么的?
            // React.cloneElement() 方法的第二个参数用于传递新的属性集合，这些属性将被浅层合并到克隆后的新元素中。这意味着如果原元素已经拥有某些属性，而这些属性在新的集合中也有定义，那么新集合中的值将会覆盖原元素的对应属性值。这种机制提供了一种灵活的方式来更新元素的属性，同时保留那些不需要更改的属性。
            // React.cloneElement() 方法是一个强大的工具，它允许开发者在不破坏原有组件结构的前提下，对组件进行扩展和自定义。通过这个方法，可以很容易地实现组件属性的复写，从而在不同的上下文中重用相同的组件，同时根据需要调整其行为。
            React.cloneElement(child, onClose );
          }
          return child;
        })
      }
    </View>
  )

}

const Header = (props) => {

  // Props
  const { onClose, children } = props;

  // Render
  return (
    <View style={tw`flex flex-row items-center justify-between pb-2 border-b-2 border-gray-200 mb-2`}>
      <Text style={tw`text-sm`}>{children}</Text>
      <Pressable onPress={onClose} style={tw`p-1`}>
        <Icons.AntDesign name="close" size={16} style={tw`icon`} />
      </Pressable>
    </View>
  )

}

const Body = ({children}) => {
  return <>{ children }</>
}

const _default = Object.assign(Modal, { Modal, Content, Header, Body });
export default _default

const styles = StyleSheet.create({})