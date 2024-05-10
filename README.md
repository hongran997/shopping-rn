### One day
1. 下载后面所需的assets资源 
2. 分析页面结构
   - 首页带四个tab: Feed Category Cart Profile   /(tabs)
   - Feed子页面：搜索框，消息提醒  /(tabs)/feed
   - Category子页面： 子子页面  /(tabs)/category
   - Cart子页面：购物车、订单  /(tabs)/cart
   - Profile 子页面：  /(tabs)/profile
       - 我的订单 /my/orders
       - 我的收藏 /my/favorite
       - 我的评价 /my/comments
       - 地址管理 /my/address
       - 最近访问 /my/visited
       - 账户信息 /my/account
       - 退出  /logout

   - 常见页面：
     - loading page  /loading
     - error page  /error
     - notification not login page   
     - login page  /login
     - logout page  /logout
3. 创建所需要的constants(in utils)

### Two day
1. 安装与导航相关的package: npm install --save react-native-navigation  ×

### Three day
1. 卸载 react-native-navigation， 安装expo-router
2. 了解expo-router 的用法
3. 绘制首页

### Four day
1. app/_layout.jsx
2. app/(tabs)/_layout.jsx  设计实现
3. 引入expo图标库
4. 引入supabase, 暂时不用

### Five day
1. 引入 react-redux redux-persist redux-toolkit
2. 引入 store，完善app/_layout.js文件

### Six day
1. upgrade expo and releated dependencies.  From upgrage Expo Go in My Iphone  --fix 很迅速,在bash 下执行
2. 好像一旦进入过tabs 页面，就不会刚进页面就会Not Found Page.

### Seven day
1. 前端工程化配置


### 参考项目
1. https://github.com/hongran997/c-shopping-rn 参考项目
2. https://c-shopping-three.vercel.app  Web端项目和服务


### 参考技术官方文档
1. https://reactnative.cn/docs/textinput  React库
2. https://reactnative.cn/docs/getting-started React-native库
3. https://reactnavigation.org/  React-native 官方推荐的导航库1
4. https://reactnavigation.org/docs/getting-started/ React-native 官方推荐的导航库
5. https://wix.github.io/react-native-navigation/docs/before-you-start  官方推荐的导航库2
6. https://github.com/jquense/yup?tab=readme-ov-file  表单数据校验
7. https://docs.expo.dev/router/installation/#quick-start  expo-router文档
8. https://icons.expo.fyi/Index 图标查询库
9. https://supabase.com/dashboard/projects  UI端Supabase
10. https://supabase.com/docs/guides/getting-started/quickstarts/reactjs  为前端开发者提供的后端服务库
11. https://redux-toolkit.js.org/introduction/getting-started  在写法上，更方便的使用react-redux
12. https://github.com/rt2zz/redux-persist  在功能上，弥补react-redux刷新后缓存数据丢失的问题


### 参考博客
1. https://blog.csdn.net/weixin_30230009/article/details/136084273