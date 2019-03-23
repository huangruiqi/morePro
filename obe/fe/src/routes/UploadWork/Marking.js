import React from 'react';
import { connect } from 'dva';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';

import { Upload, Button, Input, InputNumber, Icon, message, Form } from 'antd';

const FormItem = Form.Item;

let studyId = '';
let taskId = '';
let classId = '';
let taskIndex;
let taskPercent;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class ClassListForm extends React.Component {
	constructor() {
		super();
		this.state = {
      fileList: [],
      uploading: false,
      taskItem: {}
		};    
	}

  componentDidMount() {
    this.getTaskId();
    this.getFileList();
    this.getTaskInfo();
  }

  // 获取学号、任务ID和任务索引值
  getTaskId = () => {
    const query = this.props.location.search;
    let newStr = '', newArr = [];
    if (query.length > 0) {
      newStr = query.slice(1);
      newArr = newStr.split('&');
      studyId = newArr[0].split('=')[1];
      taskId = newArr[1].split('=')[1];
      taskIndex = newArr[2].split('=')[1];
      classId = newArr[3].split('=')[1];
    }
  }

  // 获取作业文件列表
  getFileList = () => {
    fetch("/api/uploadWork/getWorkList",{
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({taskId, number: studyId, identity: 'teacher'})
    })
    .then((data)=>data.json())
    .then((data)=>{
      this.setState({
        fileList: data.workUrl
      })
    });
  }

  // 获取任务相关信息
  getTaskInfo = () => {
    fetch("/api/workManage/getOneTask", {
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({taskId})
    })
    .then((data)=>data.json())
    .then((data)=>{
      this.setState({
        taskItem: data
      })
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let param = {
          taskId: taskId, 
          taskIndex: taskIndex,
          classId: classId,
          taskPercent: taskPercent,
          number: studyId,
          comment: values.comment,
          grade: values.grade
        }
        // 打分
        fetch("/api/uploadWork/marking",{
          method : "POST",
          headers : {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(param)
        })
        .then((data)=>data.json())
        .then((data)=>{
          if (data.result === 1) {
            message.success('打分成功！');
          } else {
            message.error('打分失败!')
          }
        });
      }
    });
  }


	render() {
    const { fileList, taskItem} = this.state;
    taskPercent = taskItem.percent || 0;
    const { getFieldDecorator } = this.props.form;
    const fileLength = fileList.length;
    const props = {
      name: 'file',
      action: '/api/uploadWork',
      headers: { 
        authorization: 'authorization-text',
      },
      data: {taskId: taskId},
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
      onRemove(info) {
        console.log('删除'),
        console.log(info),
        fetch("/api/uploadWork/deleteWork",{
          method : "POST",
          headers : {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({number: number, uid: info.uid})
        })
        .then((data)=>data.json())
        .then((data)=>{
          
        });
      },
      listType: 'text',
      defaultFileList: fileList
    };

		return (
      <div className={styles.upload}>
        <div className={styles.title}>{taskItem.title}</div>
        <div className={styles.endTime}><span>截止：{taskItem.endTime}</span></div>
        <div>
          <div className={styles.fileList}>
            { fileLength > 0 ?
              <Upload key={1} {...props}> 
              </Upload>
              :
              <Upload key={2} {...props}> 
                <div>
                  <div>该同学还没提交作业哦</div>
                  <p className={styles.instruction}>（提交文档、图片，老师可在线批改,压缩包仅能下载）</p>
                </div>
              </Upload>
            }
          </div>
          <div className={styles.comment}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem
                {...formItemLayout}
                label="教师评语"
              > 
                {getFieldDecorator('comment', {
                  initialValue: "",
                })(
                  <Input placeholder="请输入教师评语（可以为空）" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="打分"
              >
                {getFieldDecorator('grade', {
                  initialValue: 90,
                  rules: [{
                    required: true, message: '分数不能为空',
                  }],
                })(
                  <InputNumber min={0} max={100} />
                )}
              </FormItem>
              <FormItem style={{textAlign: 'right'}} {...formItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
		);
	}

}


const ClassList = Form.create()(ClassListForm);
export default connect()(ClassList);