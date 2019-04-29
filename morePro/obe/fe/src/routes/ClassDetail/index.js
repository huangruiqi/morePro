import React from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import styles from './index.css'
import { Table, Button, Icon, Tabs, Badge } from 'antd'
import NavTitle from '../../components/NavTitle/index.js'
import Notice from './component/Notice.js'
import TaskList from '../WorkManage/index.js'

const TP = Tabs.TabPane
const GET_SINGLE_CLASS = '/api/class/'
let classId;

class ClassDetail extends React.Component {
  state = {
    classData: {},
  }

  componentWillMount() {
    const number = this.props.match.params.number
    this.getClass(number)
    classId = number
  }

  // 头部面包屑渲染
  titleNavRender() {
    const { classData: { name } } = this.state
    const conf = {
      parent: '班级详情',
      children: name,
    }

    const props = { conf }

    return (
      <div className={ styles.navWrap }>
        <NavTitle { ...props } />
      </div>
    )
  }

  // 班级基本信息渲染
  renderClassInfo() {
    const { name, number, lessonName, lessonNumber, status, teacherName } = this.state.classData

    const statusTxt = status == '1' ? (
      <Badge status='success' text='学习中' />
    ) : (
      <Badge status='default' text='已结束' />
    )
    return (
      <div className={ styles.classBoxWrap }>
        <div className={ styles.classBox }>
          <h3 className={ styles.className }>班级：{ `${ name }（${ number }）` }</h3>
          <p className={ styles.classStatus }>{ statusTxt  }</p>
          <p className={ styles.classLesson }>
            课程：<Link to={ `/lesson/${ lessonNumber }` }>{ `${ lessonName }（${ lessonNumber }）` }</Link>
          </p>
          <p className={ styles.classTeacher }>教师：{ teacherName }</p>
          <Button className={ styles.classStudyBtn }>
            <Link to='/'>在线学习</Link>
          </Button>
        </div>
      </div>
    )
  }

  // 获取单个班级数据
  getClass(number) {
    const API = GET_SINGLE_CLASS + number
    fetch(API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json()).then(data => {
      this.setState({
        classData: data.data,
      })
    })
  }

  // 班级基本操作渲染
  renderClassTab(number) {
    const conf = [{
      key: 'work',
      name: '作业',
      content: <TaskList classId={classId}/>
    }, {
      key: 'notice',
      name: '公告',
      content: <Notice />
    }]

    const coms = conf.map((item, i) => {
      const { key, name, content } = item
      return (
        <TP tab={ name } key={ key }>
          { content }
        </TP>
      )
    })

    return (
      <div className={ styles.classTabWrap }>
        <Tabs
          defaultActiveKey='work'
          onChange={ this.handleTabChange.bind(this) }
        >
          { coms }
        </Tabs>
      </div>
    )
  }

  // Tab切换处理
  handleTabChange(key) {
    console.log('key: ', key)
  }

  render() {

    return (
      <div className={ styles.container }>
        { this.titleNavRender() }
        { this.renderClassInfo() }
        { this.renderClassTab() }
      </div>
    )

  }
}

export default ClassDetail
