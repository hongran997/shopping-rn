import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Toast from 'react-native-toast-message';

const HandleResponse = (props) => {

  const { isSuccess, isError, error, message, onSuccess, onError } = props;

  useEffect(() => {
    if (isSuccess) {
      if (onSuccess) onSuccess();
      Toast.show({ type: 'success', text2: message });
    }
    if (isError) {
      if (onError) onError();
      Toast.show({ type: 'error', text2: error });
    }
  },[])


  return null;
}

export default HandleResponse

const styles = StyleSheet.create({})