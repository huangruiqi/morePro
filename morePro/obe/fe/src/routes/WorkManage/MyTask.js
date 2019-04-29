import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';

import { Button, message } from 'antd';

let classId = '';

class MyTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
    };
  }

  componentWillMount() {
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

  // 获取教学班ID
  getClassId = () => {
    const query = this.props.location.search;
    if (query.length > 0) {
      classId = query.split('?')[1].split('=')[1];
    }
  }

  /*enterUpload  = () => {
    window.open('/#/uploadwork');
  }*/

  render() {
    const listData = this.state.taskList;
    const taskLength = listData.length;
    const taskView = taskLength && listData.map((item) => {
      return (
        <div key={item._id}>
          <div className={styles.taskWrap}>
            <div className={styles.left}>
              <div className={styles.taskTitle}>
                <Link to={`/uploadWork?id=${item._id}`}>{item.title}</Link>
                <span>(任务占比： {item.percent}%)</span>
              </div>
              <div className={styles.desc}>{item.description}</div>
              <div className={styles.time}>
                <span>发布时间：{item.startTime}</span>
                <span className={styles.endTime}>截止日期：{item.endTime}</span>
              </div>
            </div>
            <div className={styles.right}>
              <Button type="primary" size="large" style={{marginTop: 20, marginLeft: 120}}>
                <Link to={`/uploadWork?id=${item._id}`}>上传作业</Link>
              </Button>
            </div>
          </div>
        </div>
    );
    });
    return (
      <div className={styles.workManage}>
        <div className={styles.title}>计算机网络课程（电子商务+信息管理专业）教学班作业发布</div>
        <div className={styles.published}>已发布任务：</div>
        { taskLength > 0 ?
          taskView
          : <div>还没有任务哦，等待老师添加任务</div> }
        <div style={{clear: 'both'}}></div>
      </div>
    );
  }

}

export default connect()(MyTask);
