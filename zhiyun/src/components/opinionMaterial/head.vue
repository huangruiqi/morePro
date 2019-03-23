<template>
  <tab id="headfilter" :line-width=2 active-color='#fff'>
    <tab-item class="filter-time">
      <cell
        title="时间"
        @click.native="checkTabActive('showContentTime')"
      ></cell>
      <div class="slide showContentTime" :class="filter.showContentTime?'animate':''">
        <cell title="今天" :class="{classA:isOk[0].show}" @click.native="checkTime(0);checkTabActive('showContentTime')" ></cell>
        <cell title="昨天" :class="{classA:isOk[1].show}" @click.native="checkTime(1);checkTabActive('showContentTime')"></cell>
        <cell title="近七天" :class="{classA:isOk[2].show}" @click.native="checkTime(2);checkTabActive('showContentTime')"></cell>
        <cell title="近30天" :class="{classA:isOk[3].show}" @click.native="checkTime(3);checkTabActive('showContentTime')"></cell>
        <flexbox style="border-top: 1px solid #D9D9D9;">
          <flexbox-item :span="1.8">自定义</flexbox-item>
          <flexbox-item :span="2.3">
            <input type="number" class="time-select" placeholder="开始时间" v-model="startTime">
          </flexbox-item>
          <flexbox-item :span="1" style="text-align: center">到</flexbox-item>
          <flexbox-item :span="2.3">
            <input type="number" class="time-select" placeholder="结束时间" v-model="endTime">
          </flexbox-item>
          <flexbox-item :span="2.3">
            <x-button :gradients="['#2d324f', '#2d324f']" class="btn" @click.native="changeFilter(filterAll);checkTabActive('showContentTime')">确定</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </tab-item>
    <tab-item class="filter-trend">
      <cell
        title="倾向"
        @click.native="checkTabActive('showContentTrend')"
      ></cell>
      <div class="slide trend" :class="filter.showContentTrend?'animate':''">
        <div class="negative-list">
          <div class="negative negative3" @click="checkNeg(3);checkTabActive('showContentTrend')">全部</div>
          <div class="negative negative-1" @click="checkNeg(-1);checkTabActive('showContentTrend')">正面</div>
          <div class="negative negative0" @click="checkNeg(0);checkTabActive('showContentTrend')">中性</div>
          <div class="negative negative1" @click="checkNeg(1);checkTabActive('showContentTrend')">负面</div>
          <div class="negative negative2" @click="checkNeg(2);checkTabActive('showContentTrend')">预警</div>
        </div>
      </div>
    </tab-item>
    <tab-item class="filter-source">
      <cell
        title="来源"
        @click.native="checkTabActive('showContentSource')"
      ></cell>
      <div class="slide" id="source" :class="filter.showContentSource?'animate':''">
          <ul class="sourceList">
            <!-- <li v-for="(source,index) in sourceList" :key="index">
              <input type="radio" name="radio" value='{source.sourceName}'>{{source.sourceName}}{{source.sourceNum}}
            </li> -->
            <li><input type="radio" name="radio" value="全部" v-model="SourceVal">全部来源(4444455)</li>
            <li><input type="radio" name="radio" value="微博" v-model="SourceVal">微博(4444455)</li>
            <li><input type="radio" name="radio" value="新闻" v-model="SourceVal">新闻(4444455)</li>
            <li><input type="radio" name="radio" value="论坛" v-model="SourceVal">论坛(4444455)</li>
            <li><input type="radio" name="radio" value="微信" v-model="SourceVal">微信(4444455)</li>
            <li><input type="radio" name="radio" value="微博" v-model="SourceVal">微博(4444455)</li>
            <li><input type="radio" name="radio" value="APP" v-model="SourceVal">APP(4444455)</li>
            <li><input type="radio" name="radio" value="境外" v-model="SourceVal">境外(4444455)</li>
            <li><input type="radio" name="radio" value="视频" v-model="SourceVal">视频(4444455)</li>
            <li><input type="radio" name="radio" value="其他" v-model="SourceVal">其他(4444455)</li>
          </ul>
         <!-- <checklist :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist> -->
         <div class="button flex">
           <button class="confirm" @click="checkTabActive('showContentSource');checkSource()">确定</button>
           <button class="cancel" @click="checkTabActive('showContentSource')">取消</button>
         </div>
      </div>
    </tab-item>
    <tab-item class="filter-other">
      <cell
        title="其他"
        @click.native="checkTabActive('showContentOther')"
      ></cell>
      <div class="slide" :class="filter.showContentOther?'animate':''">
        <div class="flex other">
          <div class="active-filter">排序：</div>
          <div :class="{classA:byOrder[0].show}" @click="checkOrder('timedown',0)">时间降序</div>
          <div :class="{classA:byOrder[1].show}" @click="checkOrder('timeup',1)">时间升序</div>
          <div :class="{classA:byOrder[2].show}" @click="checkOrder('hot',2)">热搜排行</div>
        </div>
        <div class="flex other">
          <div class="active-filter">去重：</div>
          <div :class="{classA:bySimiler[0].show}" @click="checkSimiler('0',0)">去重</div>
          <div :class="{classA:bySimiler[1].show}" @click="checkSimiler('1',1)">不去重</div>
          <div></div>
        </div>
        <div class="button flex">
           <button class="confirm" @click="checkTabActive('showContentOther'); checkOther()">确定</button>
           <button class="cancel" @click="checkTabActive('showContentOther')">取消</button>
        </div>
      </div>
    </tab-item>
  </tab>
