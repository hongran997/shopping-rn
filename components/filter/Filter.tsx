import { Pressable, StyleSheet, Text, View, Switch, TextInput } from 'react-native'
import { useAppDispatch, useAppSelector, useDisclosure, useDebounce } from '@/hooks';
import { useLocalSearchParams } from 'expo-router';
import { loadFilters, updateFilter, resetFilter } from '@/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import Icons from '../common/Icons';
import Modal from '../common/Modal';
import tw from 'twrnc';


const Filter = (props) => {

  // !Important 这个页面的逻辑很多， 对学习很有帮助

  // Props
  const { mainMaxPrice, mainMinPrice, handleChangeRoute } = props;

  // Assets
  const dispatch = useAppDispatch();  // 有需要修改store的时候，都需要引用useAppDispatch
  const [isFilters, filtersHandlers] = useDisclosure(); // true, {open, close, toggle}  有需要修改model开闭状态的时候，都需要引用useDisclosure
  const params = useLocalSearchParams(); // 有需要用到路由中参数的时候，都需要引用useLocalSearchParams
  const insets = useSafeAreaInsets();  // 有需要考虑到安全距离的时候，都需要引用useSafeAreaInsets

  // State
  const filters = useAppSelector(state => state.filters); // store里有很多state id, 取出filters，对状态做统一管理

  // Debounced Value
  const debouncedMinPrice = useDebounce(filters.minPrice, 1200);  // 做些性能优化
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 1200);  // 做些性能优化

  // Handlers
  const handleFilter = (props) => {
    const { name, value, type } = props;
    const filterValue = value;
    dispatch(updateFilter({ name, value: filterValue }));
    if (type === 'checkbox') handleChangeRoute({ [name]: filterValue });
  }

  const handleResetFilter = (props) => {
    handleChangeRoute({ inStock: '', discount: '', price: '' });
    dispatch(resetFilter({ maxPrice: String(mainMaxPrice), minPrice: String(mainMinPrice) }));
    if (filtersHandlers.close) filtersHandlers.close(); 
  }

  const canReset = !!params.inStock || !!params.discount || mainMinPrice != debouncedMinPrice || mainMaxPrice != debouncedMaxPrice;

  // 如果category, mainMaxPrice, mainMinPrice, dispatch 有变化，就更新product index 页面
  useEffect(() => {
    dispatch(loadFilters({
      price: mainMaxPrice && mainMinPrice ? `${mainMinPrice}-${mainMaxPrice}` : '',
      discount: 'false',
      inStock: 'false',
      ...params,
    }))
  }, [params.category, mainMaxPrice, mainMinPrice, dispatch])

  // 如果debouncedMinPrice 有变化，就更新筛选条件
  useEffect(() => {
    if (Number(debouncedMinPrice) && mainMaxPrice !== Number(debouncedMinPrice)) {
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`
      })
    }
  }, [debouncedMinPrice])

  // 如果debouncedMaxPrice 有变化，就更新筛选条件
  useEffect(() => {
    if (Number(debouncedMaxPrice) && mainMaxPrice !== Number(debouncedMaxPrice)) {
      handleChangeRoute({
        price: `${ debouncedMinPrice }-${ debouncedMaxPrice }`
      })
    }
  }, [debouncedMaxPrice])

  // 如果discount, inStock, debouncedMaxPrice, debouncedMinPrice 有变化，就关掉弹窗
  useEffect(() => {
    if (filtersHandlers.close) filtersHandlers.close();
  }, [filters.discount, filters.inStock, debouncedMaxPrice, debouncedMinPrice])


  // Renders
  return (
    <>
      <View style={tw`pr-3`}>
        <Pressable style={tw`flex flex-row items-center gap-x-1`} onPress={filtersHandlers.open}>
          <Icons.Ionicons name="filter" size={16} style={tw`text-neutral-600`} />
          <Text style={tw`text-base text-neutral-600`}>筛选</Text>
        </Pressable>
      </View>
      <Modal
        isShow={isFilters}
        onClose={filtersHandlers.close}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={filtersHandlers.close}
        style={[tw`w-[70vw] h-[100vh] px-5 py-5 bg-white flex justify-start`, { paddingTop: insets.top > 20 ? insets.top : 20  }]}
        >
        <Modal.Content onClose={filtersHandlers.close} >
          <Modal.Header onClose={filtersHandlers.close} >过滤器</Modal.Header>
          <Modal.Body>
            <View style={tw``}>
              <Pressable disabled={!canReset} onPress={handleResetFilter}>
                <Text type="button" style={tw`text-sm text-sky-500`}>删除过滤器</Text>
              </Pressable>
            </View>
            {/* 这里设置divide 也不管用 */}
            <View style={tw`grid grid-cols-1 divide-y`}>
              {/* 过滤器一 */}
              <View style={tw`flex flex-row justify-between items-center py-2.5`}>
                <Text style={ tw`font-medium text-gray-700 w-3/4`}>仅限库存商品</Text>
                <Switch value={filters.inStock} onValueChange={value => handleFilter({ name: 'inStock', type: 'checkbox', value })}></Switch>
              </View>
              {/* 过滤器二 */}
              <View style={tw`flex flex-row justify-between items-center py-2.5`}>
                <Text style={tw`font-medium text-gray-700 w-3/4`}>仅限特价商品</Text>
                <Switch value={filters.discount} onValueChange={value => handleFilter({ name: 'discount', type: 'checkbox', value })}></Switch>
              </View>
              {/* 过滤器三 */}
              <View style={tw`py-4`}>
                <Text style={tw`font-medium text-gray-700`}>价格范围</Text>
                <View style={tw`flex flex-row justify-between items-center gap-1 `}>
                  <Text style={tw`text-base`}>从</Text>
                  <TextInput
                    style={tw`w-3/4 px-1 text-xl text-left border-b border-gray-200`}
                    keyboardType='number-pad'
                    value={filters.minPrice || 0}
                    onChangeText={value => handleFilter({name: 'minPrice', type: 'input', value})}
                  ></TextInput>
                  <Text style={tw`w-6 h-6`}>￥</Text>
                </View>
                <View style={tw`flex flex-row justify-between items-center gap-1`}>
                  <Text style={tw`text-base`}>到</Text>
                  <TextInput
                    style={tw`w-3/4 px-1 text-xl text-left border-b border-gray-200`}
                    keyboardType='number-pad'
                    value={filters.maxPrice || 0}
                    onChangeText={value => handleFilter({ name: 'maxPrice', type: 'input', value })}
                  ></TextInput>
                  <Text style={tw`w-6 h-6`}>￥</Text>
                </View>
              </View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default Filter

const styles = StyleSheet.create({})