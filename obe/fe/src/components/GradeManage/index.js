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
    dataIndex: 'name'
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
}, {
  key: '2',
  number: '2014211002',
  name: '姓名2',
  task1: '90',
  task2: '80',
  task3: '95',
  task4: '100',
  progress: '83%',
  totalGrade: '90'
}, {
  key: '3',
  number: '2014211003',
  name: '姓名3',
  task1: '90',
  task2: '80',
  task3: '95',
  task4: '100',
  progress: '83%',
  totalGrade: '90'
}, {
  key: '4',
  number: '2014211004',
  name: '姓名4',
  task1: '90',
  task2: '80',
  task3: '95',
  task4: '100',
  progress: '83%',
  totalGrade: '90'
}];

class GradeManage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

  

	render() {
		return (
      <div className={styles.gradeManage}>
        <div className={styles.title}>计算机网络课程（电子商务+信息管理专业）教学班成绩表</div>
        <Table columns={columns} dataSource={data} />
      </div>
		);
	}

}

export default connect()(GradeManage);