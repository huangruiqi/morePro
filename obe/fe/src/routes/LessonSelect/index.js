import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from './index.css'
import { Table, Button } from 'antd'
import NavTitle from '../../components/NavTitle/index.js'

const GET_LESSON_LIST = '/api/lesson/'

class LessonSelect extends React.Component {
  state = {
    // userType: '',
    lessonList: [],
  }

  componentWillMount() {
    // 获取课程列表
    this.getLessonList()
  }

  // 获取课程列表
  getLessonList() {
    fetch(GET_LESSON_LIST, {
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(data => data.json()).then(data => {
      this.setState({
        lessonList: data.data,
      })
    })
  }

  titleNavRender() {
    const conf = {
      parent: '课程中心',
      children: '课程列表',
    }

    const props = { conf }

    return (
      <div className={ styles.navWrap }>
        <NavTitle { ...props } />
      </div>
    )
  } 

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
      title: '任课班级',
      dataIndex: 'class',
      key: 'class',
    }
    // , {
    //   title: ' 选课操作',
    //   dataIndex: 'lessonSelect',
    //   render: () => {
    //     return (<Button>选择课程</Button>)
    //   }
    // }
    ]

    return (
      <Table
        className={ styles.tableWrap }
        dataSource={ dataSource }
        columns={ columns }
      />
    )
  }

  render() {

    return (
      <div className={ styles.container }>
        { this.titleNavRender() }
        { this.tableRender() }
      </div>
    )

  }
}

export default LessonSelect
