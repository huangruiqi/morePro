import React, { Component } from 'react';
import { Table,Modal,Tag } from 'antd';
import axios from 'axios';
import './index.css';

const confirm = Modal.confirm;
var data;
axios.get("http://mock-api.com/4jzA4LKk.mock/insiderPeople")
.then((Response)=>{
  Response.data.data.forEach((element,index) => {
    element["key"]=index;
  });
  data=Response.data.data;
  console.log(data);
})
const pagination = {
  total:50,
  onChange:function(page,pageSize){
    
  }
}
class internalPerson extends Component {
  constructor(props){
    super(props);
    this.state = {data}
  }

  //表格配置
  columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  }, {
    title: '毕业年份',
    dataIndex: 'graduationYear',
    key: 'graduationYear',
  }, {
    title: '现就职单位',
    key: 'graduating',
    dataIndex: 'graduating',
  }, {
    title: '学习方向',
    key: 'learnDirection',
    dataIndex: 'learnDirection',
    render:(text,record)=>{
      return (
        <div>
          {text.map((item)=>
            <Tag color="blue" key={item}>{ item }</Tag>
          )}
        </div>
      )
    }
  },{
    title: '操作',
    key: 'operation',
    render: (text,record)=>{
      return (
        <div>
          <a href="javascript:;">个人中心</a>
          &emsp;&emsp;
            <a href="javascript:;" onClick = {this.handleDelete.bind(this,record.key)}>移除</a>
        </div>
      )
    }
  }]

  //删除回调
  handleDelete = function(key){
    var _this = this;
    confirm({
      title:"确认将此人移除吗？",
      content:"移除此人后，将会给其发送系统消息：你已被管理员取消内部权限",
      onOk(){
        const data = _this.state.data;
        const newData = data.filter((item)=>{
          return item.key!==key
        })
        _this.setState({
          data:newData
        })
      },
      onCancel(){}
    })
  }
  render(){
    return(
      <Table className="insiderTable" columns={this.columns} dataSource={this.state.data} pagination={ pagination }/>
    )
  }
}

export default internalPerson;