</template>

<script>
import { Tab, TabItem, Cell, Flexbox, FlexboxItem, XButton, Checklist } from 'vux'
export default {
  data () {
    return {
      filter: {},
      filterAll: {},
      startTime: '',
      endTime: '',
      sourceList: [
        {
          sourceName: '全部',
          sourceNum: '112233'
        },
        {
          sourceName: '微博',
          sourceNum: '112233'
        },
        {
          sourceName: '新闻',
          sourceNum: '112233'
        },
        {
          sourceName: '论坛',
          sourceNum: '112233'
        },{
          sourceName: '微信',
          sourceNum: '112233'
        },{
          sourceName: '微博',
          sourceNum: '112233'
        },{
          sourceName: 'APP',
          sourceNum: '112233'
        },{
          sourceName: '境外',
          sourceNum: '112233'
        },{
          sourceName: '视频',
          sourceNum: '112233'
        },{
          sourceName: '其他',
          sourceNum: '112233'
        }
      ],
      SourceVal: '全部',
      isOk: [
        {
          "show": false
        },
        {
          "show": false
        },
        {
          "show": false
        },
        {
          "show": false
      }],
      byOrder: [
        {
          "show": false
        },
        {
          "show": false
        },
        {
          "show": false
        },
        {
          "show": false
      }],
      bySimiler: [
        {
          "show": false
        },
        {
          "show": false
        }
      ]
    }
  },
  components: {
    Tab,
    TabItem,
    Cell,
    Flexbox,
    FlexboxItem,
    XButton,
    Checklist
  },
  methods: {
    checkTabActive (filter) {
      return this.$store.commit('SET_HEADER_FILTER', filter)
    },
    change (val, label) {
      console.log('change', val, label)
      console.log(val[0].length)
    },
    checkTime (index) {
      for (let i = 0; i < this.isOk.length; i++) {
        this.isOk[i].show = false
      }
      this.isOk[index].show = true
      if (index === 0) {
        this.filterAll.datetag = 'today'
      } else if (index === 1) {
        this.filterAll.datetag = 'yestoday'
        console.log(this.filterAll)
      } else if (index === 2) {
        this.filterAll.datetag = '7day'
      } else if (index === 3) {
        this.filterAll.datetag = '30day'
      } 
      return this.$store.commit('SET_HEAD_M', this.filterAll)
    },
    checkNeg (neg) {
      if (neg === 3) {
        this.filterAll.neg = 'all'
      } else if (neg === -1) {
        this.filterAll.neg = '-1'
      } else if (neg === 0) {
        this.filterAll.neg = '0'
      } else if(neg === 1) {
        this.filterAll.neg = '1'
      } else if(neg === 2) {
        this.filterAll.neg = '2'
      }
      return this.$store.commit('SET_HEAD_M', this.filterAll)
    },
    checkSource () {
      this.filterAll.carry = this.SourceVal
      console.log(this.filterAll)
      return this.$store.commit('SET_HEAD_M', this.filterAll)
    },
    checkOrder (order,index) {
      this.filterAll.order = order
      for (let i = 0; i < this.byOrder.length; i++) {
        this.byOrder[i].show = false
      }
      this.byOrder[index].show = true
    },
    checkSimiler (similer,index) {
      this.filterAll.similer = similer
      for (let i = 0; i < this.bySimiler.length; i++) {
        this.bySimiler[i].show = false
      }
      this.bySimiler[index].show = true
    },
    checkOther () {
      return this.$store.commit('SET_HEAD_M', this.filterAll)
    },
    changeFilter (filterAll){
      return this.$store.commit('SET_HEAD_M', filterAll)
    }
  },
  mounted () {
    this.filter = this.$store.state.filter
    this.filterAll = this.$store.state.filterAll
  }
}
</script>

