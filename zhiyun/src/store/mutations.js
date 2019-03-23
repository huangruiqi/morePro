import * as types from './mutation-types'

const mutations = {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_HEADER_FILTER] (state, filter) {
    for (let filterItem in state.filter) {
      if (filter === filterItem) {
        if (state.filter[filterItem]) {
          state.filter[filterItem] = false
          state.filtering.show = false
        } else {
          state.filtering.show = true
          state.filter[filterItem] = true
        }
      } else {
        state.filter[filterItem] = false
      }
    }
  },
  [types.SET_HEAD_M] (state, filterAll) {
    fetch(' http://web.is8.com.cn/om/mpart/docList/DocSearchDo?action=docList&carry='+ filterAll.carry+ '&datetag=' + filterAll.datetag + '&neg=' + filterAll.neg + '&similer=' + filterAll.similer + '&order=' +filterAll.order, {
      credentials: 'include'
    }).then(res => {
      res.json().then(body => {
        let docList = body.docList
        console.log(docList)
        docList.forEach(val => {
          val.show = false
          console.log(val.carry)
          val.imgurl = require('../assets/images/'+val.carry+'.png')
        })
        state.materialList = docList
      })
    })
  }
}

export default mutations
