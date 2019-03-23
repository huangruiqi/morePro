import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';


import { Table } from 'antd';

const columns = [{
    title: '学号',
    dataIndex: 'number',
  }, {
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '任务1(占比25%)',
    dataIndex: 'task1',
  }, {
    title: '任务2(占比25%)',
    dataIndex: 'task2',
  }, {
    title: '任务3(占比25%)',
    dataIndex: 'task3',
  }, {
    title: '任务4(占比25%)',
    dataIndex: 'task4',
  }, {
    title: '完成总进度',
    dataIndex: 'progress'
  }, {
    title: '总成绩',
    dataIndex: 'totalGrade'
  }];

const data = [{
  key: '1',
  number: '2014211001',
  name: '姓名1',
  task1: '90',
  task2: '80',
  task3: '95',
  task4: '100',
  progress: '83%',
  totalGrade: '90'
}];

class MyGrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  

  render() {
    return (
      <div className={styles.gradeManage}>
        <div className={styles.title}>XX同学，你的计算机网络成绩如下表：</div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }

}

export default connect()(MyGrade);