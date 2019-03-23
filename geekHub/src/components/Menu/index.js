import React from 'react';
import {Menu,Icon} from 'antd';
import MenuData from '../../config/menu';
import { withRouter } from 'react-router-dom';
import './index.css';

const SubMenu  = Menu.SubMenu;
class Sider extends React.Component {
    state = {
        theme:'dark',
        current:'1'
    }
    renderMenu(){
        const MenuCom = MenuData.map((item,i)=>{
            const { name, route, iconType, children } = item
            if(children.length>0){
                let childrenCom = '';
                childrenCom = children.map((child,i)=>{
                    return (<Menu.Item key={ route+child.route }> <span name={name+" >> "+child.name}>{ child.name }</span></Menu.Item>)
                })
                return (
                    <SubMenu key={route} title={<span><Icon type={ iconType } /> <span>{ name }</span></span>}>
                        {/* <span name={name}>{ childrenCom }</span> */}
                        {childrenCom}
                    </SubMenu>
                )
            }
                return(
                    <Menu.Item key={route}>
                         <Icon type={ iconType } />
                        <span>{ name }</span>
                    </Menu.Item>
                )    
        })
        return (
        <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            defaultSelectedKeys={[this.state.current]}
            inlineCollapsed={ false }
            mode="inline"
            className="MenuContainer"
        >
            { MenuCom }
        </Menu>
        )
    }
    handleClick = (e)=>{
        this.setState({
            current:e.key,
        })
        this.props.history.push(e.key);
        var routerName = e.item.props.children[1].props.name?e.item.props.children[1].props.name:e.item.props.children[1].props.children;
        this.props.getRouterName(routerName);
    }
    render(){
        return(
            <div>
               {this.renderMenu()}
            </div>
        )
    }
} 

export default withRouter(Sider);