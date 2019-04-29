import React from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import styles from './index.css'
import { Table, Button, Icon, Badge } from 'antd'
import NavTitle from '../../components/NavTitle/index.js'

const GET_USER_CLASS_LIST = '/api/lesson/seleted'

class UserCenter extends React.Component {
  state = {
    editVisible: false,
    editType: '',
    lessonList: [],
  }

  componentWillMount() {
    this.getLessonSelectList()
  }

  titleNavRender() {
    const conf = {
      parent: '用户',
      children: '个人中心',
    }

    const props = { conf }

    return (
      <div className={ styles.navWrap }>
        <NavTitle { ...props } />
      </div>
    )
  }

  tableRender() {
    const { user: { type } } = this.props
    const { lessonList } = this.state

    const dataSource = lessonList

    const teacherColumns = [{
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '班级代号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '状态',
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
      title: '课程名称',
      dataIndex: 'lessonName',
      key: 'lessonName',
    }, {
      title: '课程编号',
      dataIndex: 'lessonNumber',
      key: 'lessonNumber',
    }, {
      title: '任课老师',
      dataIndex: 'teacherName',
      key: 'teacherName',
    }, {
      title: ' 操作',
      dataIndex: 'lessonSelect',
      render: (item, record) => {
        const { number } = record
        return (
          <div className={ styles.lessonOps }>
            <Button
              className={ styles.lessonOpsBtn }
            >
              <Link to={ `/class/${ number }` }>详情</Link>
            </Button>
          </div>
        )
        // 后续看有没有需求，对于班级的编辑修改主要在【班级管理】这块
        // return (
        //   <div className={ styles.lessonOps }>
        //     <Button
        //       className={ styles.lessonOpsBtn }
        //     >名单</Button>
        //     <Button
        //       className={ styles.lessonOpsBtn }
        //     >
        //       <Link to='/lesson/op'>详情</Link>
        //     </Button>
        //     <Button
        //       className={ styles.lessonOpsBtn }
        //     >编辑</Button>
        //     <Button
        //       className={ styles.lessonOpsBtn }
        //     >上线</Button>
        //   </div>
        // )
      }
    }]

    const studentColumns = [{
      title: '班级代号',
      dataIndex: 'classNumber',
      key: 'classNumber',
    }, {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
    }, {
      title: '学生姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '学号',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '课程编号',
      dataIndex: 'lessonNumber',
      key: 'lessonNumber',
    }, {
      title: '任课老师',
      dataIndex: 'teacherName',
      key: 'teacherName',
    }, {
      title: ' 操作',
      dataIndex: 'lessonSelect',
      render: (item, record) => {
        
        return (
          <div className={ styles.lessonOps }>
            <Button
            >
              <Link to={ `/class/${ record.classNumber }` }>详情</Link>
            </Button>
          </div>
        )
      }
    }]

    const columns = type == 'teacher' ? teacherColumns : studentColumns

    return (
      <Table
        className={ styles.tableWrap }
        dataSource={ dataSource }
        columns={ columns }
      />
    )
  }

  getLessonSelectList() {
    const { isLogin, user: { type, number, _id } } = this.props
    if (isLogin) {
      fetch(GET_USER_CLASS_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          teacherId: _id || '',
          number: number || '',
          type,
        })
      }).then(data => data.json()).then(data => {
        this.setState({
          lessonList: data.data,
        })
      })
    }
  }

  renderSeletedLesson() {
    const { user: { type } } = this.props
    const title = type == 'teacher' ? '教授课程' : '已选课程'
    return (
      <div className={ styles.typeWrap }>
        <h3 className={ styles.typeTitle }>{ title }</h3>
        { this.tableRender() }
      </div>
    )
  }

  render() {

    return (
      <div className={ styles.container }>
        { this.titleNavRender() }
        { this.renderSeletedLesson() }
      </div>
    )

  }
}

export default connect(({ app, routing }) => {
  return {
    ...app,
    routing
  }
})(UserCenter)
