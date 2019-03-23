<template>
  <div id="app">
    <drawer width="200px;"
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    :placement="showPlacement"
    :drawer-style="{width: '200px'}">
      <div slot="drawer" class="drawer-left">
        <div class="user-info">
          <div class="avatar" v-if="!!(userInfo && userInfo.logourl)">
            <img :src="'http://web.is8.com.cn:8031/om'+userInfo.logourl" alt="logo">
          </div>
          <div class="desc">
            <h2 class="name">{{userInfo && userInfo.sysname}}</h2>
          </div>
        </div>
        <div class="menu-list-wrapper">
          <ul class="menu-list">
            <li class="menu-item" @click="goToSitution">
              <z-icon type="icon-home"/>
              <span>舆情概况</span>
            </li>
            <li class="menu-item" @click="goToWatch">
              <z-icon type="icon-101" style="color:#ffffff"/>
              <span>舆情监测</span>
            </li>
            <li class="menu-item" @click="goToTopic">
              <z-icon type="icon-star" style="color:#ffffff"/>
              <span>专题舆情</span>
            </li>
            <li class="menu-item" @click="goToCategory">
              <z-icon type="icon-leimupinleifenleileibie2" style="color:#ffffff"/>
              <span>分类舆情</span>
            </li>
            <li class="menu-item" @click="goToReport">
              <z-icon type="icon-baogao-copy" style="color:#ffffff"/>
              <span>舆情报告</span>
            </li>
            <li class="menu-item" @click="goToSearch">
              <z-icon type="icon-fangdajing" style="color:#ffffff"/>
              <span>舆情搜索</span>
            </li>
            <li class="menu-item" @click="goToAnalysis">
              <z-icon type="icon-msnui-report" style="color:#ffffff"/>
              <span>舆情分析</span>
            </li>
          </ul>
        </div>
      </div>

      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <x-header slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        v-if="isShowHeaderAndFooter && isShowHeader"
        >
          <span slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
        </x-header>
        <div>
          <router-view/>
        </div>
        <tabbar slot="bottom" v-if="isShowHeaderAndFooter">
          <tabbar-item class="zhiyun">
            <img slot="icon" src="http://owd9ip8d2.bkt.clouddn.com/logo.png">
          </tabbar-item>
          <tabbar-item link="/watch">
            <img slot="icon" src="http://owd9ip8d2.bkt.clouddn.com/icon-watch.png">
            <span slot="label">监测</span>
          </tabbar-item>
          <tabbar-item link="/analysis">
            <img slot="icon" src="http://owd9ip8d2.bkt.clouddn.com/icon-analysis.png">
            <span slot="label">分析</span>
          </tabbar-item>
          <tabbar-item link="/search">
            <img slot="icon" src="http://owd9ip8d2.bkt.clouddn.com/icon-search.png">
            <span slot="label">搜索</span>
          </tabbar-item>
          <tabbar-item link="/myopinion">
            <img slot="icon" src="http://owd9ip8d2.bkt.clouddn.com/icon-people.png">
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import request from './utils/request'
import { ViewBox, Tabbar, TabbarItem, Drawer, XHeader } from 'vux'
import { mapState } from 'vuex'
import ZIcon from '@/base/ZIcon/ZIcon'

export default {
  name: 'App',
  data () {
    return {
      drawerVisibility: false,
      showModeValue: 'push',
      showPlacement: 'left',
      userInfo: {}
    }
  },
  created () {
    request('http://web.is8.com.cn/om/mpart/self/myInfo?action=getUserInfo').then((res) => {
      this.userInfo = res.data
    })
  },
  mounted () {
  },
  computed: {
    ...mapState({
      route: state => state.RouteModule,
      path: state => state.RouteModule.path
    }),
    isShowHeaderAndFooter () {
      if (this.path === '/login') {
        return false
      }
      return true
    },
    isShowHeader () {
      if (this.path === '/resetnotice') {
        return false
      }
      return true
    },
    title () {
      if (this.path === '/') return '主页'
      if (this.path === '/myopinion') return '我的'
      if (this.path === '/analysis') return '分析'
      if (this.path === '/watch') return '舆情监测'
      if (this.path === '/search') return '搜索'
      if (this.path === '/situation') return '舆情概况'
      if (this.path === '/detail') return '详情'
      if (this.path === '/weibo') return '微博舆情'
      if (this.path === '/topic') return '专题舆情'
      if (this.path === '/category') return '分类舆情'
      // if (this.path === '') return '我的信息'
      if (this.path === '/leader') return '领导舆情'
      if (this.path === '/infochange') return '修改信息'
      if (this.path === '/emailsetting') return '修改邮箱'
      if (this.path === '/passwordsetting') return '修改密码'
      if (this.path === '/phonesetting') return '修改电话'
      if (this.path === '/report') return '我的报告'
      if (this.path === '/material') return '素材库'
      if (this.path === '/collection') return '收藏'
      if (this.path === '/kewordssetting') return '关键词设置'
      return '暂未定义'
    },
    leftOptions () {
      return {
        // showBack: this.route.path !== '/'
        showBack: false
      }
    },
    rightOptions () {
      return {
        showMore: false
      }
    }
  },
  methods: {
    goToSitution () {
      this.drawerVisibility = false
      this.$router.push('/situation')
    },
    goToWatch () {
      this.drawerVisibility = false
      this.$router.push('/watch')
    },
    goToTopic () {
      this.drawerVisibility = false
      this.$router.push('/topic')
    },
    goToCategory () {
      this.drawerVisibility = false
      this.$router.push('/category')
    },
    goToReport () {
      this.drawerVisibility = false
      this.$router.push('/report')
    },
    goToSearch () {
      this.drawerVisibility = false
      this.$router.push('/search')
    },
    goToAnalysis () {
      this.drawerVisibility = false
      this.$router.push('/analysis')
    }
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    Drawer,
    XHeader,
    ZIcon
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, PingFang SC, 'Open Sans', 'Helvetica Neue', sans-serif;
  .weui-tab {
    .weui-tabbar {
      .zhiyun {
        .weui-tabbar__icon {
          padding-top: 4px;
          width: 42px;
          height: 34px;
        }
      }
    }
  }
  .drawer-left {
    background: url('http://owd9ip8d2.bkt.clouddn.com/left-background.jpg') no-repeat left;
    color: #ffffff;
    .user-info {
      margin: 36px 10px 36px 20px;
      display: flex;
      .avatar {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .desc {
        margin-left: 10px;
        .name {
          font-size: 12px;
        }
      }
    }
    .menu-list-wrapper {
      font-size: 18px;
      .menu-list {
        .menu-item {
          height: 54px;
          line-height: 54px;
          text-align: center;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
  
}
</style>
