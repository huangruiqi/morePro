import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {routerRedux, Link} from "dva/router";
import styles from './index.css';
import PageTips from '../../components/PageTips/index.js'


import {Form, Button } from 'antd';

class MyLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonList: [],
    };
  }

  componentDidMount() {
    this.getLessonList();
  }

  // 获取当前学生的课程列表
  getLessonList() {
    const { isLogin, user: { type, number }  } = this.props;
    if (isLogin) {
      fetch('/api/lessonManage/getLessonList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId: number, type: type })
      }).then(data => data.json()).then(data => {
        this.setState({
          lessonList: data
        });
      });
    }
  }

  render() {
    const { isLogin, user: { name, type } } = this.props;
    if (!isLogin || type != 'student') {
      return (
        <PageTips />
      )
    }
    const { lessonList } = this.state;
    const listLength = lessonList.length;
    const lessonView = listLength && lessonList.map((item, i) => (
      <li key={item._id}>
        <div className={styles.lesson}>
          <Link className={styles.link} to={`/myTask?id=${item.classNumber}`}>
          <div className={styles.imgWrap}>
          </div>
          <div className={styles.mask}>
            <div className={styles.subtitle}>{item.className}</div>
          </div>
          </Link>
        </div>
        <div className={styles.handleWrap}>
          <Button size="large" style={{marginRight: 30}} type="primary">
            <Link to={`/myTask?id=${item.classNumber}`}>我的任务</Link>
          </Button>
          <Button size="large" type="primary">
            <Link to={`/myGrade?id=${item.classNumber}&lessonName=${item.lessonName}`}>我的成绩</Link>
          </Button>
        </div>
      </li>

    ));
    return (
      <div className={styles.lessonWrap}>
        { listLength > 0 ?
          <div>
            <div className={styles.title}>{name}同学，你这学期的课程列表如下：</div>
            <ul>
              { 
                lessonView 
              }
            </ul>
          </div>
          :
          <div className={styles.title}>{name}同学，你还没有课程哦，等待老师添加课程</div>
        }
        
      </div>
    );
  }

}

// export default connect()(LessonList);
const MyLessonCom = Form.create()(MyLesson)
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(MyLessonCom)