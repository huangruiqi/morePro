import React from 'react'
import styles from './index.css'
import { Alert } from 'antd'

class PageTips extends React.Component {
  state = {
  }

  render() {

    return (
        <div className={ styles.pageTipsWrap }>
          <Alert
            className={ styles.pageTips }
            message='提示'
            description="您对这个页面没有访问权限哦！"
            type='info'
            showIcon
          />
        </div>
      )

  }
}
export default PageTips
