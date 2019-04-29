import React from 'react'
import { Breadcrumb } from 'antd'
import styles from './index.css'

const BI = Breadcrumb.Item

class NavTitle extends React.Component {
  state = {
  }

  titleNavRender() {
    const { conf } = this.props
    // const childText = conf.children ? ` \\ ${ conf.children }` : ''

    return (
      <Breadcrumb
        className={ styles.titleNav }
        separator='>'
      >
        <BI>{ conf.parent }</BI>
        <BI>{ conf.children }</BI>
      </Breadcrumb>
    )
  } 


  render() {

    return (
      <div className={ styles.container }>
        { this.titleNavRender() }
      </div>
    )

  }
}

export default NavTitle
