import React from 'react';
import { connect } from 'dva';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';
import { Table } from 'antd';

// const GET_CLASS_STUDENT_LIST = '/api/class/student'

let classId = '';
let taskId = '';
let taskTitle = '';
let taskIndex = 0;

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: []
    };    
  }

  
  componentDidMount() {
    this.getTaskId();
    // this.getLessonSeletList();
    this.getOneClass();
  }

  // 获取教学班Id和任务Id
  getTaskId = () => {
    const query = this.props.location.search;
    let newStr = '', newArr = [];
    if (query.length > 0) {
      newStr = query.slice(1);
      newArr = newStr.split('&');
      classId = newArr[0].split('=')[1];
      taskId = newArr[1].split('=')[1];
      taskTitle = newArr[2].split('=')[1];
      taskIndex = newArr[3].split('=')[1];
    }
  }

  // 获取选课名单
  /*getLessonSeletList(obj) {
    fetch(`${ GET_CLASS_STUDENT_LIST }/${ classId }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => data.json()).then(data => {
      console.log(data);
      this.setState({
        studentList: data.data,
      })
    });
  }*/

  // 一个任务下班级学生的完成情况
  getOneClass() {
    fetch('/api/uploadWork/getOneClass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({classId, taskId})
    }).then(data => data.json()).then(data => {
      console.log(data);
      this.setState({
        studentList: data.data,
      })
    });
  }

  render() {
    let { studentList } = this.state;
    console.log(studentList);
    const columns = [{
      title: '学号',
      dataIndex: 'number',
      sorter: (a, b) => a.number - b.number
    }, {
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '班级',
      dataIndex: 'classId'
    }, {
      title: '批改状态',
      dataIndex: 'status',
      filters: [{
        text: '已批',
        value: '已批',
      }, {
        text: '未批',
        value: '未批',
      }, {
        text: '未交',
        value: '未交'
      }],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    }, {
      title: '提交状态',
      dataIndex: 'submitStatus',
      filters: [{
        text: '按时交',
        value: '按时交',
      }, {
        text: '超时交',
        value: '超时交',
      }, {
        text: '未交',
        value: '未交'
      }],
      onFilter: (value, record) => record.uploadStatus.indexOf(value) === 0,
    }, {
      title: '分数',
      dataIndex: 'grade',
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (text, record) => (
        <span>
          <Link to={`/marking?studyId=${record.number}&taskId=${taskId}&taskIndex=${taskIndex}&classId=${classId}`}>进入批阅</Link>
        </span>
      )
    }]


    return (
      <div className={styles.classList}>
        <div className={styles.title}>{taskTitle}</div>
        <Table columns={columns} dataSource={studentList} />
      </div>
    );
  }

}



export default connect()(ClassList);