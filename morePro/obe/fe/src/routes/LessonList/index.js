import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';
import PageTips from '../../components/PageTips/index.js'


import {Form, Button } from 'antd';

class LessonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonList: [],
    };
  }

  componentDidMount() {
    this.getLessonList();
  }

  // 获取当前老师的课程列表
  getLessonList() {
    const { isLogin, user: { type, _id }  } = this.props;
    if (isLogin) {
      fetch('/api/lessonManage/getLessonList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teacherId: _id, type: type })
      }).then(data => data.json()).then(data => {
        this.setState({
          lessonList: data
        });
      });
    }
  }

  render() {
    const { isLogin, user: { name, type } } = this.props;
    if (!isLogin || type != 'teacher') {
      return (
        <PageTips />
      )
    }
    const { lessonList } = this.state;
    const listLength = lessonList.length;
    const lessonView = listLength && lessonList.map((item, i) => (
      <li key={item._id}>
        <div className={styles.lesson}>
          <Link className={styles.link} to={`/workManage?id=${item.number}&name=${item.name}`}>
          <div className={styles.imgWrap}>
          </div>
          <div className={styles.mask}>
            <div className={styles.subtitle}>{item.name}</div>
          </div>
          </Link>
        </div>
        <div className={styles.handleWrap}>
          <Button size="large" style={{marginRight: 30}} type="primary">
            <Link to={`/workManage?id=${item.number}&name=${item.name}`}>任务管理</Link>
          </Button>
          <Button size="large" type="primary">
            <Link to={`/gradeManage?id=${item.number}&name=${item.name}`}>查看成绩</Link>
          </Button>
        </div>
      </li>
    ));
    return (
      <div className={styles.lessonWrap}>
        { listLength > 0 ?
          <div>
            <div className={styles.title}>{name}老师，你这学期的课程列表如下：</div>
            <ul>
              { 
                lessonView 
              }
            </ul>
          </div>
          :
          <div className={styles.title}>{name}老师，你还未添加课程，请去后台管理——课程管理中心添加课程</div>
        }
        
      </div>
    );
  }

}

// export default connect()(LessonList);
const LessonListCom = Form.create()(LessonList)
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(LessonListCom)