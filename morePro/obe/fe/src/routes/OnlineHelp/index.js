import React from 'react';
import { connect } from 'dva';
import { routerRedux } from "dva/router";
import styles from './index.css';
import { Form, Icon, Input, Button, message, Menu, List } from 'antd';
import moment from 'moment';
import request from '../../utils/request';
const FormItem = Form.Item;

class OnlineHelpContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isShowDiscussForm: false
    };
  }
  handleSubmit (e) {
    let data, value, createTime,
      that = this;
    let { user } = this.props;
    e.preventDefault();
    that.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        createTime = moment();
        data = {
          ...values,
          createTime
        };
        data.studyID = user.number;
        data.name = user.name;
        request("/api/topic/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
          dataType: 'json'
        }).then((res) => {
          that.getListData();
          that.props.form.resetFields();
        })
      }
    });
  }
  handleReset(e) { 
    e.preventDefault();
    this.props.form.resetFields();
  }
  getListData() {
    let listData = [],
      that = this;  
    request("/api/topic", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      dataType: 'json'
    }).then((res) => {
      that.setState({
        listData: res.data
      });
    });
  }
  componentDidMount() {
    const { user: { type } } = this.props;
    this.setState({
      type: type
    });
    this.getListData();
  }
  reply(item) { 
    this.props.dispatch(routerRedux.push(`/onlineHelp/topicDetail?topicID=${item._id}`));
  }
  deleteItem(item) { 
    let that = this;
    let sendData = {
      topicID: item._id
    };
    request("/api/topic/topicDel", {
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
        this.getListData();
      } else { 
        message.success('删除失败');
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { listData } = this.state;
    const that = this;
    return (
      <div>
        <div>
          <div className={styles.discussRow}>
            <h3 className={styles.discussTitle}>知识问答</h3>
            <span className={styles.discussNum}>{listData.length}评论</span>
          </div>
          <Form
            onSubmit={that.handleSubmit.bind(that)} onReset={that.handleReset.bind(that)}>
            <FormItem>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题' }],
              })(
                <Input placeholder="请输入标题" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('content')(
                <Input.TextArea autosize={{ minRows: 5 }} placeholder="请输入内容">
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
          </Form>;
          <div className={styles.listWrap}>
            <h3>帖子展示</h3>  
            <List
              dataSource={listData}
              className={styles.commentWrap}
              locale={{ emptyText: "暂无帖子" }}
              renderItem={item => (
                <List.Item>
                  <div>
                    <h5><a className={styles.reply} style={{color: '#333'}}
                      onClick={that.reply.bind(that, item._id)}>{item.name}</a>
                    </h5>
                    {item.content}
                    <div className={styles.timeRange}>
                      <span>创建时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
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
        </div>
      </div>
    );
  }
}

const OnlineHelp = Form.create()(OnlineHelpContent);
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(OnlineHelp)