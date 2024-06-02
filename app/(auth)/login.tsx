import { StyleSheet, Text, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks';
import { userLogin } from '@/store';
import { useLoginMutation } from '@/services';
import { HandleResponse, Logo, TextField, Button } from '@/components';
import tw from 'twrnc';
import { useForm } from 'react-hook-form';
import { logInSchema } from '@/utils';
import { useEffect } from 'react';
import { Link } from 'expo-router';


const login = () => {

  // Assets
  const dispatch = useAppDispatch();
  const router = useRouter();

  // login user
  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation();

  // Form hook
  const { handleSubmit, formState: { errors: formErrors}, setFocus, control } = useForm({ resolve: yupResolver(logInSchema), defaultValues: {email: '', password: ''} })

  // 
  useEffect(() => {
    setFocus('email');
  })

  // 
  const onSubmit = ({email, passwrod}) => {
    if (email && passwrod) {
      login({body: {email, password}})
    }
  }

  // 
  const onSuccess = () => {
    dispatch(userLogin(data.data.token));
    router.back();
  }


  return (
    <>
      <Stack.Screen options = {{ title: '登录', headerBackTitleVisible: true }}></Stack.Screen>
      <HandleResponse isSuccess={isSuccess} isError={isError} error={error?.data?.message || '发生异常'} message={data?.message} onSuccess={onSuccess} />
      <View style={tw`w-full h-full bg-white pt-10 px-8 py-6`}>
        <Logo style={tw`w-40 h-16 mx-auto`}></Logo>
        <Text style={tw`mt-5`}>登录</Text>
        <TextField errors={formErrors.email} control={control} placeholder='请输入您的账户邮箱' name='email' keyboardType="email-address" autoCapitalize="none"></TextField>
        <TextField errors={formErrors.password} control={control} placeholder='请输入您的账户密码' name='password' secureTextEntry style='mb-2'></TextField>
        <Button loading={isLoading} onPress={handleSubmit(onSubmit)} >登录</Button>
        <View style={tw`flex flex-row mt-2`}>
          <Text style={tw`inline mr-2 text-gray-800 text-xs`}>我还没有账户</Text>
          <Link replace href="/register" style={tw`text-blue-400 text-xs`}>去注册</Link>
        </View>
      </View>
    </>
  )
}

export default login

const styles = StyleSheet.create({})