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
import { deleteReportArtical, getReportArtical, postReportArtical, postStopArtical, deleteArtical } from "../../actions";



class ReportArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickKey: 0,
      visibleDelete: false,
      visibleStop: false,
      reportArticals: [],
      loading: true,

      writerStop: "您好，由于您的文章涉及到。。。。被其他用户举报，经过论坛负责人审查，将决定冻结你的用户账号.....",//冻结默认Value
      writerDelete: "您好，由于您的文章涉及到。。。。被其他用户举报，经过论坛负责人审查，将决定删除您于2018.10.12日发表的 这有一篇文章.....",//给作者举报信息
      reportDelete: "您好，经论坛负责人审查，您于2018.11.11举报的这个霸气的名字的 这有一篇文章...已被删除，感谢您的反馈"//给举报者信息
    }
    
  }

  componentDidMount() {
    this.props.getReportArtical();
  }
  componentWillReceiveProps(nextProps) {
    this.addAntdData(nextProps);//将文章装进antd所需的对象数组
  }
  //将文章装进antd所需的对象数组
  addAntdData(nextProps) {
    let newArtical = [];//用作赋值的数组
    let rowKey = 1;
    nextProps.reportArticals[0] && nextProps.reportArticals.forEach((aticalData) => {
      newArtical.push({
        key: rowKey,
        name: aticalData.writerName,
        title: aticalData.title,
        reporter: aticalData.reportName,
        category: aticalData.category,
        tags: aticalData.tag,
        authority: aticalData.authority ? "开放" : "内部",
        pullTime: aticalData.pullTime,
        reportTime: aticalData.reportTime
      });
      rowKey++;
      this.setState({
        reportArticals: newArtical,
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
    const dataAll = this.props.reportArticals;
    const key = this.state.clickKey;
    const writerWarn = this.refs.writerWarn;
    const reportWarn = this.refs.reportWarn;
    this.props.postReportArtical({ articalId: dataAll[key - 1].id, writerId: dataAll[key - 1].writerId, reportId: dataAll[key].reportId, writerWarn: writerWarn.value, reportWarn: reportWarn.value});
    this.setState({
      visibleDelete: false,
    }, () => {
      this.props.deleteReportArtical(this.state.clickKey);
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
    const dataAll = this.props.reportArticals;
    const key = this.state.clickKey;
    const stopWarn = this.refs.stopWarn;//获取冻结信息
    this.props.postStopArtical({ articalId: dataAll[key - 1].id, writerId: dataAll[key -1].writerId, writerInformation: stopWarn.value });
    this.setState({
      visibleStop: false,
    }, () => {
      this.props.deleteReportArtical(this.state.clickKey);
    });
  }
  //发送冻结通知框取消
  handleCancelStop = (e) => {
    this.setState({
      visibleStop: false,
    });
  }

  //删除操作
  deleteArtical(key) {
    const dataId = {dataId: this.props.reportArticals[key - 1].id};
    this.props.deleteArtical(dataId);
    // console.log(dataId);
  }
  //渲染table
  addTable() {
    const rowSelection = {
      width: "5px",
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        
      }
    }
    const pagination = {
      position: 'bottom'
    }
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: text => <a href="javascript:;">{text}</a>,
      fixed: 'left',
      width: 100
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      fixed: 'left',
      width: 100
    }, {
      title: '举报人',
      dataIndex: 'reporter',
      key: 'reporter',
      align: 'center',
      fixed: 'left',
      width: 100
    }, {
      title: '类别',
      key: 'category',
      dataIndex: 'category',
      align: 'center',
      width: 150,
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center',
      fixed: 'ture',
      width: 150,
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: '权限',
      dataIndex: 'authority',
      key: 'authority',
      fixed: 'ture',
      align: 'center',
      width: 50,
    }, {
      title: '发布时间',
      dataIndex: 'pullTime',
      key: 'pullTime',
      align: 'center',
      fixed: 'ture',
      width: 150,
    }, {
      title: '举报时间',
      dataIndex: 'reportTime',
      key: 'reportTime',
      fixed: 'ture',
      align: 'center',
      width: 150,
    },{
      title: '操作',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 400,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(this.props.reportArticals[record.key - 1].toHtml); }}>文章详情</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => { this.setState({ clickKey: record.key }, () => { this.showModalDelete(); }) }}>文章删除</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={() => { this.setState({ clickKey: record.key }, () => { this.showModalStop(); }) }}>冻结用户</a>
          <Divider type="vertical" />
          {/* 好坑，必须加（）=》{} */}
          <Button type="primary" onClick={() => { this.deleteArtical(record.key); this.props.deleteReportArtical(record.key); this.setState({clickKey: record.key})}}> 不予操作 </Button>
        </span>
      ),
    }];
    return (
      <Table 
          columns={columns} 
          dataSource={ this.state.reportArticals }
          pagination={{ pageSize: 10 }} 
          size="small" 
          rowSelection={rowSelection}
          pagination={pagination}
          scroll={{ x: 1355, y: 478 }}
          loading={ this.state.loading }
        />
    )
  }
  render(){
    return(
      <div className="articalContainer">        
        { this.addTable() }
        <Modal
          title="确定删除吗？"
          visible={this.state.visibleDelete}
          onOk={this.handleOkDelete}
          onCancel={this.handleCancelDelete}
          cancelText="取消"
          okText="确定"
        >
          <p>注意：<br/>将发送消息通知给被举报用户：</p>
          <div className="message"><textarea rows="3" cols="20" defaultValue={this.state.writerDelete} ref='writerWarn'></textarea></div>
          <p>将发送消息通知给举报者：</p>
          <div className="message"><textarea rows="3" cols="20" defaultValue={this.state.reportDelete} ref='reportWarn'></textarea></div>
        </Modal>
        <Modal
          title="确定冻结吗？"
          visible={this.state.visibleStop}
          onOk={this.handleOkStop}
          onCancel={this.handleCancelStop}
          cancelText="取消"
          okText="确定"
        >
          <p>注意：<br />将发送冻结消息通知给被举报用户：</p>
          <div className="message"><textarea rows="5" cols="25" defaultValue={this.state.writerStop} ref='stopWarn'></textarea></div>
        </Modal>
      </div>
    )
  }

  
}
const mapStateToProps = (state) => {
  return {
    reportArticals: state.reportArtical
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     reportArtical: () => { dispatch(reportArtical()) }
//   }
// }
export default connect(mapStateToProps, { deleteReportArtical, getReportArtical, postReportArtical, postStopArtical, deleteArtical })(ReportArticle);