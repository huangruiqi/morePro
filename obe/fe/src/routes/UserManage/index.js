import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from './index.css'
import { Table, Button, Icon, Modal, Form, Input, Upload, Tag, message } from 'antd'
import NavTitle from '../../components/NavTitle/index.js'

const FormItem = Form.Item
const ADD_CLASS = '/api/user/class/add'
const ADD_TEACHER = '/api/user/teacher/add'
const GET_TEACHER_LIST = '/api/user/teacher/'
const GET_CLASS_LIST = '/api/user/class/'
const GET_STUDENT_LIST = '/api/user/student/'

class UserManage extends React.Component {
  state = {
    editVisible: false,
    editType: '',
    visible: false,
    // ClassAdd, StudentLook, TeacherImport, TeacherLook
    modalType: 'ClassAdd',
    studentListFile: '',
    teacherList: [],
    studentList: [],
  }

  componentWillMount() {
    this.getStudentList()
  }

  // 面包屑导航
  titleNavRender() {
    const conf = {
      parent: '用户',
      children: '用户管理',
    }

    const props = { conf }

    return (
      <div className={ styles.navWrap }>
        <NavTitle { ...props } />
      </div>
    )
  }

  // 用户模版
  renderUser(type, cb) {
    const userType = type == 'teacher' ? ' 教师管理' : '学生管理'
    const teacherCom = (
      <div>
        <Button
          size='small'
          className={ styles.importBtn }
          onClick={ () => { this.openModal('TeacherImport') } }
        >导入名单</Button>
        <Button
          size='small'
          className={ styles.importBtn }
          onClick={ () => { cb && cb(); this.openModal('TeacherLook') } }
        >查看名单</Button>
      </div>
    )
    const studentCom = (
      <div>
        { this.renderStudentList() }
      </div>
    )
    const com = type == 'teacher' ? teacherCom : studentCom
    return (
      <div className={ styles.typeWrap }>
        <h3 className={ styles.typeTitle }>{ userType }</h3>
        { com }
      </div>
    )
  }

  // Teacher
  renderTeacherUser() {
    return this.renderUser('teacher', this.getTeacherList.bind(this))
  }

  // Student
  renderStudentUser() {
    return this.renderUser('student', this.getStudentList.bind(this))
  }

  // 弹框类型
  getModalTypeConf() {
    const { modalType } = this.state
    let conf = {
      modalName: '',
      content: '',
      handleSubmit: false,
    }

    switch(modalType) {
      case 'ClassAdd':
        conf = {
          modalName: '创建班级',
          content: this.classCreateContent('创建班级'),
        }
        break
      case 'TeacherImport':
        conf = {
          modalName: '导入教师名单',
          content: this.teacherImportContent(),
        }
        break
      case 'TeacherLook':
        conf = {
          modalName: '查看教师名单',
          content: this.renderTeacherList(),
        }
        break
      default:
        break
    }

    return conf
  }

  // 弹框
  modalRender() {
    const { visible } = this.state
    const conf = this.getModalTypeConf()
    return (
      <Modal
        title={ conf.modalName }
        width={ 650 }
        visible={ visible }
        onCancel={ this.modalCancel.bind(this) }
        footer={ false }
      >
        { conf.content }
      </Modal>
    )
  }

