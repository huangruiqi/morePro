import React from 'react';
import { connect } from 'dva';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';

import { Upload, Button, Icon, message, Form } from 'antd';

// const number = '2014211001';
let taskId = '';
let classId = '';
let endTime = '';

class ClassList extends React.Component {
  constructor() {
    super();
    this.state = {
      fileList: [],
      uploading: false,
      comment: '',
      grade: '',
      taskItem: {}
    };    
  }

  componentDidMount() {
    this.getTaskId();
    this.getFileList();
    this.getTaskInfo();
  }

  // 获取作业文件列表
  getFileList = () => {
    const { user: { number } } = this.props;
    fetch("/api/uploadWork/getWorkList",{
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({taskId, number, identity: 'student'})
    })
    .then((data)=>data.json())
    .then((data)=>{
      this.setState({
        fileList: data.workUrl || [],
        comment: data.comment || '',
        grade: data.grade || ''
      })
    });
  }

  // 获取任务ID
  getTaskId = () => {
    const query = this.props.location.search;
    if (query.length > 0) {
      taskId = query.split('?')[1].split('=')[1];
    }
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


  render() {
    const { user: { number } } = this.props;
    const { taskItem } = this.state;
    endTime = taskItem.endTime;
    classId = taskItem.classId;
    let { fileList, comment, grade } = this.state;
    // fileList = [];
    console.log(fileList);
    const fileLength = fileList.length;
    const props = {
      name: 'file',
      action: '/api/uploadWork',
      headers: { 
        authorization: 'authorization-text',
      },
      data: {taskId: taskId, number: number, classId: classId, endTime: endTime},
      listType: 'text',
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
          body: JSON.stringify({taskId: taskId, uid: info.uid})
        })
        .then((data)=>data.json())
        .then((data)=>{
          
        });
      },
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
                <Button style={{marginTop: 20}}>
                  <Icon type="upload" /> 上传作业
                </Button>
              </Upload>
              :
              <Upload key={2} {...props}> 
                <div>
                  <div>即将提交的文件</div>
                  <p className={styles.instruction}>（提交文档、图片，老师可在线批改,压缩包仅能下载）</p>
                </div>
                <Button style={{marginTop: 20}}>
                  <Icon type="upload" /> 上传作业
                </Button>
              </Upload>
            }
          </div>
          <div className={styles.comment}>
            <div>分数：{grade}</div>
            <div>教师评语：{comment ? comment : '无'}</div>
          </div>
        </div>
      </div>
    );
  }

}



// export default connect()(ClassList);
const ClassListCom = Form.create()(ClassList)
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(ClassListCom)