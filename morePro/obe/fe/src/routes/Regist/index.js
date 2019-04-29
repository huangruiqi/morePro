import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Form, Input, Icon, Button, message } from 'antd'
import styles from './index.css'

const FormItem = Form.Item
const REGIST_API = '/api/user/regist'

class Regist extends React.Component {
  state = {
  }

  // 系统名称渲染
  renderSysTitle() {
    return (
      <h2 className={ styles.sysTitle }>OBE课程支撑平台</h2>
    )
  }

  // 注册表单渲染
  renderRegistForm() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form
        onSubmit={ this.handleSubmit.bind(this) }
        className={ styles.registForm }
      >
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '请输入你的姓名',
            }],
          })(
            <Input
              className={ styles.registInput }
              prefix={ <Icon type='user' className={ styles.icon } /> }
              placeholder='姓名'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('number', {
            rules: [{
              required: true,
              message: '请选输入学号!'
            }],
          })(
            <Input
              className={ styles.registInput }
              prefix={ <Icon type='info' className={ styles.icon } /> }
              placeholder='学号'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入你的密码!',
            }],
          })(
            <Input
              type='password'
              className={ styles.registInput }
              prefix={ <Icon type='lock' className={ styles.icon } /> }
              placeholder='密码'
            />
          )}
        </FormItem>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true,
              message: '请确认密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input
              type='password'
              className={ styles.registInput }
              prefix={ <Icon type='safety' className={ styles.icon } /> }
              placeholder='确认密码'
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('academic', {
            rules: [{
              required: true,
              message: '请选输入所在学院!'
            }],
          })(
            <Input
              className={ styles.registInput }
              prefix={ <Icon type='home' className={ styles.icon } /> }
              placeholder='学院'
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('class', {
            rules: [{
              required: true,
              message: '请选输入班级代码!'
            }],
          })(
            <Input
              className={ styles.registInput }
              prefix={ <Icon type='solution' className={ styles.icon } /> }
              placeholder='班级代码'
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('major', {
            rules: [{
              required: true,
              message: '请选输入专业!'
            }],
          })(
            <Input
              className={ styles.registInput }
              prefix={ <Icon type='book' className={ styles.icon } /> }
              placeholder='专业'
            />
          )}
        </FormItem>
        
        <FormItem>
          <Button
            type='default'
            htmlType='submit'
            className={ styles.registBtn }
          >注册</Button>
        </FormItem>
      </Form>
    )
  }

  // 密码一致性性检查
  checkPassword = (rule, value, cb) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      cb('两次输入密码不一致!')
    } else {
      cb()
    }
  }

  // 注册表单提交
  handleSubmit(e) {
    e.preventDefault()
    const { form: { validateFieldsAndScroll }, dispatch } = this.props
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        fetch(REGIST_API, {
        	method : 'POST',
        	headers : {
        		'Content-Type': 'application/json'
        	},
        	body: JSON.stringify(values)
        }).then((data) => data.json()).then((data) => {
          if (data.status == '1') {
            message.success('注册成功')
            dispatch(routerRedux.push('/login'))
          } else {
            message.error(data.data)
          }
        })
      }
    })
  }

  renderRegist() {
    const { isLogin, dispatch } = this.props
    if (isLogin) {
      dispatch(routerRedux.push('/user/op'))
      return null
    }
    return (
      <div>
        { this.renderSysTitle() }
        { this.renderRegistForm() }
      </div>
    )
  }

  render() {
 
    return (
      <div className={ styles.registWrap }>
        { this.renderRegist() }
      </div>
    )
  }
}

export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(Form.create()(Regist))
