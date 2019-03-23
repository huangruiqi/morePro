import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import InfoChange from '@/components/infoChange/infoChange'
import KeywordsSetting from '@/components/keywordsSetting/keywordsSetting'
import PasswordSetting from '@/components/passwordSetting/passwordSetting'
import EmailSetting from '@/components/emailSetting/emailSetting'
import PhoneSetting from '@/components/phoneSetting/phoneSetting'
import OpinionAnalysis from '@/components/opinionAnalysis/opinionAnalysis'
import MyOpinion from '@/components/myOpinion/myOpinion'
import OpinionCategory from '@/components/opinionCategory/opinionCategory'
import OpinionCollection from '@/components/opinionCollection/opinionCollection'
import OpinionDetail from '@/components/opinionDetail/opinionDetail'
import OpinionLeader from '@/components/opinionLeader/opinionLeader'
import OpinionMaterial from '@/components/opinionMaterial/opinionMaterial'
import OpinionReport from '@/components/opinionReport/opinionReport'
import OpinionSearch from '@/components/opinionSearch/OpinionSearch'
import OpinionSituation from '@/components/opinionSituation/OpinionSituation'
import OpinionTopic from '@/components/opinionTopic/opinionTopic'
import OpinionWatch from '@/components/opinionWatch/opinionWatch'
import OpinionWorning from '@/components/opinionWorning/opinionWorning'
import OpinionWeibo from '@/components/opinionWeibo/opinionWeibo'
import userInformation from '@/components/userInformation/userInformation'
import Login from '@/components/Login/Login'
import ResetNotice from '@/components/resetNotice/resetNotice'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/infochange',
    name: 'InfoChange',
    component: InfoChange
  }, {
    path: '/kewordssetting',
    name: 'KeywordsSetting',
    component: KeywordsSetting
  }, {
    path: '/emailsetting',
    name: 'EmailSetting',
    component: EmailSetting
  }, {
    path: '/passwordsetting',
    name: 'PasswordSetting',
    component: PasswordSetting
  }, {
    path: '/phonesetting',
    name: 'PhoneSetting',
    component: PhoneSetting
  }, {
    path: '/myopinion',
    name: ' MyOpinion',
    component: MyOpinion
  }, {
    path: '/analysis',
    name: 'OpinionAnalysis',
    component: OpinionAnalysis
  }, {
    path: '/worning',
    name: 'OpinionWorning',
    component: OpinionWorning
  }, {
    path: '/category',
    name: 'OpinionCategory',
    component: OpinionCategory
  }, {
    path: '/collection',
    name: 'OpinionCollection',
    component: OpinionCollection
  }, {
    path: '/detail',
    name: 'OpinionDetail',
    component: OpinionDetail
  }, {
    path: '/leader',
    name: 'OpinionLeader',
    component: OpinionLeader
  }, {
    path: '/material',
    name: 'OpinionMaterial',
    component: OpinionMaterial
  }, {
    path: '/report',
    name: 'OpinionReport',
    component: OpinionReport
  }, {
    path: '/search',
    name: 'OpinionSearch',
    component: OpinionSearch
  }, {
    path: '/situation',
    name: 'OpinionSituation',
    component: OpinionSituation
  }, {
    path: '/topic',
    name: 'OpinionTopic',
    component: OpinionTopic
  }, {
    path: '/watch',
    name: 'OpinionWatch',
    component: OpinionWatch
  }, {
    path: '/weibo',
    name: 'OpinionWeibo',
    component: OpinionWeibo
  }, {
    path: '/userinfo',
    name: 'userInformation',
    component: userInformation
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/resetnotice',
    name: 'ResetNotice',
    component: ResetNotice
  }]
})
