import { routerRedux } from 'dva/router'
import { Login, Logout, GetUserInfo } from '../services/user.js'

export default {
  namespace: 'app',
  state: {
    isLogin: false,
    user: {},
    locationPathname: ''
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
          },
        })
      })
    },

    // 初始化
    setup ({ dispatch }) {
      dispatch({ type: 'getUserInfo' })
    },

  },
  effects: {

    * login ({
      payload: { opts, cb },
    }, { call, put }) {
      const cbValues = yield call(Login, opts)
      const { status, data } = cbValues.data

      if (status == 1) {
        yield put({
          type: 'updateState',
          payload: {
            user: data,
            isLogin: true
          },
        })
        cb && cb(1, '登录成功')
      } else {
        cb && cb(0, data)
      }
    },

    * logout ({
      payload: { opts, cb },
    }, { call, put }) {
      const cbValues = yield call(Logout, opts)
      const { status, data } = cbValues.data

      if (status == 1) {
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            isLogin: false
          },
        })
        cb && cb(data)
      }
    },
    
    * getUserInfo ({
      payload,
    }, { call, put }) {
      const opts = {
        method: 'GET',
        // 巨坑，不设置通过接口请求的时候后端是接受不到session的
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      }
      const data = yield call(GetUserInfo, opts)
      yield put({
        type: 'updateState',
        payload: data.data.data,
      })
    },

    // * query ({
    //   payload,
    // }, { call, put, select }) {
    //   const { success, user } = yield call(query, payload)
    //   const { locationPathname } = yield select(_ => _.app)
    //   if (success && user) {
    //     const { list } = yield call(menusService.query)
    //     const { permissions } = user
    //     let menu = list
    //     if (permissions.role === EnumRoleType.ADMIN || permissions.role === EnumRoleType.DEVELOPER) {
    //       permissions.visit = list.map(item => item.id)
    //     } else {
    //       menu = list.filter((item) => {
    //         const cases = [
    //           permissions.visit.includes(item.id),
    //           item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
    //           item.bpid ? permissions.visit.includes(item.bpid) : true,
    //         ]
    //         return cases.every(_ => _)
    //       })
    //     }
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         user,
    //         permissions,
    //         menu,
    //       },
    //     })
    //     if (location.pathname === '/login') {
    //       yield put(routerRedux.push({
    //         pathname: '/dashboard',
    //       }))
    //     }
    //   } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
    //     yield put(routerRedux.push({
    //       pathname: '/login',
    //       search: queryString.stringify({
    //         from: locationPathname,
    //       }),
    //     }))
    //   }
    // },

    // * logout ({
    //   payload,
    // }, { call, put }) {
    //   const data = yield call(logout, parse(payload))
    //   if (data.success) {
    //     yield put({ type: 'query' })
    //   } else {
    //     throw (data)
    //   }
    // },

    // * changeNavbar (action, { put, select }) {
    //   const { app } = yield (select(_ => _))
    //   const isNavbar = document.body.clientWidth < 769
    //   if (isNavbar !== app.isNavbar) {
    //     yield put({ type: 'handleNavbar', payload: isNavbar })
    //   }
    // },

  },
  reducers: {
      updateState (state, { payload} ) {
        return {
          ...state,
          ...payload,
        }
      },

    // switchSider (state) {
    //   window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
    //   return {
    //     ...state,
    //     siderFold: !state.siderFold,
    //   }
    // },

  },
}