import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';


import { Icon, Button, Modal, Input, DatePicker, message, Popconfirm, Form, InputNumber } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

let percentList = [];
let classId = '';
let className = '';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};


class WorkManageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      taskList: [],
      taskItem: null,
      updateTask: false,
      taskId: ""
    };
  }

  componentDidMount() {
    this.getClassId();
    this.getTaskList();
  }

  // 获取任务列表
  getTaskList = () => {
    fetch("/api/workManage/getTaskList",{
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({classId})
    })
    .then((data)=>data.json())
    .then((data)=>{
      this.setState({
        taskList: data
      })
    });
  }
  

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
      updateTask: false,
      taskId: "",
      taskItem: null
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.startTime = moment(new Date).format(dateFormat);
        values.endTime = moment(values.endTime).format(dateFormat);
        if (this.state.updateTask) {  // 更新任务
          values.type = "update";
          values.id = this.state.taskId;
        } else { // 新增任务
           values.type = "add";
           values.classId = classId;
        }
        fetch("/api/workManage",{
          method : "POST",
          headers : {
            "Content-Type": "application/json"
          },
          body:JSON.stringify(values)
        })
        .then((data)=>data.json())
        .then((data)=>{
          if (data.result === 1) {
            message.success('新建或修改任务成功');
            // 新建任务成功后重新获取任务列表
            fetch("/api/workManage/getTaskList",{
              method : "POST",
              headers : {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ classId })
            })
            .then((data)=>data.json())
            .then((data)=>{
              this.setState({
                taskList: data,
                taskItem: null
              })
            });
          } else{
            message.error('新建或修改任务失败');
          }
        });
        this.setState({
          visible: false,
          updateTask: false,
          taskId: ""
        });
      // 清空表单信息
      this.props.form.resetFields();
      }
    });
  }


  updateTask = (key) => {
    this.setState({
      visible: true,
      updateTask: true,
      taskId: key
    });
    fetch("/api/workManage",{
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({type: "query", id: key})
    })
    .then((data)=>data.json())
    .then((data)=>{
      this.setState({
        taskItem: data.length > 0 ? data[0] : {}
      });
    });
  }

  deleteTask = (key) => {
    console.log('delete');
    fetch("/api/workManage",{
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({type: "delete", id: key})
    })
    .then((data)=>data.json())
    .then((data)=>{
      if (data.result === 1) {
        message.success('删除任务成功');
        // 新建任务成功后重新获取任务列表
        fetch("/api/workManage/getTaskList",{
          method : "POST",
          headers : {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ classId })
        })
        .then((data)=>data.json())
        .then((data)=>{
          this.setState({
            taskList: data
          })
        });
      } else{
        message.error('删除任务失败');
      }
    });
  }

  changePercent = (i, value) => {
    percentList[i] = value;
  }

  savePercent = () => {
    const sum = percentList.reduce((pre, next) => {
      return pre + next;
    });
    console.log(percentList);
    if (sum === 100) {
      fetch("/api/workManage/changePercent",{
        method : "POST",
        headers : {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({percentList, classId})
      })
      .then((data)=>data.json())
      .then((data)=>{
        if (data.result === 1) {
          message.success('修改占比成功');
        } else {
          message.error('修改占比失败');
        }
        
      });
    } else {
      message.error('修改失败，请保证任务占比总和为100%');
    }
  }

  // 获取教学班ID和教学班名称
  getClassId = () => {
    if (this.props.classId) {
      classId = this.props.classId;
    } else {
      const query = this.props.location.search;
      let newStr = '', newArr = [];
      /*if (query.length > 0) {
        classId = query.split('?')[1].split('=')[1];
      }*/
      if (query.length > 0) {
        newStr = query.slice(1);
        newArr = newStr.split('&');
        classId = newArr[0].split('=')[1];
        className = newArr[1].split('=')[1];
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { taskList, taskItem } = this.state;
    const taskLength = taskList.length;
    const taskView = taskLength && taskList.map((item, i) => {
      return (
        <div key={item._id}>
          <div className={styles.taskWrap}>
            <div className={styles.left}>
              <div className={styles.taskTitle}>
                {/*<a href="/#/classlist" target="_blank">{item.title}</a>*/}
                <Link to={`/classlist?classId=${classId}&taskId=${item._id}&title=${item.title}&taskIndex=${i}`}>{item.title}</Link>
              </div>
              <div className={styles.desc}>{item.description}</div>
              <div className={styles.time}>
                <span>发布时间：{item.startTime}</span>
                <span className={styles.endTime}>截止日期：{item.endTime}</span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.list}>
                <p>{item.submitStatus.type1}</p>
                <div style={{color: 'green'}}>已批</div>
              </div>
              <div className={styles.list}>
                <p>{item.submitStatus.type2}</p>
                <div>未批</div>
              </div>
              <div className={styles.list}>
                <p>{item.submitStatus.type3}</p>
                <div style={{color: 'red'}}>未交</div>
              </div>
            </div>
          </div>
          <div className={styles.handle}>
            <Button onClick={this.updateTask.bind(this, item._id)} type="primary">修改任务</Button>
            <Popconfirm title="确定要删除该项任务吗?" onConfirm={this.deleteTask.bind(this, item._id)} okText="确定" cancelText="取消">
              <Button type="primary" style={{marginTop: 20}}>删除任务</Button>
            </Popconfirm>
          </div>
        </div>
      );
    });
    percentList = [];
    const percentView = taskLength && taskList.map((item, i) => {
      console.log(item);
      percentList.push(item.percent);
      return (
        <div key={item._id} className={styles.percentItem}>
          <span>任务{i+1}:</span>
          <InputNumber 
            defaultValue={item.percent}
            onChange={this.changePercent.bind(this, i)} 
            className={styles.percentInput} min={0} max={100} 
            formatter={value => `${value}%`} 
            parser={value => value.replace('%', '')} 
          />
        </div>
      );
    });
    return (
      <div className={styles.workManage}>
        <div className={styles.title}>{className}</div>
        {taskLength > 0 &&
          <div className={styles.percent}>
            设置任务占比：
            { percentView }
            <Button onClick={this.savePercent.bind(this)} type="primary">保存占比</Button>
          </div>
        }
        <div className={styles.published}>已发布任务：</div>
        { taskLength > 0 ?
          taskView
          : <div>还没有任务哦，点击下方按钮添加任务</div> }
        <Button size="large" type="dashed" onClick={this.showModal.bind(this)} style={{ width: 400, margin: '20px 200px' }}>
          <Icon type="plus" /> 添加任务
        </Button>
        <Modal
          title="发布作业"
          visible={this.state.visible}
          onOk={this.handleSubmit.bind(this)}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          className={styles.modal}
        >
          <Form >
            <FormItem
              {...formItemLayout}
              label="作业标题"
            >
              {getFieldDecorator('title', {
                initialValue: taskItem ? taskItem.title : "",
                rules: [{
                  required: true, message: '作业标题不能为空',
                }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="作业描述"
            >
              {getFieldDecorator('description', {
                initialValue: taskItem ? taskItem.description : "",
                rules: [{
                  required: true, message: '作业描述不能为空',
                }],
              })(
                <TextArea rows={3} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="截止日期"
            >
              {getFieldDecorator('endTime', {
                initialValue: taskItem ? moment(taskItem.endTime, dateFormat) : "" ,
                rules: [{
                  required: true, message: '截止日期不能为空',
                }],
              })(
                <DatePicker
                  showTime
                  format={dateFormat}
                  placeholder="Select Time"
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }

}

const WorkManage = Form.create()(WorkManageForm);
export default connect()(WorkManage);