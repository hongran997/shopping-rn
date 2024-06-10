import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@/hooks';
import { useLocalSearchParams } from 'expo-router';
import { sortList } from '@/utils';
import Icons from './common/Icons';
import Modal from './common/Modal';
import tw from 'twrnc';

const Sort = (props) => {

  // Props
  const { handleChangeRoute } = props;

  // Assets
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const [isSort, sortHandlers] = useDisclosure();

  // State
  const [sort, setSort] = useState(sortList[0]);

  // Handlers
  const handleSort = (item) => {
    setSort(item);
    handleChangeRoute({ sort: item.value });
    sortHandlers.close();
  }
 
  useEffect(() => {
    if (params.sort) {  // 如果params.sort = 1, 把sortList[0] 赋值给sort
      // params.sort 是 string 类型， + 可以帮助params.sort 转化为number 类型 
      setSort(sortList[+params.sort - 1]);
    } else {
      setSort(sortList[0]);
    }
  }, [params])
  
  useEffect(() => {
    setSort(sortList[0]);
  },[params.categroy])


  // Renders
  return (
    <>
      <View style={tw`pr-3`}>
        <Pressable style={tw`flex flex-row items-center gap-x-1`} onPress={sortHandlers.open}>
          <Icons.FontAwesome5 name="sort-amount-down-alt" size={16} style={tw`text-neutral-600`} />
          <Text style={tw`text-base text-neutral-600`}>过滤</Text>
        </Pressable>
      </View>
      <Modal
        isShow={isSort}
        onClose={sortHandlers.close}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={sortHandlers.close}
        style={[tw`w-[70vw] h-[100vh] px-5 py-5 bg-white flex justify-start`, { paddingTop: insets.top > 20 ? insets.top : 20 }]}
      >
        <Modal.Content onClose={sortHandlers.close}>
          <Modal.Header onClose={sortHandlers.close}>排序</Modal.Header>
          <Modal.Body>
            {/* TODO  这里的divide 没有生效呀 */}
            <View style={tw`flex flex-col-reverse divide-y divide-y-reverse`}>
              {
                sortList.map(item => (
                  <Pressable onPress={() => handleSort(item)} key={item.value}
                    style={tw`flex flex-row justify-between items-center`}>
                    <View style={tw`block py-3 text-left text-neutral-700`} type="button" name="sort">
                      <Text>{item.name}</Text>
                    </View>
                    {
                      sort?.value === item.value && (
                        <Icons.AntDesign name="checkcircleo" size={16} style={tw`icon`} />
                      )
                    }
                  </Pressable>
                ))
              }
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default Sort

const styles = StyleSheet.create({})