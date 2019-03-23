import React from 'react';
import { connect } from 'dva';
import { routerRedux } from "dva/router";
import styles from './index.css';
import { Form, Icon, Input, Button, message, List } from 'antd';
import moment from 'moment';
import request from '../../utils/request';
const FormItem = Form.Item;

class OnlineStudyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      classId: ''
    };
  }
  componentDidMount() {
    let { classId } = this.props;
    this.getData((data) => {
      this.setState({
        data: data,
      });
    });
  }
  getData = (callback) => {
    let { classId } = this.props;
    let data = {
      classId: classId
    };
    request('/api/workManage/getTaskList', {
      dataType: 'json',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => { 
      callback(res.data);
    });
  }

  viewTaskDetail(taskID) { 
    this.props.dispatch(routerRedux.push(`/onlineStudy/detail?taskID=${taskID}`));
  }
  render() {
    const that = this;
    const { data } = that.state;
    const header = <h3 className={styles.project}>计算机网络课程</h3>;
    return (
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={data}
        bordered={true}
        header={header}
        renderItem={item => (
          <List.Item
            actions={[<a onClick={that.viewTaskDetail.bind(that, item._id)}>进入项目</a>]}
          >
            <div>
              <h4><a onClick={that.viewTaskDetail.bind(that, item._id)}>{item.title}</a></h4>
              {item.content}
              <div className={styles.timeRange}>
                <span>开始时间：{moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                &nbsp;&nbsp;
                <span>结束时间：{moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </div>
            </div>
          </List.Item>
        )}
      />
    )
  }
}

const OnlineStudy = Form.create()(OnlineStudyContent);
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(OnlineStudy)