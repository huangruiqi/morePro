import React, { Component } from 'react';
import './index.css';
import {
  Table,
  Divider,
  Tag,
  Button,
  Modal
} from 'antd';
import { connect } from "react-redux";
import { getReportComment, fetchCommentDetail, deleteReportComment, postReportComment, postStopComment, deleteComment } from "../../actions";


class ReportComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickKey: 0,
      visibleDelete: false,//是否显示弹出框 删除
      visibleStop: false,//冻结
      visibleDetail: false,//详情

      confirmLoadingDetail: false,//是否要异步加载确定按钮
      confirmLoadingDelete: false,
      confirmLoadingStop: false,

      reportComments: [],
      commentDetail: [],
      loading: true,

      getDetail: false,

      writerStop: "您好，由于您的文章涉及到。。。。被其他用户举报，经过论坛负责人审查，将决定冻结你的用户账号.....",//冻结默认Value
      writerDelete: "您好，由于您的文章涉及到。。。。被其他用户举报，经过论坛负责人审查，将决定删除您于2018.10.12日发表的 这有一篇文章.....",//给作者举报信息
      reportDelete: "您好，经论坛负责人审查，您于2018.11.11举报的这个霸气的名字的 这有一篇文章...已被删除，感谢您的反馈"//给举报者信息
    }

  }

  componentDidMount() {
    this.props.getReportComment();
  }
  componentWillReceiveProps(nextProps) {
    this.addAntdData(nextProps);//将文章装进antd所需的对象数组
    this.state.getDetail && this.addModalInfo(nextProps);
  }
  //将文章装进antd所需的对象数组
  addAntdData(nextProps) {
    let newComment = [];//用作赋值的数组
    let rowKey = 1;
    nextProps.reportComments[0] && nextProps.reportComments.forEach((commentData) => {
      newComment.push({
        key: rowKey,
        name: commentData.userNickname,
        reporter: commentData.reportUserNickname,
        pullTime: commentData.commentCreateTime,
        reportTime: commentData.reportTime,
        content: commentData.commentContent       
      });
      rowKey++;
      this.setState({
        reportComments: newComment,
        loading: false
      });
    });
  }
  //展示发送通知框
  showModalDelete = () => {
    this.setState({
      visibleDelete: true,
    });
  }
  //发送通知框确定
  handleOkDelete = (e) => {
    const dataAll = this.props.reportComments;
    const key = this.state.clickKey;
    const writerWarn = this.refs.writerWarn;
    const reportWarn = this.refs.reportWarn;
    this.props.postReportComment({ articalId: dataAll[key - 1].id, writerId: dataAll[key].writerId, reportId: dataAll[key].reportId, writerWarn: writerWarn.value, reportWarn: reportWarn.value });
    this.setState({
      visibleDelete: false,
    }, () => {
      this.props.deleteReportComment(this.state.clickKey);
    });

  }
  //发送通知框取消
  handleCancelDelete = (e) => {
    this.setState({
      visibleDelete: false,
    });
  }

  //展示冻结发送通知框
  showModalStop = () => {
    this.setState({
      visibleStop: true,
    });
  }
  //发送冻结通知框确定
  handleOkStop = (e) => {
    const dataAll = this.props.reportComments;
    const key = this.state.clickKey;
    const stopWarn = this.refs.stopWarn;//获取冻结信息
    this.props.postStopComment({ articalId: dataAll[key - 1].id, writerId: dataAll[key - 1].writerId, writerInformation: stopWarn.value });
    this.setState({
      visibleStop: false,
    }, () => {
      this.props.deleteReportComment(this.state.clickKey);
    });
  }
  //发送冻结通知框取消
  handleCancelStop = (e) => {
    this.setState({
      visibleStop: false,
    });
  }
  //modal出来正常信息
  //获取数值后再渲染详情
  addModalInfo(nextProps) {
    nextProps.reportCommentDetail.themeId && this.setState({
      commentDetail: nextProps.reportCommentDetail
    }, () => {
      const key = this.state.clickKey;
      const dataDetail = this.state.commentDetail;
    
      Modal.info({
      title: '该条评论详情',
      width: '1000px',
      content: (
        <div className="contentContainer">
          <table cellPadding='4' cellSpacing='0'width='100%'>
            <tbody>
              <tr height='5px' className={dataDetail.commentStatus<0?"reportData":""}>
                <td width='5%' height='5px'>
                  <div className="avater" style={{ backgroundImage: "url(" + dataDetail.userIconUrl +")"}}></div>
                </td>
                <td width="75%" colSpan='3'>
                  &nbsp;&nbsp;&nbsp;<b>{dataDetail.userNickname}</b>&nbsp;&nbsp;评论文章<br />&nbsp;&nbsp;&nbsp;{dataDetail.commentContent}
                </td>
                <td width='20%'>
                  {dataDetail.commentCreateTime}
                </td>
              </tr>
              {dataDetail.childComments.length > 0 && dataDetail.childComments.map((replayData) => {
                return (
                  <tr key={replayData.commentId} height='5px' className={replayData.commentStatus < 0 ? "reportData" : ""}>
                    <td width='5%'></td>
                    <td width='5%' height='5px'>
                      <div className="avater" style={{ backgroundImage: "url(" + replayData.userIconUrl }}></div>
                    </td>
                    <td width="70%" colSpan='2'>
                      &nbsp;&nbsp;&nbsp;<b>{replayData.userNickname}</b>&nbsp;&nbsp;回复<b>&nbsp;&nbsp;{replayData.replyUserNickname}</b><br />&nbsp;&nbsp;&nbsp;{replayData.commentContent}
                    </td>
                    <td width='20%'>
                      {replayData.commentCreateTime}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ),
      onOk: () => {
        this.setState({
          getDetail: false
        })
      }

    });
    });
  }
  //请求info的数据
  info(key) {
    this.setState({
      clickKey: key
    });
    const dataAll = this.props.reportComments;
    this.props.fetchCommentDetail(dataAll[key - 1].commentId);
  }
  //删除操作
  deleteComment(key) {
    const dataId = { dataId: this.props.reportComments[key - 1].id };
    this.props.deleteComment(dataId);
  }
  
  //渲染table
  addTable() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      fixed: 'ture',
      width: 100,
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '举报内容',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      fixed: 'ture',
      width: 200
    },{
      title: '举报人',
      dataIndex: 'reporter',
      key: 'reporter',
      align: 'center',
      fixed: 'ture',
      width: 100
    }, {
      title: '发布时间',
      dataIndex: 'pullTime',
      key: 'pullTime',
      align: 'center',
      fixed: 'ture',
    }, {
      title: '举报时间',
      dataIndex: 'reportTime',
      key: 'reportTime',
      fixed: 'ture',
      align: 'center',
    }, {
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'ture',
      width: 400,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(this.props.reportComments[record.key - 1].toHtml); }}>评论详情</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={(e) => { e.stopPropagation(); this.setState({ clickKey: record.key }, () => { this.showModalDelete(); })}}>评论删除</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={(e) => { e.stopPropagation(); this.setState({ clickKey: record.key }, () => { this.showModalStop(); })}}>冻结用户</a>
          <Divider type="vertical" />
          {/* 好坑，必须加（）=》{} */}
          <Button type="primary" onClick={(e) => { e.stopPropagation(); this.deleteComment(record.key); this.props.deleteReportComment(record.key); this.setState({ clickKey: record.key }) }}> 不予操作 </Button>
        </span>
      ),
    }];
    return (
      <Table
        columns={columns}
        dataSource={this.state.reportComments}
        pagination={{ pageSize: 10 }}
        size="small"
        scroll={{y: 478 }}
        loading={this.state.loading}
        onRow={(record) => {
          return {
            onClick: () => {this.setState({getDetail: true});this.info(record.key)}
          };
        }}
      />
    )
  }
  render() {
    return (
      <div className="contentContainer">
        {this.addTable()}
        <Modal
          title="确定删除吗？"
          visible={this.state.visibleDelete}
          onOk={this.handleOkDelete}
          onCancel={this.handleCancelDelete}
          cancelText="取消"
          okText="确定"
          confirmLoading={this.state.confirmLoadingDelete}
        >
          <p>注意：<br />将发送消息通知给被举报用户：</p>
          <div className="message"><textarea rows="3" cols="20" defaultValue={ this.state.writerDelete } ref='writerWarn'></textarea></div>
          <p>将发送消息通知给举报者：</p>
          <div className="message"><textarea rows="3" cols="20" defaultValue={ this.state.reportDelete } ref='reportWarn'></textarea></div>
        </Modal>
        <Modal
          title="确定冻结吗？"
          visible={this.state.visibleStop}
          onOk={this.handleOkStop}
          onCancel={this.handleCancelStop}
          cancelText="取消"
          okText="确定"
          confirmLoading={this.state.confirmLoadingStop}
        >
          <p>注意：<br />将发送冻结消息通知给被举报用户：</p>
          <div className="message"><textarea rows="5" cols="25" defaultValue={this.state.writerStop } ref='stopWarn'></textarea></div>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    reportComments: state.reportComment,
    reportCommentDetail: state.getReCommentDetail
  };
};

export default connect(mapStateToProps, { getReportComment, fetchCommentDetail, deleteReportComment, postReportComment, postStopComment, deleteComment})(ReportComments);