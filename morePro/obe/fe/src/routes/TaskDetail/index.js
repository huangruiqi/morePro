import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { List, Upload, Icon, Button, Form, Input, message } from 'antd';
import moment from 'moment';
import request from '../../utils/request';

const FormItem = Form.Item;

const filePath = "https://docview.mingdao.com/op/view.aspx?src=http%3A%2F%2Fvideo.ch9.ms%2Fbuild%2F2011%2Fslides%2FTOOL-532T_Sutter.pptx";
  
class TaskDetailContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: [],
      discussData: [],
      review: false,
      taskID: ''
    };
  }
  componentDidMount() {
    const { user: { type } } = this.props;
    this.state.type = type;
    this.getTaskID();
    this.getTaskData();
    this.getDiscussData();
    this.getFiles();
  }

  // 获取任务ID
  getTaskID = () => {
    const query = this.props.location.search;
    let taskID = '';
    if (query.length > 0) {
      taskID = query.split('?')[1].split('=')[1];
    }
    this.state.taskID = taskID;
  }

  getTaskData() {
    let taskID = this.state.taskID;
    let obj = {
      type: 'query',
      id: taskID
    };
    request('/api/workManage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      dataType: 'json',
      body: JSON.stringify(obj)
    }).then((res) => { 
      this.setState({
        taskData: res.data
      });
    });
  }

  getFiles() {
    var that = this;
    let taskID = that.state.taskID;
    request('/api/studyFile?taskID=' + taskID, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      dataType: 'json'
    }).then((res) => { 
      that.setState({
        filesLists: res.data
      });
    });
  }

  // 获取评论数据
  getDiscussData() {
    var that = this;
    let taskID = that.state.taskID;
    request('/api/comment?taskID=' + taskID, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      dataType: 'json'
    }).then((res) => { 
      that.setState({
        discussData: res.data
      });
    });
  }

  dealReview(dealReview) {
    this.setState({
      review: dealReview
    })
  }

  handleSubmit(e) { 
    let { replyAimID } = this.state;
    let taskID = this.state.taskID;
    let { user } = this.props;
    let data, value, createTime,
      that = this;
    e.preventDefault();
    that.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        createTime = moment();
        data = {
          ...values,
          createTime,
          taskID,
          replyAimID
        };
        data.studyID = user.number;
        data.name = user.name;
        request("/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          dataType: 'json',
          body: JSON.stringify(data)
        }).then((data) => {
          that.props.form.resetFields();
          that.getDiscussData(taskID);
          that.getFiles(taskID);
        })
      }
    });
  }
  handleReset(e) { 
    e.preventDefault();
    this.props.form.resetFields();
  }

  reply(item) { 
    this.state.replyAimID = item.id;
    this.props.form.setFieldsValue({
      comment: `@${item.name}  `
    });
  }

  getUpload() { 
    let { filesLists, taskData } = this.state;
    let that = this;
    let props = {
      action: '/api/studyFile/upload',
      listType: 'picture',
      data: {
        taskID: taskData[0] && taskData[0]._id
      },
      defaultFileList: filesLists,
      onPreview: function (a) { 
        that.dealReview(true);
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
      onRemove(info) {
        var that = this;
        request('/api/studyFile/onDelete', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          dataType: 'json',
          data: info
        }).then((res) => {
          message.success(`${info.name} 文件删除成功`);
        });
      }
    }; 
    if (filesLists instanceof Array && filesLists.length > 0) { 
      return (
        <Upload key={1} {...props}>
          {
            this.state.type === 'teacher' ?  
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button> :
            ''  
          }
        </Upload>
      )
    }
    return (
      <Upload key={2} {...props}>
        {
          this.state.type === 'teacher' ?
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button> :
            ''
        }
      </Upload>
    )
  }
  deleteItem(item) { 
    let that = this;
    let taskID = that.state.taskID;
    let sendData = {
      id: item.id,
      taskID: taskID
    };
    request("/api/comment/discussDel", {
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
        this.getDiscussData();
      } else { 
        message.success('删除失败');
      }
    });
  }
  render() {
    const that = this;
    let review = that.state.review ? 'block' : 'none';
    const { getFieldDecorator } = that.props.form;
    const { taskData, discussData } = that.state;
    const header = <h2>计算机网络课程</h2>;
    const discussNum = discussData && discussData.length || 0;
    return (
      <div className={styles.wrap}>
        {/* 任务及学习资料展示区域 */}
        <List
          itemLayout="horizontal"
          dataSource={taskData}
          bordered={true}
          header={header}
          renderItem={item => (
            <List.Item>
              <div className={styles.taskInfoWrap}>
                <h4>{item.title}</h4>
                <p className={styles.taskContent}>{item.description}</p>
                <div className={styles.timeRange}>
                  <span>开始时间：{moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                  &nbsp;&nbsp;
                <span>结束时间：{moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
              </div>
              {that.getUpload()}
            </List.Item>
          )}
        />
        {/* 预览框 */}
        <div>
          <div className={styles.mask} style={{ display: review }}></div>
          <div style={{ display: review }} className={styles.reviewWrap}>
            <span onClick={that.dealReview.bind(that, false)} className={styles.close}>X</span>
            <iframe src={filePath} className={styles.review}></iframe>
          </div>
        </div>
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
    )
  }
}
const TaskDetail = Form.create()(TaskDetailContent);
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(TaskDetail)