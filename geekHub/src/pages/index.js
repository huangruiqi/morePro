import React, { Component } from 'react';
import MenuSider from '../components/Menu';
import { Layout, Badge } from 'antd';
import RouterMap from '../router';
import Login from '../pages/Login';
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { showMenu, hideMenu } from '../actions'
const {  Header,Content,Sider } = Layout;

class Index extends Component {
  state = {
    collapsed: false,
    routerName: '数据概况',
    showMenu:true
  };
  bindRouterName = (routerName) => {
    this.setState({ routerName });
  }
  onBindSubmit = ()=>{
    this.setState({showMenu:false})
  }
  returnLogin = ()=>{
    this.setState({showMenu:true})
  }
//  这一块是判断是否处于登陆页面（即是否渲染导航）
  renderMenu() {
    if (this.state.showMenu) {
      return (
        <Layout style={{ minHeight: '100vh' }}>
         <Sider className="sider_left">
            <div className="logo">
                GeekHub后台管理
            </div>
            <div className="userInfoWrapper">
              <span><Badge status="success"/>管理员</span>
              <span className="logout" onClick={this.returnLogin}><Badge status='error' />注销</span>
            </div>
            <MenuSider getRouterName = { this.bindRouterName.bind(this)}/>
          </Sider>
          <Layout className="div_right">
            <Header className="showRouterName"> 当前位置：{this.state.routerName} </Header>
            <Content className="main_content" >
              {/* 引入路由 */}
              <RouterMap />
            </Content>
          </Layout>
        </Layout>
      )
    } else {
      return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content className="main_content">
              <Login bindSubmit = {this.onBindSubmit.bind(this)} />
            </Content>
        </Layout>
      )
    }
  }
  render() {
    return (
      <Router>
          {this.renderMenu()}
      </Router>
    )
  }
}
const mapStateToPorps = (state) => {
  
  return {
    menuChange: state.menuChange
  }
}
const mapDispatchToProps = (dispatch) => {
  // return {
  //   showMenu: () => { dispatch(showMenu()) },
  //   hideMenu: () => { dispatch(hideMenu()) }
  // }
}
export default Index;
