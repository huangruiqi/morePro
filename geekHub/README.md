# src目录结构
- actions		//定义action
	- index.js		//入口文件（仅一个文件就好，所有action都可以写到这个文件，注意避免冲突）
- components	//公共组件
- config		//配置数据（可抽离数据，例如menu）
- pages			//页面，每个子文件夹就是一个路由，样式也是单独分开的
- reducers		//定义reducers，单个reducers分开，index.js为入口
	- index.js
- resources		//公共资源，如图片等
- router		//路由
- utils			//全局方法。单个方法一个js


# 更改
## 用户管理
现分为
- 用户管理-普通用户（就是原用户管理的内容）；
- 用户管理-内部人员（提供内部人员的信息）；