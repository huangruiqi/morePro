import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from './index.css'
import { Table, Button, Icon } from 'antd'
import NavTitle from '../../components/NavTitle/index.js'

const GET_SINGLE_LESSON = '/api/lesson/'

class LessonDetail extends React.Component {
  state = {
    lessonData: {},
  }

  componentWillMount() {
    const id = this.props.match.params.id
    this.getLessonList(id)
  }

  // 获取课程列表
  getLessonList(id) {
    const API = GET_SINGLE_LESSON + id
    fetch(API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => data.json()).then(data => {
      this.setState({
        lessonData: data.data,
      })
    })
  }

  titleNavRender() {
    const conf = {
      parent: '课程',
      children: '课程详情',
    }

    const props = { conf }

    return (
      <div className={ styles.navWrap }>
        <NavTitle { ...props } />
      </div>
    )
  }

  renderLessonInfo() {
    const data = this.state.lessonData || {}
    return (
      <div className={ styles.typeWrap }>
        <h3 className={ styles.typeTitle }>课程信息</h3>
        <div className={ styles.lessonInfoWrap }>
          <img className={ styles.lessonPic } src={ `http://127.0.0.1:3000${ data.url }` } />
          <div className={ styles.lessonInfo }>
            <h3 className={ styles.lessonTitle }>标题: { data.title }</h3>
            <p className={ styles.lessonInfos }>教师: { data.teacher } | 编号: { data.number } | 学分: { data.score } | 时长: { data.time }</p>
            <p className={ styles.lessonDesc }>描述: { data.description }</p>
          </div>
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className={ styles.container }>
        { this.titleNavRender() }
        { this.renderLessonInfo() }
      </div>
    )

  }
}

export default LessonDetail
