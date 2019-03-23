import React, { Component } from 'react';
import { Form,Input,Button,Row,Col,Icon} from 'antd';
import './index.css'
import img from '../../resources/images/login.jpg';
import { withRouter } from 'react-router-dom';
const FormItem = Form.Item;
class Login extends Component {
  loginSubmit(e){
    e.preventDefault();
    this.props.history.push("/");
    this.props.bindSubmit();
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form className="login-form">
        <div className="title">
          <img src={ img } alt="geeklogo" className="loginImg"/>
          <p>后台管理</p>
        </div>
        <FormItem>
          { getFieldDecorator("email",{
            rules:[{
              type:"email",message:"您输入的不是有效的邮箱！",
            },{
              required:true,message:"请输入您的邮箱！"
            }]
          })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="E-mail"/>
          )}
        </FormItem>
        <FormItem>
          <Row gutter={8}>
            <Col span={10}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码！' }],
              })(
                <Input placeholder="验证码"/>
              )}

            </Col>
            <Col span={6}>
              <Button>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button" block onClick={this.loginSubmit.bind(this)}>
            Log in
        </Button>
      </Form>
    )
  }
}
const LoginForm = Form.create()(Login);
export default withRouter(LoginForm)