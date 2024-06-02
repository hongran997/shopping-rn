import SigninPromoRenderer from '../renderer/SigninPromoRenderer'
import React from 'react'
import { useUserInfo } from '@/hooks';

const AuthWrapper = ({ children }) => {
  const { userInfo, isVerify, isLoading } = useUserInfo();
  return (
    <>
      {
        isLoading ? null : (!isVerify || !userInfo ? <SigninPromoRenderer /> : <>{children}</>)
      }
    </>
  )
}

export default AuthWrapper