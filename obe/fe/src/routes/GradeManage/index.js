import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';


import { Table, Button, message } from 'antd';

let classId = '';
let className = '';
let isFirst = true;
let taskLen = 0;

const columns = [{
    title: '学号',
    dataIndex: 'number',
  }, {
    title: '姓名',
    dataIndex: 'name'
  }, {
    title: '完成总进度',
    dataIndex: 'progress'
  }, {
    title: '总成绩',
    dataIndex: 'totalScore'
  }];

class GradeManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tableHead: [],
        tableData: []
    };
  }

  componentDidMount() {
    this.getClassId();
    this.getTaskList();
    this.getGradeList();
  }

  // 获取教学班ID和教学班名称
  getClassId = () => {
    const query = this.props.location.search;
    let newStr = '', newArr = [];
    if (query.length > 0) {
      newStr = query.slice(1);
      newArr = newStr.split('&');
      classId = newArr[0].split('=')[1];
      className = newArr[1].split('=')[1];
    }
  }

  // 获取班级下同学的成绩表
  getGradeList = () => {
    fetch("/api/gradeManage/getGradeList",{
      method : "POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({classId})
    })
    .then((data)=>data.json())
    .then((data)=>{
      this.handleTableData(data)
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
      taskLen = data.length;
      this.handleColumns(data);
    });
  }

  // 处理表头部信息
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
        console.log(columns)
        isFirst = false;
      });
    }
    this.setState({
      tableHead: columns
    });
  }

  // 复制学生信息表
  getStudents = () => {
    fetch('/api/gradeManage/getStudents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({classId})
    }).then(data => data.json()).then(data => {
      console.log(data);
    });
  }

  // 导出成绩表
  exportGrade = () => {
    fetch('/api/gradeManage/exportGrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: this.state.tableData, taskLen})
    }).then(data => data.json()).then(data => {
      if (data.result === 1) {
        message.success('导出成绩表成功');
      }
    });
  }

  render() {
    const { tableHead, tableData } = this.state;
    return (
      <div className={styles.gradeManage}>
        <div className={styles.title}>计算机网络成绩表</div>
        <div style={{marginBottom: 20}}><Button type="primary" onClick={this.exportGrade.bind(this)}>导出成绩表</Button></div>
        <Table columns={tableHead} dataSource={tableData} />
      </div>
    );
  }

}

export default connect()(GradeManage);