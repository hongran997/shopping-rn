import { Text, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, useRouter } from 'expo-router'
import { registerSchema } from '@/utils'
import { userLogin } from '@/store'
import { useCreateUserMutation } from '@/services'
import { useAppDispatch } from '@/hooks'
import { Button, HandleResponse, Logo, TextField } from '@/components'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import tw from 'twrnc'

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // 
  const [createUser, { data, isSuccess, isError, isLoading, error }] = useCreateUserMutation();
  
  // 
  const { handleSubmit, formState: { errors: formErrors}, setFocus, control } = useForm({resolver: yupResolver(registerSchema), defaultValues: {name: '', email: '', password: '', confirmPassword: ''}})

  useEffect(() => {
    setFocus('name');
  })

  const onSubmit = ({ name, email, password }) => {
    if (name && email && password) {
      createUser({body: {name, email, password}})
    }
  }

  const onSuccess = () => {
    dispatch(userLogin(data.data.token));
    router.back();
  }

  return (
    <>
      <Stack.Screen options={{ title: '注册', headerBackTitleVisible: false }}></Stack.Screen>
      {(isSuccess || isError) && <HandleResponse isSuccess={isSuccess} isError={isError} error={error?.data?.message || '发生异常'} message={data?.message} onSuccess={onSuccess} />}
      <View style={tw`w-full h-full bg-white pt-10 px-8`}>
        <Logo style={tw`w-40 h-16 mx-auto`}></Logo>
        <Text style={tw`mt-5`}>注册</Text>
        <TextField errors={formErrors.name} control={control} placeholder='请输入您的账户名称' name='name'></TextField>
        <TextField errors={formErrors.email} control={control} placeholder='请输入您的账户邮箱' name='email' keyboardType="email-address" autoCapitalize="none"></TextField>
        <TextField errors={formErrors.password} control={control} placeholder='请输入您的账户密码' name='password' secureTextEntry></TextField>
        <TextField errors={formErrors.confirmPassword} control={control} placeholder='确认密码，请再次输入' name='confirmPassword' secureTextEntry style='mb-1'></TextField>
        <Button loading={isLoading} onPress={handleSubmit(onSubmit)} >注册</Button>
        <View style={tw`flex flex-row mt-2`}>
          <Text style={tw`inline mr-2 text-gray-800 text-xs`}>我已有账户了</Text>
          <Link replace href="/login" style={tw`text-blue-400 text-xs`}>去登录</Link>
        </View>
      </View>
    </>
  )
}

export default Register