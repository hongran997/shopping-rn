import { StyleSheet, Text, View, Pressable } from 'react-native';
import EmptyCustomList from '../emptyList/EmptyCustomList';
import Loading from '../loading/Loading';
import ErrorPage from './ErrorPage';
import React from 'react'

const ShowWrapper = (props: any) => {

  const { isFetching, isSuccess, isError, error, refetch,
    dataLength, type = 'list', origialArgs = null, children,
    loadingComponent, emptyComponent } = props;
  

  return (
    <>
      {
        isError
          ? <ErrorPage error={error} refetch={refetch} />  // 报错接口
          : isFetching
            ? (
                type === 'list' && origialArgs && origialArgs?.page > 1
                  ? <>{children}</>  // 如果fetching 第二页的，那就展示第一页的数据呗
                  : loadingComponent || <Loading />  // 如果就是fetch第一页的数据，就显示loading
              ) 
            : isSuccess && type == 'list' && dataLength > 0
              ? <>{children}</>   // 有数据的列表
              : isSuccess && type === 'list' && dataLength === 0
                  ? emptyComponent || <EmptyCustomList />   // 空列表
                  : isSuccess && type === 'detail'  
                    ? <>{children}</>    //  商品详情
                    : null
      }


      {/* Good 单个组件测试 */}
      {/* <ErrorPage error={error} refetch={refetch} /> */}
      {/* <Loading />  */}
      {/* <EmptyCustomList />  */}
    </>
  )
}

export default ShowWrapper