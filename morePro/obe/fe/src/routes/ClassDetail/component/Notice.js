import React from 'react'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import styles from '../index.css'
import { Table, Button, Icon, Tabs, Badge } from 'antd'

const TP = Tabs.TabPane

class Notice extends React.Component {
  state = {
  }

  componentWillMount() {
  }

  render() {

    return (
      <div className={ styles.container }>
        公告组件
      </div>
    )

  }
}

export default Notice