import * as Yup from 'yup';

export const logInSchema = Yup.object().shape({
  email: Yup.string().required('账户邮箱必填').email('请输入正确的邮箱'),
  password: Yup.string().required('请输入登录密码').min(6, '密码长度最小6位'),
})

export const registerSchema = Yup.object().shape({

})

export const reviewSchema = Yup.object().shape({
  title: Yup.string().required('评论标题不能为空').min(4, '评价标题不得少于4个字符'),
  comment: Yup.string().required('评论蚊子不能为空').min(4, '评论文字不得少于4个字符'),
})

// export const addressScheme =