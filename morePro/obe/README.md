#obe

## TASK
- 前后端项目初始化。

## Server
- node app.js
- 网址为：localhost:3000
- 项目目录
  - 服务端的代码可以写在根目录的routes中
  - routes在app.js设置统一入口，以页面为单位进行分发


## Fe
- npm start
- 网址为：localhost:8000
- 项目结构改造
  - service层：这个应用单独划分一层
  - 单个页面：
    - index.js：入口文件
    - container：主文件
    - model：数据层
    - components：组件
    - styles.less：样式表

## 技术栈
- 前端：React，Antd，Dva，Webpack
- 后台：Node，Express，MongoDB

## Eslint
我暂时把eslint关闭了，后面框架成熟时我会制定一套规则，到时候大家统一一下。

## 系统主要功能
该系统要完成的主要功能有在线案例学习、资源共享、教师答疑、项目讨论等功能。

登录注册前端后台数据库已完成，注册完成后用学号登录，推荐一个数据库可视化工具：adminMongo(https://github.com/mrvautin/adminMongo)


## 代码合并注意事项

### 2018.05.15
- 使用流程
  - 注册登录：学生找到注册界面（/regist）登录，注册成功后到登录界面登录。
  - 教师登录：教师的账号是在【后台管理-用户管理】里面导入。
  - 教师使用：创建课程 - 创建班级 - 个人中心 - 班级详情 - 成果评价。
- 使用127.0.0.1代替localhost访问，否则后端拿不到session，会导致登录失败。