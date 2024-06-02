import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useController } from 'react-hook-form';
import DisplayError from './DisplayError';


const TextField = (props) => {

  const { label, errors, name, type = 'text', control, direction, style, ...inputProps } = props

  const { field } = useController({ name, control, rules: { required: true } });

  const onChangeHandler = (value) => {
    const inputValue = value;
    if (type == 'number' && inputValue.length !== 0) {
      field.onChange(parseInt(inputValue));
    } else {
      field.onChange(inputValue);
    }
  }

  return (
    <View style={tw`w-full`}>
      {label && <Text style={tw`text-xs text-gray-700`}>{label}</Text>}
      <TextInput
        id = {name}
        value = {field.value}
        name = {field.name}
        onBlur={field.onBlur}
        onChangeText={onChangeHandler}
        ref = {field.ref}
        style={tw`w-full px-3 py-2.5 transition-colors border border-gray-200 rounded-md outline-none bg-zinc-50/30 focus:border-blue-600 leading-none mt-2 ${style}`}
        {...inputProps}
      />
      <DisplayError errors={ errors} />
    </View>
  )
}

export default TextField

const styles = StyleSheet.create({})