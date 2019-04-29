import React from 'react';
import { connect } from 'dva';
import { routerRedux } from "dva/router";
import styles from './index.css';
import { Form, Icon, Input, Button, message, Menu, List } from 'antd';
import moment from 'moment';
import request from '../../utils/request';
const FormItem = Form.Item;

class topicDetailContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicData: {}
    };
  }
  handleSubmit(e) {
    let data, value, createTime,
      that = this,
      studyID = window.sessionStorage.getItem("studyID"),
      { replyAimID } = this.state;
    let { user } = this.props;
    let topicID = this.state.topicID;
    e.preventDefault();
    that.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        createTime = moment();
        data = {
          ...values,
          createTime,
          topicID,
          replyAimID
        };
        data.studyID = user.number;
        data.name = user.name;
        request("/api/topic/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
          dataType: 'json'
        }).then((res) => {
          that.getTopicData();
          that.props.form.resetFields();
        })
      }
    });
  }
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }
  getTopicData() {
    let topicID = this.state.topicID;
    let listData = [],
      that = this;
    request("/api/topic?topicID=" + topicID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      dataType: 'json'
    }).then((res) => {
      that.setState({
        topicData: res.data
      });
    });
  }
  componentDidMount() {
    const { user: { type } } = this.props;
    this.state.type = type;
    let topicID = this.getTopicID();
    this.state.topicID = topicID;
    this.getTopicData();
  }

  // 获取话题ID
  getTopicID = () => {
    const query = this.props.location.search;
    let topicID = '';
    if (query.length > 0) {
      topicID = query.split('?')[1].split('=')[1];
    }
    return topicID;
  }

  reply(item) { 
    this.state.replyAimID = item.id;
    this.props.form.setFieldsValue({
      comment: `@${item.name}  `
    });
  }

  deleteItem(item) { 
    let that = this;
    let sendData = {
      id: item.id,
      topicID: that.state.topicID
    };
    request("/api/topic/discussDel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      dataType: 'json',
      body: JSON.stringify(sendData)
    }).then((res) => {
      let data = res.data;
      if (data.result) {
        message.success('删除成功');
        that.getTopicData();
      } else { 
        message.success('删除失败');
      }
    });
  }
  render() {
    const that = this;
    const { getFieldDecorator } = that.props.form;
    const { topicData } = that.state;
    const discussData = topicData.discuss;
    const discussNum = discussData && discussData.length || 0;
    return (
      <div>
        <h2>{topicData.title}</h2>
        <p>{topicData.content}</p>
        {/* 评论区 */}
        <div className={styles.discussRow}>
          <h3 className={styles.discussTitle}>知识问答</h3>
          <span className={styles.discussNum}>{discussNum}评论</span>
        </div>
        {/* 回复框 */}
        <Form onSubmit={that.handleSubmit.bind(that)} onReset={that.handleReset.bind(that)}>
          <FormItem>
            {getFieldDecorator('comment', {
              rules: [{ required: true, message: '写下你的评论' }],
            })(
              <Input.TextArea
                autosize={{ minRows: 3 }}
                placeholder="写下你的评论">
                <Input />
              </Input.TextArea>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              发表
            </Button>
            <Button type="default" htmlType="reset" className={styles.resetBtn}>
              取消
            </Button>
          </FormItem>
        </Form>
        {/* 评论展示列表 */}
        <List
          dataSource={discussData}
          className={styles.commentWrap}
          locale={{ emptyText: "暂无评论" }}
          renderItem={item => (
            <List.Item>
              <div>
                <h5>{item.name}</h5>
                {item.comment}
                <div className={styles.timeRange}>
                  <span>评论时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                  &nbsp;&nbsp;&nbsp;
                  {
                    that.state.type === 'teacher' ?
                      <a className={styles.delete} onClick={that.deleteItem.bind(that, item)}>
                        <Icon type="delete" />
                        &nbsp;删除&nbsp;&nbsp;
                      </a> :
                      ''
                  }
                  <a className={styles.reply} onClick={that.reply.bind(that, item)}>
                    <Icon type="message" />
                    &nbsp;回复
                  </a>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const topicDetail = Form.create()(topicDetailContent);
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(topicDetail)