import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { Icons, Skeleton, UserMobileModal, UserNameModal } from '@/components'
import { useDisclosure, useUserInfo } from '@/hooks'
import tw from 'twrnc'

const PersonalInfoScreen = () => {
  //? Assets
  const [isShowNameModal, nameModalHandlers] = useDisclosure()
  const [isShowPhoneModal, phoneModalHandlers] = useDisclosure()

  //? Get User Data
  const { userInfo, isLoading } = useUserInfo()

  //? Local Component
  const InfoField = ({ label, info, editHandler, isLoading }) => (
    <View style={tw`flex px-5`}>
      <View style={tw`flex flex-row items-center justify-between py-4 border-b border-gray-200`}>
        <View style={tw`flex gap-y-2`}>
          <Text style={tw`text-xs text-gray-700`}>{label}</Text>
          {isLoading
            ? <Skeleton.Item animated="background" height="h-5" width="w-44" />
            : <Text style={tw`h-5 text-sm`}>{info}</Text>
          }
        </View>
        {
          isLoading
            ? null
            : info
              ? <Icons.Feather
                onPress={editHandler}
                name="edit"
                size={16}
                style={tw`cursor-pointer icon`}
                />
              : <Icons.Feather
                onPress={editHandler}
                name="plus"
                size={16}
                style={tw`cursor-pointer icon`}
                />
        }
      </View>
    </View>
  )

  //? Render(s)
  return (
    <>
      <Stack.Screen
        options={{
          title: '帐户信息',
          headerBackTitleVisible: false,
        }}
      />
      {!isLoading && userInfo && (
        <>
          <UserNameModal
            isShow={isShowNameModal}
            onClose={nameModalHandlers.close}
            editedData={userInfo.name}
          />
          <UserMobileModal
            isShow={isShowPhoneModal}
            onClose={phoneModalHandlers.close}
            editedData={userInfo.mobile}
          />
        </>
      )}
      <View style={tw`h-full bg-white`}>
        <InfoField
          label="名字和姓氏"
          info={userInfo?.name}
          editHandler={nameModalHandlers.open}
          isLoading={isLoading}
        />
        <InfoField
          label="电话号码"
          info={userInfo?.mobile}
          editHandler={phoneModalHandlers.open}
          isLoading={isLoading}
        />
      </View>
    </>
  )
}

export default PersonalInfoScreen