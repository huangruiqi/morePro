import React, { Component } from 'react';
import './index.css';
import {Input,DatePicker,LocaleProvider,Select,Button,Row, Col,Form,Table,Tag } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {connect} from 'react-redux';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;


class ArticleManage extends Component {
  //表格渲染
  addTable() {
    const columns = [
      {
        title: '作者',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="/">{text}</a>,
      }, {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: '类别',
        dataIndex: 'category',
        key: 'category',
      }, {
        title: '标签',
        key: 'categoryTag',
        dataIndex: 'categoryTag',
        render:(text,record)=>{
          return (
            <div>
              {text.map((item,index)=>
                <Tag color="blue" key={index}>{ item }</Tag>
              )}
            </div>
          )
        }
      }, {
        title: '权限',
        key: 'permission',
        dataIndex: 'permission',
      }, {
        title: '评论数',
        key: 'commentNum',
        dataIndex: 'commentNum',
      }, {
        title: '浏览数',
        key: 'browseNmu',
        dataIndex: 'browseNmu',
      }, {
        title: '点赞数',
        key: 'likeNum',
        dataIndex: 'likeNum',
      }, {
        title: '发布时间',
        key: 'releaseTime',
        dataIndex: 'releaseTime',
      },{
        title: '操作',
        key: 'operation',
        render: (text,record)=>{
          return (
            <div>
              <a href="/">文章详情</a>
            </div>
          )
        }
      }]
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
        dataSource={this.props.articleList} 
        pagination={ pagination } 
        style={{marginTop:20}}
      />
    )
  }
  //表格配置
  
  render(){
    return(
      <div>
        <h1>文章管理</h1>
        <Form className="advanced-search-form">
          <Row>
            <Col span="12">
              <FormItem
                label="搜索名称："
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}>
                <Input placeholder="请输入搜索名称" />
              </FormItem>
              <FormItem label="注册时间" 
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}>
                <LocaleProvider locale={zh_CN}>
                  <RangePicker style={{ width: '100%' }} />
                </LocaleProvider> 
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem 
                label="标签分类"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}>
                <Select defaultValue="请选择" >
                  <Option value="0">前端</Option>
                  <Option value="1">后台</Option>
                  <Option value="2">安卓</Option>
                </Select>
              </FormItem>
              <FormItem 
                label="权限分类"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}>
                <Select defaultValue="请选择" >
                  <Option value="0">内部</Option>
                  <Option value="1">外部</Option>
                  <Option value="2">所有</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="16" style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button>重置</Button>
            </Col>
          </Row>
        </Form>
        <LocaleProvider locale={zh_CN}>
          {this.addTable()}
        </LocaleProvider>  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articleList: state.articleManageReducer.data
  }
}

export default connect(mapStateToProps,null)(ArticleManage);