<style lang="less" scoped>
#headfilter {
  position: relative;
  background-color: #3e4464;
  .weui-cell {
    padding: 0;
  }
  .showContentTime {
    padding-left: 40px;
  }
  .slide {
    position: absolute;
    z-index: 99;
    top: 42px;
    left: 0;
    width: 100%;
    text-align: left;
    text-indent: 0;
    background-color: #fff;
    color: #aaa;
  }
  .time-select {
    width: 150/2px;
    height: 38/2px;
    border: 1px solid #aaa;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
  .btn {
    width: 94/2px;
    height: 26px;
    font-size: 13px;
  }
  .trend {
    height: 92/2px;
  }
  .sourceList{
    width: 100%;
    li{
      width: 40%;
      display: inline-block;
      margin-left:20px;
    }
  }
  .flex {
    display: flex;
    justify-content: space-around;
  }
  .negative-list {
    .flex;
    margin-top: 14px;
    line-height: 20px;
    height: 40/2px;
  }
  .negative {
    width: 100/2px;
    height: 38/2px;
  }
  #source {
    .weui-check_label {
      margin-top: 7px;
      padding-left: 10px;
      float: left;
      width: 40%;
      &:first-child,
      &:nth-child(2) {
        margin-top: 20px;
      }
      &:before,
      &:after {
        border: 0;
      }
    }
    .weui-cells {
      &:before,
      &:after {
        border: 0;
      }
    }
  }
  .button {
    margin: 15px 0 5px;
    button {
      width: 224/2px;
      height: 32px;
      border-radius: 8px;
    }
  }
  .confirm {
    background-color: #2d324f;
    color: #fff;
  }
  .cancel {
    background-color: #fff;
    border: 1px solid #2d324f;
    color: #2d324f;
  }
  .filter-other {
    color: #a8a8a8;
    .other {
      box-sizing: border-box;
      padding-left: 40px;
      div {
        width: 25%;
      }
    }
  }
  .active-filter {
    color: #000;
  }
}
input[type='number'] {
    -moz-appearance: textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
::-webkit-input-placeholder {
   color: #bdbdbd;
}
.shade{
    position:absolute;
    z-index: 10;
    background: rgba(0,0, 0, 0.2);
    width:100%;
    height:500px;
}
.classA{
    color: black
}
</style>
