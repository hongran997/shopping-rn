import { StyleSheet, Text, View, Pressable } from 'react-native';
import EmptyCustomList from '../emptyList/EmptyCustomList';
import PageLoading from '../loading/PageLoading';
import React from 'react'

const ShowWrapper = (props: any) => {

  const { isError, error, refetch, isFetching, dataLength, type = 'list', origialArgs = null,
    isSuccess, emptyComponent, loadingComponent, children } = props;


  return (
    <>
      {
        isError ? (
          <View style={styles.container}>
            <View style={styles.warnTitle}>出现异常</View>
            <View style={styles.warnMsg}>{error?.error}</View>
            <Pressable style={styles.touchbtn} onPress={refetch}>
              <Text style={styles.retrybtn}>重试</Text>
            </Pressable>
          </View>
        ) : isFetching ? (type === 'list' && origialArgs && origialArgs?.page > 1) ? (<>{children}</>)
            : <>{loadingComponent || <PageLoading />}</>   
        : isSuccess && type == 'list' && dataLength > 0 ? (<>{children}</>) 
      : (isSuccess && type === 'list') && dataLength === 0 ? <>{emptyComponent || <EmptyCustomList />}</> 
      : (isSuccess && type === 'detail') ? <>{children}</>
      : null
      }
    </>
  )
}

export default ShowWrapper

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    flex: 1
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
    // paddingVertical: 2,
    // paddingHorizontal: 4,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  }
})