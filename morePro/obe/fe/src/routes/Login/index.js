import React from 'react'
import { connect } from 'dva'
import { routerRedux } from "dva/router"
import styles from './index.css'
import { Form, Icon, Input, Button, Checkbox, message, Radio } from 'antd'
const FormItem = Form.Item
const RG = Radio.Group

const LOGIN_API = '/api/login'

class Login extends React.Component {

  handleSubmit(e) {
    e.preventDefault()
    const { form: { validateFields }, dispatch } = this.props
  
    validateFields((err, values) => {
      if (!err) {
        const opts = {
        	method: 'POST',
          // 巨坑，不设置通过接口请求的时候后端是接受不到session的
          credentials: 'include',
        	headers: {
        		'Content-Type': 'application/json'
        	},
        	body: JSON.stringify(values)
        }
        dispatch({
          type: 'app/login',
          payload: {
            opts,
            cb: (type, tips) => {
              const t = type == 1 ? 'success' : 'error'
              message[t](tips)
              type == 1 ? window.location.reload() : ''
            }
          }
        })
        // fetch(LOGIN_API, {
        // 	method: 'POST',
        // 	headers: {
        // 		'Content-Type': 'application/json'
        // 	},
        // 	body: JSON.stringify(values)
        // }).then(data => data.json()).then(data => {
        // 	if (data.status == '1') {
        //     message.success('登录成功')
        //     // dispatch的用法
        //     // dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
        //     console.log('data: ', data.data)
        //     // dispatch(routerRedux.push('/'))
        //   } else {
        //     message.error(data.data)
        //   }
        // })
      }
    })
  }

  renderSysTitle() {
    return (
      <h2 className={ styles.sysTitle }>OBE课程支撑平台</h2>
    )
  }

  renderLoginForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form
        onSubmit={ this.handleSubmit.bind(this) }
        className={ styles.loginForm }
      >
        <FormItem>
          {getFieldDecorator('number', {
            rules: [{
              required: true,
              message: '请输入你的学号!'
            }],
          })(
            <Input
              className={ styles.logInput }
              prefix={ <Icon type='user' className={ styles.icon } /> }
              placeholder='学号'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入你的密码!'
            }],
          })(
            <Input
              className={ styles.logInput }
              prefix={ <Icon type='lock' className={ styles.icon } /> }
              type='password'
              placeholder='密码'
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('type', {
            initialValue: 'student',
            rules: [],
          })(
            <RG className={ styles.type }>
              <Radio value='student'>学生</Radio>
              <Radio value='teacher'>教师</Radio>
            </RG>
          )}
        </FormItem>
        <FormItem>
          <Button
            type='default'
            htmlType='submit'
            className={ styles.loginBtn }
          >登陆</Button>
        </FormItem>
      </Form>
    )
  }

  renderLogin() {
    const { isLogin, dispatch } = this.props
    if (isLogin) {
      dispatch(routerRedux.push('/user/op'))
      return null
    }
    return (
      <div>
        { this.renderSysTitle() }
        { this.renderLoginForm() }
      </div>
    )
  }

  render() {
    return (
      <div className={ styles.loginWrap }>
        { this.renderLogin() }
      </div>
    )
  }
}

export default connect(({ app, routing }) => {
    return { ...app, routing }
})(Form.create()(Login))