  // 学生导入内容 - 可改为用户编辑
  classCreateContent() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    return (
      <Form
        encType='multipart/form-data'
        onSubmit={ this.addClassStudent.bind(this) }
      >
          <FormItem
            label='班级名称'
            { ...formItemLayout }
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入班级名称!'
              }],
            })(
              <Input
                placeholder='班级名称'
              />
            )}
          </FormItem>
          <FormItem
            label='班级代号'
            { ...formItemLayout }
          >
            {getFieldDecorator('number', {
              rules: [{
                required: true,
                message: '请输入班级代号!'
              }],
            })(
              <Input
                placeholder='班级代号'
              />
            )}
          </FormItem>
          <FormItem
            label='所在学院'
            { ...formItemLayout }
          >
            {getFieldDecorator('academic', {
              rules: [{
                required: true,
                message: '请输入所在学院!'
              }],
            })(
              <Input
                placeholder='所在学院'
              />
            )}
          </FormItem>
          <FormItem
            label='学生名单'
            { ...formItemLayout }
          >
            {getFieldDecorator('studentList', {
              valuePropName: 'fileList',
              getValueFromEvent: this.studentListFileChange.bind(this),
            })(
              <Upload
                name='logo'
                beforeUpload={ () => false }
              >
                <Button>
                  <Icon type='upload' /> 上传名单
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem className={ styles.subBtn }>
            <Button
              type='primary'
              htmlType='submit'
            >创建</Button>
          </FormItem>
        </Form>
    )
  }
  // 学生列表文件改变
  studentListFileChange(e) {
    this.setState({ studentListFile: e && e.fileList[0] })
  }

  // 导入学生名单
  addClassStudent() {
    this.props.form.validateFields((err, values) => {
      const { studentListFile } = this.state
      const { name, number, academic } = values
      let obj = new FormData()
      obj.append('name', name)
      obj.append('number', number)
      obj.append('academic', academic)
      obj.append('studentList', studentListFile)
      
      fetch(ADD_CLASS, {
        method: 'POST',
        headers: {},
        body: obj
      }).then(data => data.json()).then(data => {
        if (data.status == 1) {
          this.setState({ visible: false }, () => {
            message.success(data.data)
          })
        } else {
          message.error(data.data)
        }
      })
    })
  }

  // 导入教师名单内容
  teacherImportContent() {
    const props = {
      name: 'file',
      action: ADD_TEACHER,
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info) => {
        if (info.file.status == 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status == 'error') {
          message.error(`上传失败`);
        }
      },
    }

    return (
      <Upload { ...props }>
        <Button>
          <Icon type='upload' /> 上传教师名单
        </Button>
      </Upload>
    )

  }

  // 获取教师名单
  getTeacherList() {
    fetch(GET_TEACHER_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => data.json()).then(data => {
      this.setState({
        teacherList: data.data,
      })
    })
  }

  // 浏览教师列表内容
  renderTeacherList() {
    const { teacherList } = this.state
    const dataSource = teacherList.map((item, i) => {
      item.key = i
      return item
    })

    const columns = [{
      title: '教师姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '教师编号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '所在学院',
      dataIndex: 'academic',
      key: 'academic'
    }]

    return (
      <Table
        dataSource={ dataSource }
        columns={ columns }
      />
    )
  }

  // 获取学生列表
  getStudentList(v) {
    fetch(GET_STUDENT_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => data.json()).then(data => {
      this.setState({
        studentList: data.data,
      })
    })
  }

  // 浏览学生列表内容
  renderStudentList() {
    const { studentList } = this.state
    const dataSource = studentList.map((item, i) => {
      item.key = i
      return item
    })

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '学号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '学院',
      dataIndex: 'academic',
      key: 'academic'
    }, {
      title: ' 专业',
      dataIndex: 'major',
      key: 'major'
    }, {
      title: '班级',
      dataIndex: 'class',
      key: 'class'
    }]

    return (
      <Table
        dataSource={ dataSource }
        columns={ columns }
      />
    )
  }

  // 关闭弹框
  modalCancel() {
    this.setState({ visible: false })
  }

  // 添加班级按钮
  openModal(type) {
    this.setState({
      modalType: type,
      visible: true,
    })
  }

  render() {

    return (
      <div className={ styles.container }>
        { this.titleNavRender() }
        { this.renderTeacherUser() }
        { this.renderStudentUser() }
        { this.modalRender() }
      </div>
    )

  }
}

const UserManageCom = Form.create()(UserManage)
export default connect(({ app, routing }) => {
  return {
    app,
    routing
  }
})(UserManageCom)
