import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Layout, Menu, Icon, Switch, Badge, message } from 'antd'

import styles from './index.css'

const { Sider } = Layout
const SM = Menu.SubMenu
const MI = Menu.Item

class App extends React.Component {
    state = {
        currentKey: '/user/op',
    }

    componentWillMount() {
        const { dispatch, isLogin, routing: { location: { pathname } } } = this.props
        if (!isLogin && pathname != '/regist') {
            dispatch(routerRedux.push('/login'))
            return
        }
        if (isLogin && pathname == '/login') {
            dispatch(routerRedux.push('/user/op'))
            return
        }
    }

    componentWillReceiveProps(props) {
        const { locationPathname } = props
        const { currentKey } = this.state
        if (locationPathname != currentKey) {
            this.setState({ currentKey: locationPathname })
        }
    }

    // 侧边栏渲染
    renderSideBar() {
        const { isLogin } = this.props
        if (!isLogin) { return null }
        return (
            <Sider
                className={ styles.sidbarWrap }
                width={ 200 }
            >
                { this.renderSysTitle() }
                { this.renderUserInfo() }
                { this.renderMenu() }
            </Sider>
        )
    }

    // 主内容渲染
    renderContent() {
        const { children } = this.props
        return (
            <Layout className={ styles.contentWrap }>
                { children }
            </Layout>
        )
    }

    showContent(){
        return this.props.children
    }

    // 平台名称渲染
    renderSysTitle() {
        return (
            <h2 className={ styles.sysTitle }>OBE课程支撑平台</h2>
        )
    }

    // 菜单渲染
    renderMenu() {
        const { currentKey } = this.state
        const { user: { type } } = this.props
        // const show = type == 'teacher' ? true : false
        const show = true
        const confs = [{
            name: '用户',
            route: '',
            show: true,
            iconType: 'user',
            children: [{
                name: '个人中心',
                show: true,
                route: '/user/op',
            }, {
                name: '用户管理',
                show,
                route: '/user/import',
            }]
        }, {
            name: '课程管理',
            route: '/lesson/op',
            show,
            iconType: 'book',
            children: []
        }]

        // 注册 && 登录
        // 个人中心：已选课程，教授课程
        // 课程中心：课程列表，课程详情，班级详情
        // 后台管理：用户管理（教师导入，学生管理），课程管理（创建，删除，编辑，查看 - 课程详情），班级管理（创建 - 班级名称|班级代号|学生名单，下线，发布公告）
        const conf = [{
            name: '后台管理',
            route: '',
            show,
            iconType: 'bulb',
            children: [{
                name: '用户管理',
                show,
                route: '/user/import',
            }, {
                name: '课程管理',
                show,
                route: '/lesson/op',
            }, {
                name: '班级管理',
                show,
                // 暂无，需要添加
                route: '/class/op',
            }]
        }, {
            name: '用户中心',
            route: '/user/op',
            show: true,
            iconType: 'user',
            children: []
        }, {
            name: '课程中心',
            route: '/lesson/select',
            show: true,
            iconType: 'book',
            children: []
        }, {
            name: '成果评价',
            route: '/lessonList',
            show,
            iconType: 'calendar',
            children: [{
                name: '任务管理',
                show,
                route: '/lessonList',
            }, {
                name: '我的任务',
                show,
                route: '/myLesson',
            }]
        }, {
            name: '在线学习',
            route: '/onlineStudy/lists',
            show: true,
            iconType: 'book',
            children: []
        }, {
            name: '在线帮助',
            route: '/onlineHelp/lists',
            show: true,
            iconType: 'book',
            children: []
        }]

        const menuCom = conf.map((item, i) => {
            const { name, route, show, iconType, children } = item
            if (!show) { return '' }
            if (children.length > 0) {
                let childrenCom = ''
                childrenCom = children.map((item, i) => {
                    return show ? (<MI key={ item.route }>{ item.name }</MI>) : ''
                })
                return (
                    <SM key={ item.route } title={ (<span><Icon type={ iconType }/>{ name }</span>) }>{ childrenCom }</SM>
                )
            }
            return (
                <MI key={ item.route }><Icon type={ iconType }/>{ item.name }</MI>
            )
        })

        return (
            <Menu
                theme='dark'
                mode='inline'
                selectedKeys={ [currentKey] }
                onClick={ this.handleMenuChange.bind(this) }
            >
                { menuCom }
            </Menu>
        )

    }

    // 点击菜单项
    handleMenuChange(e) {
        this.setState({
            currentKey: e.key,
        }, () => {
            this.props.dispatch(routerRedux.push(e.key))
        })
    }

    // 用户信息渲染
    renderUserInfo() {
        const { userName } = this.state
        const { isLogin, user: { name } } = this.props
        if (!isLogin) { return null }
        return (
            <div className={ styles.userInfosWrap }>
                <span className={ styles.userName }><Badge status='success' />{ name }</span>
                <span className={ styles.logOutBtn } onClick={ this.handleLoginOut.bind(this) }><Badge status='error' />注销</span>
            </div>
        )
    }

    // 注销账号
    handleLoginOut() {
        const { dispatch } = this.props
        const opts = {
        	method: 'POST',
          // 巨坑，不设置通过接口请求的时候后端是接受不到session的
          credentials: 'include',
        	headers: {
        		'Content-Type': 'application/json'
        	},
        	body: JSON.stringify({})
        }
        dispatch({
          type: 'app/logout',
          payload: {
            opts,
            cb: (tips) => {
              message.success(tips)
              window.location.reload()
            }
          }
        })
    }

    render(){
        return (
            <Layout className={ styles.appContainer }>
                { this.renderSideBar() }
                { this.renderContent() }
            </Layout>
        )
    }
}

export default connect(({ app, routing }) => {
    return { ...app, routing }
})(App)
