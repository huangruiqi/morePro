import React from 'react'
import { Switch, Route, Redirect, routerRedux, Router } from 'dva/router'
import dynamic from 'dva/dynamic'

const { ConnectedRouter } = routerRedux

import App from './routes/App/index'
import Regist from "./routes/Regist/index"
import Login from "./routes/Login/index"
import LessonSelect from "./routes/LessonSelect/index"
import LessonManage from "./routes/LessonManage/index"
import LessonDetail from "./routes/LessonDetail/index"
import UserManage from "./routes/UserManage/index"
import UserCenter from "./routes/UserCenter/index"
import ClassManage from "./routes/ClassManage/index"
import ClassDetail from "./routes/ClassDetail/index"

import WorkManage from "./routes/WorkManage/index"
import MyTask from "./routes/WorkManage/MyTask"
import GradeManage from "./routes/GradeManage/index"
import MyGrade from "./routes/GradeManage/MyGrade"
import ClassList from "./routes/ClassList/index"
import UploadWork from "./routes/UploadWork/index"
import Marking from "./routes/UploadWork/Marking"
import LessonList from "./routes/LessonList/index"
import MyLesson from "./routes/LessonList/MyLesson"

import OnlineStudy from "./routes/OnlineStudy/index"
import TaskDetail from "./routes/TaskDetail/index"
import OnlineHelp from "./routes/OnlineHelp/index"
import TopicDetail from "./routes/TopicDetail/index"

const Routers = function ({ history, app }) {
  // const error = dynamic({
  //   app,
  //   component: () => import('./routes/error'),
  // })
  const routes = [
    {
      path: '/',
      component: UserCenter,
    }, {
      path: '/login',
      // 有model层的组件可以从这里直接引入
      // models: () => [import('./models/user')],
      component: () => Login,
    }, {
      path: '/regist',
      component: () => Regist,
    }, {
      path: '/lesson/select',
      component: () => LessonSelect,
    }, {
      path: '/lesson/op',
      component: () => LessonManage,
    }, {
      path: '/lesson/:id',
      component: () => LessonDetail,
    }, {
      path: '/user/import',
      component: () => UserManage,
    }, {
      path: '/user/:id',
      component: () => UserCenter,
    }, {
      path: '/class/op',
      component: () => ClassManage,
    }, {
      path: '/class/:number',
      component: () => ClassDetail,
    }, {
      path: '/workManage',
      component: () => WorkManage,
    }, {
      path: '/myTask',
      component: () => MyTask,
    }, {
      path: '/gradeManage',
      component: () => GradeManage,
    }, {
      path: '/myGrade',
      component: () => MyGrade,
    }, {
      path: '/classList',
      component: () => ClassList,
    }, {
      path: '/uploadWork',
      component: () => UploadWork,
    }, {
      path: '/marking',
      component: () => Marking,
    }, {
      path: '/lessonList',
      component: () => LessonList
    }, {
      path: '/myLesson',
      component: () => MyLesson
    }, {
      path: '/onlineStudy/lists',
      component: () => OnlineStudy,
    }, {
      path: '/onlineStudy/detail',
      component: () => TaskDetail,
    }, {
      path: '/onlineHelp/lists',
      component: () => OnlineHelp,
    }, {
      path: '/onlineHelp/topicDetail',
      component: () => TopicDetail,
    }
  ]

  return (
    <ConnectedRouter history={ history }>
      <App>
        <Switch>
          <Route exact path='/' render={() => (<Redirect to='/login' />)} />
          {
            routes.map(({ path, ...dynamics }, key) => {
              return (
                <Route key={ key }
                  exact
                  path={ path }
                  component={ dynamic({
                    App,
                    ...dynamics,
                  }) }
                />
              )
            })
          }
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

export default Routers
