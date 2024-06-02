import * as Yup from 'yup';

export const logInSchema = Yup.object().shape({
  email: Yup.string().required('账户邮箱必填').email('请输入正确的邮箱'),
  password: Yup.string().required('请输入登录密码').min(6, '密码长度最小6位'),
})

export const registerSchema = Yup.object().shape({
  name:Yup.string().required('请输入账户名称').min(3, '账户名称至少3位'),
  email: Yup.string().required('账户邮箱必填').email('请输入正确的邮箱'),
  password: Yup.string().required('请输入登录密码').min(6, '密码长度最小6位'),
  confirmPassword: Yup.string().required('请再次输入确认密码').oneOf([Yup.ref('password'), null], '确认密码有误')
})

export const reviewSchema = Yup.object().shape({
  title: Yup.string().required('评论标题不能为空').min(4, '评价标题不得少于4个字符'),
  comment: Yup.string().required('评论蚊子不能为空').min(4, '评论文字不得少于4个字符'),
})

export const addressScheme = Yup.object().shape({
  
})