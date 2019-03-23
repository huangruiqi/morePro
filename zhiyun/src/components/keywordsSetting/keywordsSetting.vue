<template>
<div>
  <div class="keywords-setting">
    <img src="../../assets/images/keywordsSetting.png" alt="" id="logo" @click="showHideOnBlur=true">
    <form id="keywordsFrom" enctype ="multipart/form-data">
      <div>
        <label for="keywords">主题词</label><br>
        <textarea type="text" id="keyWords" name="keyWords"  placeholder="核心词汇，例如时间的名称、地域、人名、产品名称、公司企业名称等(不能为空)" required="required">
        </textarea>
        <img src="../../assets/images/warn.png" alt="" class="icon" v-show="iconValue">
      </div>
      <div>
        <label for="associated-words1">关联词1</label><br>
        <textarea type="text" id="associatedWords1" name="associatedWords1" placeholder="描述主题词的词汇。(可以为空)">
        </textarea>
      </div>
      <div>
        <label for="associated-words2">关联词2</label><br>
        <textarea type="text" id="associatedWords2" name="associatedWords2" placeholder="描述“主题词”与“关联词1”的词汇。(可以为空)">
        </textarea>
      </div>
      <div>
        <label for="exclusive-words">排除词</label><br>
        <textarea type="text" id="exclusiveWords" name="exclusiveWords" placeholder="排除歧义词或不相关的词汇、容易产生误解的词汇。(可以为空)">
        </textarea>
      </div>
      <div class="button">
        <p id="confirm" @click="confirm">确定</p>
      </div>
    </form>
  </div>
  <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="../../assets/images/SamllkeywordsSetting.png" alt="" class="smallPic">
          <p><span>主题词：</span><span class="place">北京</span><span>昌平</span></p>
          <p><span>关联词1：</span><span>暴雨</span><span>冰雹</span><span>暴雪</span></p>
          <p><span>关联词2：</span><span>预警</span><span>受灾</span><span>伤亡</span></p>
          <p><span>排除词：</span><span class="place">暴雪</span><span>保险 （歧义词）</span></p>
          <p class="explain">系统会匹配舆情信息中出现的主题词（北京或昌平），并且包含关联词1（暴雨或冰雹或暴雪），包含关联词2（预警或受灾或伤亡）的数据，其中不包含配初次（暴雪保险）。 </p>
          <p class="result">(北京或昌平)  与  (暴雪或暴雪)  与  (预警或受灾或伤亡)  排除  (暴雪保险)</p>
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
</div>

</template>
<script type="text/ecmascript-6">
import { Box, Icon, XDialog, TransferDomDirective as TransferDom } from 'vux'
export default {
  name: 'keywordsSetting',
  data () {
    return {
      iconValue: false,
      showHideOnBlur: false
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Box,
    Icon,
    XDialog
  },
  methods: {
    confirm () {
      let from = document.getElementById('keywordsFrom')
      let data = new FormData(from[0])
      let keyValue = document.getElementById('keyWords').value
      console.log(data)
      if (keyValue === '') {
        this.iconValue = true
      } else {
        this.iconValue = false
        fetch('aa', {
          credentials: 'include',
          method: 'POST',
          body: data
        }).then(res => {
          console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-demo {
  .img-box {
    width: 260px;
    height: 350px;
    overflow: hidden;
    padding-top: 10px;
    padding-left: 19px;
    padding-right: 32px;
    text-align: left;
    font-size: 0.75rem;
    .smallPic{
      width: 17px;
      height: 16px;
    }
    p {
      letter-spacing: 1.8px;
      line-height: 19px;
      span {
        margin-right: 13px;
      }
      .place {
        margin-left: 8px;
      }
    }
    .explain {
      margin-top: 25px;
      letter-spacing: 2px;
    }
    .result {
      margin-top: 25px;
      letter-spacing: 2px;
    }
  }
}
.keywords-setting {
  width: 87.2%;
  height: 565px;
  position: relative;
  padding-top: 23px;
  padding-left: 6.4%;
  padding-right: 6.4%;
  #logo{
    width: 15px;
    height: 15px;
    position: absolute;
    right:2%;
    top:-30px;
    z-index:100
  }
  label {
    width: 87.3%;
    font-size: 15px;
    color: #000;
  }
  textarea {
    width: 97%;
    height: 36px;
    margin-top: 14px;
    margin-bottom: 17px;
    padding-left: 9px;
    line-height: 36px;
    overflow: hidden;
    border: #d2d2d2 1px solid;
    resize: none;
  }
  #keyWords{
    line-height: 18px;
  }
  #exclusiveWords {
    line-height: 18px;
  }
  .icon {
    width: 20px;
    height:20px;
    position: absolute;
    top: 70px;
    left: 87.2%;
    z-index: 100;
  }
  #confirm {
    width: 155px;
    height: 35px;
    padding-top: 10px;
    position: relative;
    top: 29px;
    left: 25%;
    font-size: 17px;
    text-align: center;
    color: #fff;
    background-color: #2d324f;
    border-radius: 8px;
  }
}
</style>
