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

### Seven day
1. 前端工程化配置
2. 初始化store, store持久化用persist, 优化store的写法用toolkit
3. 初始化service, 用toolkit的新写法调用接口
4. 调整项目目录, 新建main 文件夹，把tabs 移动到main 文件夹中去
> 需要了解persist的常用api, 组件，toolkit的常用api, 组件

### Eight Day ------ rn的常用组件
1. 开发Feed页面,查看相关组件的作用，用法
> 需要了解rn的常用组件

### Nine day -----  twrnc
1. 添加TailWindCSS
2. 添加Twrnc

### Ten day ----  
1. 开发Category 页面

### Eleven day
1. 开发Cart 页面

### Twelve day
1. 开发login页面
2. 开发register页面 
name: 墨镜123  
email: zhaohongran1997@163.com
password：123456

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

### React 与 Vue 的不同
1. React 会通过props 把children 传递给另一个组件
2. React 函数的概念很强【不好设置参数来查看效果】 Vue组件的概念很强【很方便查看一个组件的效果】
3. JSX 的语法逻辑使得代码不好读，也不好写，看着也不整齐，尤其是遇到多个if, else的时候，用很多的？： 简直要崩溃
4. 好烦啊，需要跳着组件看。
5. 偶尔看下下面的warning 也是有用的啊。
6. 还是从小组件开始开发，从内部组件开始开发
7. 函数的方式难组织，但灵活性更强了



通过注释代码，替换更为简单的结构来排查问题。
如果是image不显示，99% 是高度的问题,设置height:100%是没用，因为这种情况一般父组件也是0 
map(item => {(jsx)})  item 后面的{} 不要加，加了jsx 就显示不出来了，直接用() 就可以了。
jsx 里面也可以写 if 哈，写了这个之后，jsx 要加大括号和return
aspect-square  设置了宽高1:1， 当设置了宽度的时候，就相当于设置了高度了