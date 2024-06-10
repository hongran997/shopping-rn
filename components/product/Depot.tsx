import { Text, View } from 'react-native'
import { formatNumber } from '@/utils';
import Icons from '../common/Icons';
import tw from 'twrnc';

const Depot = (props) => {

  const { inStock } = props;

  if (inStock <= 10 && inStock > 0) {
    return (<Text> 库存仅剩{ formatNumber(inStock) } </Text>)
  } else if (inStock > 10) {
    <View style={tw`flex flex-row items-center text-teal-500 gax-x-1` }>
      <Icons.FontAwesome name="save" size={16} className="text-teal-500" />
      <Text style={tw`text-teal-700`}>仓库有售</Text>
    </View>
  } else if (inStock == 0) {
    return null
  }
}

export default Depot
