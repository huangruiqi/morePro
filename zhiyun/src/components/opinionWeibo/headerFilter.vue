<template>
  <tab id="filter" :line-width=2 active-color='#fff' custom-bar-width="0" >
    <tab-item class="filter-time">
      <cell
        title="时间"
        @click.native="checkTabActive('showContentTime')"
      ></cell>
      <div class="slide showContentTime" :class="filter.showContentTime?'animate':''">
        <cell :border-intent="false" title="今天"></cell>
        <cell :border-intent="false" title="昨天"></cell>
        <cell :border-intent="false" title="近七天"></cell>
        <cell :border-intent="false" title="近30天"></cell>
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
            <x-button :gradients="['#2d324f', '#2d324f']" class="btn">确定</x-button>
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
          <div class="negative negative3">全部</div>
          <div class="negative negative-1">正面</div>
          <div class="negative negative0">中性</div>
          <div class="negative negative1">负面</div>
          <div class="negative negative2">预警</div>
        </div>
      </div>
    </tab-item>
    <tab-item class="filter-source">
      <cell
        title="来源"
        @click.native="checkTabActive('showContentSource')"
      ></cell>
      <div class="slide" id="source" :class="filter.showContentSource?'animate':''">
         <checklist :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
         <div class="button flex">
           <button class="confirm">确定</button>
           <button class="cancel">取消</button>
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
          <div>时间降序</div>
          <div>时间升序</div>
          <div>热搜排行</div>
        </div>
        <div class="flex other">
          <div class="active-filter">去重：</div>
          <div>去重</div>
          <div>不去重</div>
          <div></div>
        </div>
        <div class="button flex">
           <button class="confirm">确定</button>
           <button class="cancel">取消</button>
         </div>
      </div>
    </tab-item>
    <div class="mask-layer" v-show="filtering.show"></div>
  </tab>
</template>

<script>
import { Tab, TabItem, Cell, Flexbox, FlexboxItem, XButton, Checklist } from 'vux'

export default {
  data () {
    return {
      filter: {},
      startTime: '',
      endTime: '',
      commonList: [ 'China (12)', 'Japan(123)', 'America(123123)' ],
      radioValue: [''],
      filtering: {}
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
    }
  },
  mounted () {
    this.filter = this.$store.state.filter
    this.filtering = this.$store.state.filtering
  }
}
</script>

<style lang="less">
.mask-layer {
  position: fixed;
  z-index: 2;
  top: 90px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .2;
}
#filter {
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
</style>
