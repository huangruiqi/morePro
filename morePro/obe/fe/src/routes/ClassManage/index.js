import React from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import styles from './index.css'
import { Table, Button, Icon, Modal, Form, Input, Upload, message, Select, Badge } from 'antd'
import NavTitle from '../../components/NavTitle/index.js'
import PageTips from '../../components/PageTips/index.js'

const FormItem = Form.Item
const OP = Select.Option

const GET_CLASS_LIST = '/api/class/'
const GET_LESSON_LIST = '/api/lesson'
const ADD_CLASS = '/api/class/add'
const EDIT_CLASS = '/api/class/edit'
const GET_CLASS_STUDENT_LIST = '/api/class/student'
const OFFLINE_CLASS = '/api/class/offline'

class ClassManage extends React.Component {
  state = {
    editVisible: false,
    studentListVisible: false,
    editType: '',
    classList: [],
    lessonList: [],
    studentList: [],
    // 当前新增班级
    addClassObj: {
      name: '',
      number: '',
      lessonNumber: '',
    },
    // 当前编辑班级
    editClassObj: {},
    lessonSelectList: '',
  }

  componentWillMount() {
    // 获取课程列表
    this.getLessonList()
    this.getClassList()
  }

  // 头部面包屑渲染
  titleNavRender() {
    const conf = {
      parent: '后台管理',
      children: '班级管理',
    }

    const props = { conf }

    return (
      <div className={ styles.navWrap }>
        <NavTitle { ...props } />
      </div>
    )
  }

  // 班级新增按钮渲染
  addBtnRender() {
    return (
      <div className={ styles.addBtnWrap }>
        <Button
          className={ styles.addBtn }
          onClick={ this.addClass.bind(this) }
        >
          <Icon
            type='plus-circle'
          /> 新增班级
        </Button>
      </div>
    )
  }

  // 打开班级新增弹框
  addClass() {
    this.setState({
      editType: 'add',
      editVisible: true,
    })
  }

  // 打开班级编辑弹框
  editClass(item) {
    this.setState({
      editType: 'edit',
      editVisible: true,
      editClassObj: item,
    })
  }

  // 班级列表渲染
  tableRender() {
    const { classList } = this.state
    const dataSource = classList.map((item, i) => {
      item.key = item.number
      return item
    })

    const columns = [{
      title: '班级编号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
      // render: (item, record) => {
      //   return (
      //     <a href={ `/#/lesson/${ record._id }` }>{ item }</a>
      //   )
      // }
    }, {
      title: '班级状态',
      dataIndex: 'status',
      key: 'status',
      render: (item, record) => {
        return item == '1' ? (
          <Badge status='success' text='学习中' />
        ) : (
          <Badge status='default' text='已完成' />
        )
      }
    }, {
      title: '课程编号',
      dataIndex: 'lessonNumber',
      key: 'lessonNumber',
    }, {
      title: ' 操作',
      dataIndex: 'lessonSelect',
      key: 'lessonSelect',
      render: (item, record) => {
        const dis = record.status == '0' ? true : false
        const offlineBtnTxt = record.status == '0' ? '上线' : '下线'
        const type = record.status == '0' ? 'online' : 'offline'
        return (
          <div className={ styles.lessonOps }>
            <Button
              disabled={ dis }
              className={ styles.lessonOpBtn }
              onClick={ () => { this.lessonSeletListClick(record) } }
            >名单</Button>
            <Button
              className={ styles.lessonOpBtn }
            >
              <Link to={ `/class/${ record.number }` }>详情</Link>
            </Button>
            <Button
              disabled={ dis }
              className={ styles.lessonOpBtn }
              onClick={ () => { this.editClass(record) } }
            >编辑</Button>
            <Button
              className={ styles.lessonOpBtn }
              onClick={ () => { this.offlineClass(record._id, type) } }
            >{ offlineBtnTxt }</Button>
          </div>
        )
      }
    }]

    return (
      <Table
        className={ styles.tableWrap }
        dataSource={ dataSource }
        columns={ columns }
      />
    )
  }

  // 获取班级列表
  getClassList() {
    fetch(GET_CLASS_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => data.json()).then(data => {
      this.setState({
        classList: data.data,
      })
    })
  }

