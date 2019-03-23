import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
  data:{
    page:1,
    datetag: "all", //时间
    neg: "all", //倾向
    carry: "全部", //载体
    order: "timedown", //排序
    similer: 0, //是否排重
  },
    url:''
}
const mutations = {
  getdata(state,obj) {
    state.url = 'http://web.is8.com.cn/om/mpart/docList/DocSearchDo?action=docList&page='+obj.page+'&neg='+obj.neg+'&carry='+obj.carry;
    console.log(state.url);
  }
}
//暴露
export default new Vuex.Store({
    state,
    mutations
})
