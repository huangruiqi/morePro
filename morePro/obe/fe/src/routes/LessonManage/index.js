import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from './index.css'
import { Table, Button, Icon, Modal, Form, Input, Upload, message, Alert } from 'antd'
import NavTitle from '../../components/NavTitle/index.js'
import PageTips from '../../components/PageTips/index.js'

const FormItem = Form.Item
const TA = Input.TextArea

const GET_LESSON_LIST = '/api/lesson/'

class LessonManage extends React.Component {
  state = {
    editVisible: false,
    editType: '',
    lessonList: [],
    // 当前新增课程
    addLessonObj: {
      title: '',
      number: '',
      description: '',
      teacher: '',
      time: '',
      score: '',
      url: '',
      teachingUrl: '',
      trainingUrl: '',
    },
    // 当前编辑课程
    editLessonObj: {},
  }

  componentWillMount() {
    // 获取课程列表
    this.getLessonList()
  }

  // 头部面包屑渲染
  titleNavRender() {
    const conf = {
      parent: '课程',
      children: '课程管理',
    }

    const props = { conf }

    return (
      <div className={ styles.navWrap }>
        <NavTitle { ...props } />
      </div>
    )
  }

  // 课程新增按钮渲染
  addBtnRender() {
    return (
      <div className={ styles.addBtnWrap }>
        <Button
          className={ styles.addBtn }
          onClick={ this.addLesson.bind(this) }
        >
          <Icon
            type='plus-circle'
          /> 新增课程
        </Button>
      </div>
    )
  }

  // 打开课程新增弹框
  addLesson() {
    this.setState({
      editType: 'add',
      editVisible: true,
    })
  }

  // 打开课程编辑弹框
  editLesson(item) {
    this.setState({
      editType: 'edit',
      editVisible: true,
      editLessonObj: item,
    })
  }

  // 课程列表渲染
  tableRender() {
    const { lessonList } = this.state
    const dataSource = lessonList.map((item, i) => {
      item.key = i
      return item
    })

    const columns = [{
      title: '课程编号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '课程名称',
      dataIndex: 'title',
      key: 'title',
      render: (item, record) => {
        return (
          <a href={ `/#/lesson/${ record._id }` }>{ item }</a>
        )
      }
    }, {
      title: '任课教师',
      dataIndex: 'teacher',
      key: 'teacher',
    }, {
      title: '课程时长',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '课程学分',
      dataIndex: 'score',
      key: 'score',
    }, {
      title: ' 操作',
      dataIndex: 'lessonSelect',
      key: 'lessonSelect',
      render: (item, record) => {
        // return (
        //   <div className={ styles.lessonOps }>
        //     <Icon
        //       type='edit'
        //       className={ styles.editLessonBtn }
        //       onClick={ () => { this.editLesson(record) } }
        //     />
        //     <Icon
        //       type='delete'
        //       className={ styles.deleteLessonBtn }
        //       onClick={ () => { this.deleteLesson(record._id) } }
        //     />
        //   </div>
        // )
        // 删除接口已有，但因为课程与班级等关联，暂不放出删除操作
        return (
          <div className={ styles.lessonOps }>
            <Icon
              type='edit'
              className={ styles.editLessonBtn }
              onClick={ () => { this.editLesson(record) } }
            />
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

  // 上传组件：课程图片，培养方案，教学大纲
  renderUpload(type) {
    const conf = {
      picture: {
        title: '上传课程图片',
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
          const { editType, addLessonObj, editLessonObj } = this.state
          const url = info.file.response.data.url
          if (editType == 'add') {
            addLessonObj[obj.stateName] = url
            this.setState({ addLessonObj }, () => {
              message.success(`上传成功。`)
            })
          } else {
            addLessonObj[obj.stateName] = url
            this.setState({ editLessonObj }, () => {
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

  // 新增 or 编辑弹框渲染
  editModalRender() {
    const { editType, editVisible, addLessonObj, editLessonObj } = this.state
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
    const type = editType == 'add' ? '添加课程' : '编辑课程'
    const obj = editType == 'add' ? addLessonObj : editLessonObj
    const { title, number, description, teacher, time, score } = obj
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
            label='课程名称'
            { ...formItemLayout }
          >
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [{
                required: true,
                message: '请输入课程名称!'
              }],
            })(
              <Input
                placeholder='课程名称'
              />
            )}
          </FormItem>
          <FormItem
            label='课程编号'
            { ...formItemLayout }
          >
            {getFieldDecorator('number', {
              initialValue: number,
              rules: [{
                required: true,
                message: '请输入课程编号!'
              }],
            })(
              <Input
                placeholder='课程编号'
              />
            )}
          </FormItem>
          <FormItem
            label='课程介绍'
            { ...formItemLayout }
          >
            {getFieldDecorator('description', {
              initialValue: description,
              rules: [{
                required: true,
                message: '请输入课程介绍!'
              }],
            })(
              <TA
                placeholder='课程介绍'
              />
            )}
          </FormItem>
          <FormItem
            label='任课老师'
            { ...formItemLayout }
          >
            {getFieldDecorator('teacher', {
              initialValue: teacher,
              rules: [{
                required: true,
                message: '请输入任课老师!'
              }],
            })(
              <Input
                placeholder='任课老师'
              />
            )}
          </FormItem>
          <FormItem
            label='课程时长'
            { ...formItemLayout }
          >
            {getFieldDecorator('time', {
              initialValue: time,
              rules: [{
                required: true,
                message: '请输入课程时长!'
              }],
            })(
              <Input
                placeholder='课程时长'
              />
            )}
          </FormItem>
          <FormItem
            label='课程学分'
            { ...formItemLayout }
          >
            {getFieldDecorator('score', {
              initialValue: score,
              rules: [{
                required: true,
                message: '请输入课程学分!'
              }],
            })(
              <Input
                placeholder='课程学分'
              />
            )}
          </FormItem>
          <FormItem
            label='课程图片'
            { ...formItemLayout }
          >
            { this.renderUpload('picture') }
          </FormItem>
          <FormItem
            label='培养方案'
            { ...formItemLayout }
          >
            { this.renderUpload('training') }
          </FormItem>
          <FormItem
            label='教学大纲'
            { ...formItemLayout }
          >
            { this.renderUpload('teaching') }
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

  // 关闭弹框
  editModalCancel() {
    this.setState({ editVisible: false })
  }

  // 删除课程
  deleteLesson(id) {
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

  // 编辑 or 新增表单提交
  addLessonSubmit() {
    this.props.form.validateFields((err, values) => {
      const { editType, editLessonObj, addLessonObj } = this.state
      const obj = editType == 'add' ? addLessonObj : editLessonObj
      if (!err && obj.url) {
        const params = editType == 'add' ? { ...values, url: obj.url } : { ...editLessonObj, ...values }
        const apiUrl = editType == 'add' ? '/api/lesson/add' : '/api/lesson/edit'
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        }).then(data => data.json()).then(data => {
          if (data.status == 1) {
            this.setState({ editVisible: false }, () => {
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

  renderLessonManage() {
    const { isLogin, user: { type }  } = this.props
    // 暂时隐去
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
      </div>
    )
  }

  render() {

    return (
      <div className={ styles.container }>
        { this.renderLessonManage() }
      </div>
    )

  }
}

const LessonManageCom = Form.create()(LessonManage)
export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(LessonManageCom)
