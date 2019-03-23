import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';


import { Table, Form } from 'antd';

let classId = '';
let lessonName = '';
let studentId = '';
let studentName = '';
let isFirst = true;

let columns = [{
    title: '学号',
    dataIndex: 'number',
  }, {
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '完成总进度',
    dataIndex: 'progress'
  }, {
    title: '总成绩',
    dataIndex: 'totalScore'
  }];

class MyGrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [],
      tableData: []
    };
  }

  componentWillMount() {
    this.getClassId();
    this.getTaskList();
    this.getGrade();
  }

  // 获取教学班ID和课程名称
  getClassId = () => {
    const query = this.props.location.search;
    let newStr = '', newArr = [];
    if (query.length > 0) {
      newStr = query.slice(1);
      newArr = newStr.split('&');
      classId = newArr[0].split('=')[1];
      lessonName = newArr[1].split('=')[1];
    }
  }

  // 获取任务列表下对应的成绩
  getGrade = () => {
    const { user: { number } } = this.props;
    fetch("/api/gradeManage/getOneGrade",{
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({classId, number})
    })
    .then((data)=>data.json())
    .then((data)=>{
      this.handleTableData(data);
    });
  }

  handleTableData = (data) => {
    data.map((item, i) => {
      for (let j = 1, len = item.gradeArray.length; j <= len; j++) {
        data[i]['task'+j] = item.gradeArray[j-1];
      }
    });
    this.setState({
      tableData: data
    });
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
      this.handleColumns(data);
    });
  }

  handleColumns = (data) => {
    let taskList = data;
    let item = {};
    if (isFirst) {
      taskList.map((item, i) => {
        item = {
          title: `任务${i+1}(占比${item.percent}%)`,
          dataIndex: `task${i+1}`
        }
        columns.push(item);
        isFirst = false;
      });
    }
    this.setState({
      tableHead: columns
    });
  }

  handleTableData = (data) => {
    const len = data.gradeArray.length;
    for (let j = 1; j <= len; j++) {
      data['task'+j] = data.gradeArray[j-1];
    }
    let array = [data];
    this.setState({
      tableData: array
    });

  }

  render() {
    const { user: { name, number } } = this.props;
    studentName = name;
    studentId = number;
    const { tableHead, tableData } = this.state;
    return (
      <div className={styles.gradeManage}>
        <div className={styles.title}>{studentName}同学，你的{lessonName}成绩如下表：</div>
        <Table columns={tableHead} dataSource={tableData} />
      </div>
    );
  }

}

// export default connect()(MyGrade);
const MyGradeCom = Form.create()(MyGrade)
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(MyGradeCom)