  // 上传组件：班级图片，培养方案，教学大纲
  renderUpload(type) {
    const conf = {
      picture: {
        title: '上传班级图片',
        action: '/api/lesson/add/picUpload',
        stateName: 'url'
      },
      teaching: {
        title: '上传教学大纲',
        action: '/api/lesson/add/picUpload',
        stateName: 'teachingUrl',
      },
      training: {
        title: '上传培养方案',
        action: '/api/lesson/add/picUpload',
        stateName: 'trainingUrl',
      },
    }
    const obj = conf[type]
    const props = {
      name: 'file',
      action: obj.action,
      multiple: false,
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info) => {
        if (info.file.status === 'done') {
          // console.log('info.response: ', info)
          const { editType, addClassObj, editClassObj } = this.state
          const url = info.file.response.data.url
          if (editType == 'add') {
            addClassObj[obj.stateName] = url
            this.setState({ addClassObj }, () => {
              message.success(`上传成功。`)
            })
          } else {
            addClassObj[obj.stateName] = url
            this.setState({ editClassObj }, () => {
              message.success(`上传成功。`)
            })
          }
        } else if (info.file.status === 'error') {
          message.error(`上传失败。`)
        }
      },
    }

    return (
      <Upload { ...props }>
        <Button>
          <Icon type='upload' /> { obj.title }
        </Button>
      </Upload>
    )

  }

  // 新增 or 编辑弹框渲染
  editModalRender() {
    const { editType, editVisible, addClassObj, editClassObj, lessonList } = this.state
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
    const type = editType == 'add' ? '添加班级' : '编辑班级'
    const obj = editType == 'add' ? addClassObj : editClassObj
    const dis = editType == 'edit' ? true : false
    const { name, number, lessonNumber } = obj
    return (
      <Modal
        title={ type }
        width={ 650 }
        visible={ editVisible }
        onCancel={ this.editModalCancel.bind(this) }
        footer={ false }
      >
        <Form onSubmit={ this.addLessonSubmit.bind(this) }>
          <FormItem
            label='班级名称'
            { ...formItemLayout }
          >
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{
                required: true,
                message: '请输入班级名称!'
              }],
            })(
              <Input
                disabled={ dis }
                placeholder='班级名称'
              />
            )}
          </FormItem>
          <FormItem
            label='班级编号'
            { ...formItemLayout }
          >
            {getFieldDecorator('number', {
              initialValue: number,
              rules: [{
                required: true,
                message: '请输入班级编号!'
              }],
            })(
              <Input
                disabled={ dis }
                placeholder='班级编号'
              />
            )}
          </FormItem>
          <FormItem
            label='课程编号'
            { ...formItemLayout }
          >
            {getFieldDecorator('lessonNumber', {
              initialValue: lessonNumber,
              rules: [{
                required: true,
                message: '请输入课程编号!'
              }],
            })(
              this.classListRender()
            )}
          </FormItem>
          <FormItem
            label='选课名单'
            { ...formItemLayout }
          >
            {getFieldDecorator('lessonSelectList', {
              valuePropName: 'fileList',
              getValueFromEvent: this.lessonSelectFileChange.bind(this),
            })(
              <Upload
                name='logo'
                beforeUpload={ () => false }
              >
                <Button
                  disabled={ dis }
                >
                  <Icon type='upload' /> 上传名单
                </Button>
              </Upload>
            )}
          </FormItem>
          <FormItem className={ styles.subBtn }>
            <Button
              type='primary'
              htmlType='submit'
            >
              { type }
            </Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }

  // 课程列表渲染
  classListRender() {
    const { lessonList, editType } = this.state
    const dis = editType == 'edit' ? true : false
    const OptCom = lessonList.map((item, i) => {
      const { number, title } = item
      return (
        <OP key={ i } value={ item.number }>{ item.number } - { item.title }</OP>
      )
    })
    return (
      <Select
        disabled={ dis }
        style={{ width: '100%' }}
      >
        { OptCom }
      </Select>
    )
  }

  // 获取课程列表
  getLessonList() {
    fetch(GET_LESSON_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => data.json()).then(data => {
      this.setState({
        lessonList: data.data,
      })
    })
  }

  // 获取课程ID
  getLessonData(number) {
    const { lessonList } = this.state
    let obj = {}
    lessonList.forEach((item) => {
      if (item.number == number) {
        obj = item
      }
    })
    return obj
  }

  // 学生列表文件改变
  lessonSelectFileChange(e) {
    this.setState({ lessonSelectList: e && e.fileList[0] })
  }

  // 关闭弹框
  editModalCancel() {
    this.setState({ editVisible: false })
  }

  // 删除班级
  deleteClass(id) {
    fetch('/api/lesson/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      }).then(data => data.json()).then(data => {
        if (data.status == 1) {
          message.success(data.data)
        } else {
          message.error(data.data)
        }
      })
  }

  // 下线班级
  offlineClass(id, type) {
    const status = type == 'online' ? '1' : '0'
    const typeTxt = type == 'online' ? '上线' : '下线'
    fetch(OFFLINE_CLASS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          status
        })
      }).then(data => data.json()).then(data => {
        if (data.status == 1) {
          message.success(`${ typeTxt }班级成功`)
        } else {
          message.error(`${ typeTxt }班级失败`)
        }
      })
  }

  // 编辑 or 新增表单提交
  addLessonSubmit() {
    this.props.form.validateFields((err, values) => {
        
      if (!err) {
        const { lessonSelectList, editClassObj } = this.state
        const { user: { _id } } = this.props
        const { name, number, lessonNumber } = values
        const lessonData = this.getLessonData(lessonNumber)
        const { editType } = this.state
        const API = editType == 'edit' ? EDIT_CLASS : ADD_CLASS
        let obj = new FormData()
        obj.append('lessonId', lessonData._id)
        obj.append('teacherId', _id)
        obj.append('teacherName', this.props.user.name)
        // 教学班名称
        obj.append('name', name)
        // 教学班代号
        obj.append('number', number)
        obj.append('lessonName', lessonData.title)
        obj.append('lessonNumber', lessonNumber)
        // 教学班学生名单：内含学生学号和姓名
        obj.append('lessonSelectList', lessonSelectList)

        const editObj = new FormData()
        editObj.append('_id', editClassObj._id)
        editObj.append('name', name)
        const params = editType == 'edit' ? editObj : obj
        fetch(API, {
          method: 'POST',
          headers: {},
          body: params
        }).then(data => data.json()).then(data => {
          if (data.status == 1) {
            const op = editType == 'add' ? {
              addClassObj: {
                name: '',
                number: '',
                lessonNumber: '',
              },
              lessonSelectList: '',
            } : {
              editClassObj: {},
              lessonSelectList: '',
            }
            this.setState({
              ...op,
              editVisible: false
            }, () => {
              message.success(data.data)
            })
          } else {
            message.error(data.data)
          }
        })
      } else {
        message.error(`请将信息填写完整。`)
      }
    })
  }

  // 点击名单查看
  lessonSeletListClick(obj) {
    this.getLessonSeletList(obj)
    this.setState({
      studentListVisible: true,
    })
  }

  // 获取选课名单
  getLessonSeletList(obj) {
    const { number } = obj
    fetch(`${ GET_CLASS_STUDENT_LIST }/${ number }`, {
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

  // 选课名单渲染
  renderStudentListModal() {

    const { studentList, studentListVisible } = this.state
    const dataSource = studentList.map((item, i) => {
      item.key = i
      return item
    })

    const columns = [{
      title: '学号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '班级代号',
      dataIndex: 'classNumber',
      key: 'classNumber',
    }, {
      title: '课程编号',
      dataIndex: 'lessonNumber',
      key: 'lessonNumber',
    }
    // , {
    //   title: ' 操作',
    //   dataIndex: 'lessonSelect',
    //   key: 'lessonSelect',
    //   render: (item, record) => {
    //     return (
    //       <div className={ styles.lessonOps }>
    //         <Button
    //           className={ styles.lessonOpBtn }
    //         >名单</Button>
    //         <Button
    //           className={ styles.lessonOpBtn }
    //         >公告</Button>
    //         <Button
    //           className={ styles.lessonOpBtn }
    //           onClick={ () => { this.editClass(record) } }
    //         >编辑</Button>
    //         <Button
    //           className={ styles.lessonOpBtn }
    //           onClick={ () => { this.deleteClass(record._id) } }
    //         >删除</Button>
    //       </div>
    //     )
    //   }
    // }
    ]

    return (
      <Modal
        title='选课名单'
        width={ 650 }
        visible={ studentListVisible }
        onCancel={ () => { this.setState({ studentListVisible: false })} }
        footer={ false }
      >
        <Table
          dataSource={ dataSource }
          columns={ columns }
        />
      </Modal>
    )
  }

  renderClassManage() {
    const { isLogin, user: { type }  } = this.props
    if (!isLogin || type != 'teacher') {
      return (
        <PageTips />
      )
    }
    return (
      <div>
        { this.titleNavRender() }
        { this.addBtnRender() }
        { this.tableRender() }
        { this.editModalRender() }
        { this.renderStudentListModal() }
      </div>
    )
  }

  render() {

    return (
      <div className={ styles.container }>
        { this.renderClassManage() }
      </div>
    )

  }
}

const ClassManageCom = Form.create()(ClassManage)
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(ClassManageCom)
