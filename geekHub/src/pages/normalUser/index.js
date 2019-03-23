import React, { Component } from 'react';
import './index.css';
import {Input,DatePicker,LocaleProvider,Select,Button,Row, Col,Form,Table,Modal } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {connect} from 'react-redux';
import * as action from '../../actions/normalUserAction';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

class UserManage extends Component {

  addTable() {
    const columns = [{
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    }, {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="/">{text}</a>,
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '注册时间',
      key: 'loginTime',
      dataIndex: 'loginTime',
    }, {
      title: '博文总数',
      key: 'articlesNum',
      dataIndex: 'articlesNum',
    }, {
      title: '资源总数',
      key: 'resourceNum',
      dataIndex: 'resourceNum',
    }, {
      title: '是否内部人员',
      key: 'internalPerson',
      dataIndex: 'internalPerson',
    },{
      title: '操作',
      key: 'operation',
      render: (text,record)=>{
        return (
          <div>
            <a href="javascript:;">个人中心</a>
            &emsp;&emsp;
              <a href="javascript:;" onClick={this.props.handleShowModal}>冻结用户</a>
          </div>
        )
      }
    }];
    const pagination = {
      showQuickJumper :true,
      defaultCurren:1 ,
      total:500 ,
      pageSize:10,
      onChange:function(page,pageSize){
        console.log(page,pageSize);
      }
    };
    return (
      <Table 
        columns={columns} 
        pagination={pagination} 
        dataSource={this.props.normalUserList} 
        style={{marginTop:20}}
      />
    )
  }

  render(){
    return(
      <div>
        <h1>用户管理/普通用户</h1>
        <Form className="advanced-search-form">
          <Row>
            <Col span="8">
              <FormItem
                label="搜索名称："
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
              >
                <Input placeholder="请输入关键字搜索用户" />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem 
                label="注册时间" 
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
              >
                <LocaleProvider locale={zh_CN}>
                  <RangePicker style={{ width: '100%' }} />
                </LocaleProvider> 
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem 
                label="权限分类"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
              >
                <Select defaultValue="请选择" >
                  <Option value="0">内部</Option>
                  <Option value="1">外部</Option>
                  <Option value="2">所有</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col 
              span="8" 
              offset="16" 
              style={{ textAlign: 'right' }}
            >
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button>重置</Button>
            </Col>
          </Row>
        </Form>
        <LocaleProvider locale={zh_CN}>
          { this.addTable() }
        </LocaleProvider> 
        <Modal
          title="确认将此用户冻结吗？"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
         >
          <p>冻结此用户后，将会给其发送系统消息：你已被管理员冻结账户</p>
        </Modal>
      </div> 
    )
  }
}


const mapStateToProps = (state) => {
  return {
    normalUserList: state.normalUserReducer.data,
    visible: state.normalUserReducer.visible
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    handleShowModal() {
			dispatch(action.showModal());
    },
    handleCancel() {
      dispatch(action.cancelModal());
    },
    handleOk() {
      dispatch(action.ok());
    }
  }
}
export default connect(mapStateToProps,mapDispathToProps)(UserManage);