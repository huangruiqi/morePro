import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { RIGHTS_AGREE, RIGHTS_DISAGREE, RIGHTS_GET_VERIFICATION_CODE, RIGHTS_GET_INVITATION_CODE } from '../../actions/actionTypes';
import { Card, Table, Button, Form, Row, Col, Input } from 'antd';
const FormItem = Form.Item;
class RightsManage extends Component {
  handleAgree() {
    this.props.dispatch({
      type: RIGHTS_AGREE
    })
  }
  handleDisagree() {
    this.props.dispatch({
      type: RIGHTS_DISAGREE
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch({
      type: RIGHTS_GET_INVITATION_CODE
    })
  }

  handleVerify() {
    const email = this.props.form.getFieldValue('email');
    this.props.dispatch({
      type: RIGHTS_GET_VERIFICATION_CODE,
      payload: {
        email
      }
    })
  }

  render() {
    const { rightsManagement, form: { getFieldDecorator } } = this.props;
    const columns = [{
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '权限类型',
      dataIndex: 'permissionType',
      key: 'permissionType'
    }, {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <div>
            <Button className='rightsManagementTableButton' onClick={this.handleAgree.bind(this)}>同意</Button>
            <Button className='rightsManagementTableButton' onClick={this.handleDisagree.bind(this)}>驳回</Button>
          </div>
        )
      }
    }];
    return (
      <div>
        <Card
          title='申请处理'
          style={{ marginBottom: '20px' }}
        >
          <Table
            columns={columns}
            rowKey={(record) => (record.id)}
            className='rightsManagementTable'
            dataSource={rightsManagement.tableData} />
        </Card>
        <Card
          title='生成邀请码'>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col offset={1} span={3} className='rightsManagementFormText'>请输入管理员邮箱：</Col>
              <Col span={5}>
                <FormItem>
                  {getFieldDecorator('email')(
                    <Input type="email" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col offset={1} span={3} className='rightsManagementFormText'>请输入验证码：</Col>
              <Col span={2}>
                <FormItem>
                  {getFieldDecorator('text')(
                    <Input type="text" />
                  )}
                </FormItem>
              </Col>
              <Col span={3}>
                <Button style={{ float: 'right', marginTop: '4px' }} onClick={this.handleVerify.bind(this)}>获取验证码</Button>
              </Col>
            </Row>
            <Row>
              <Col offset={4} span={5} style={{ textAlign: 'center' }}>
                <Button htmlType='submit'>确定</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    )
  }
}

export default connect(({ rightsManagement }) => ({
  rightsManagement
}))(Form.create()(RightsManage));