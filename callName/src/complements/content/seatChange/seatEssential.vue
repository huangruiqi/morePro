<template>
  <div class="bigContent">
    <div class="board">
      <span class="boardSpan">面向对象程序设计</span>
    </div>
    <img src="../../../assets/img/teacher.png" alt="" class="teacher">
    <div class="classroom">
      <threeF :allInfor='allInfor' :classroom='classroom'></threeF>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import threeF from './3108'
export default {
  data() {
    return {
      allInfor: {},
      classroom: this.$route.query.classroom
    }
  },
  created() {
    this.$axios.get("http://localhost:8080/api/information")
    .then(res => {
      this.allInfor = res.data;
    })
    .catch(error => {
      console.log(error);
    })
  },
  components: {
    threeF
  }
}
</script>

<style lang="scss">
@import "../../../styles/main";
@import "../../../styles/common";
@media screen and (max-width: 380px) {
  .bigContent {
    width: 100%;
    height: 90%;
    background: url('../../../assets/img/seatBack2.jpg') no-repeat center top;
    background-size: 80%;
    background-color: #DBFCA6;
  }
  .board {
    display: none;
  }
}
@media screen and (max-width: 670px) and (min-width: 381px){
  .classroom {
    width: px2rem(210);
    height: px2rem(550);
    background-color: #92B178;
    transform: rotateX(70deg);
    transform-origin: center bottom;
    position: absolute;
    top: -240%;
  }
}
@media screen and (min-width: 671px) {
  .classroom {
    width: px2rem(205);
    height: px2rem(306);
    background-color: #92B178;
    transform: rotateX(56deg);
    transform-origin: center bottom;
    position: absolute;
    top: -103%;
  }
}
@media screen and (min-width: 560px) {
  .bigContent {
    width: 100%;
    height: 90%;
    background: url('../../../assets/img/seatBack.jpg') no-repeat center top;
    background-size: 80%;
    background-color: #DBFCA6;
    perspective: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .board {
      width: px2rem(80);
      height: px2rem(20);
      background-color: #53672A;
      border-radius: 10%;
      border: px2rem(2) solid #BFBFBF;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: px2rem(5);
        color: white;
        font-weight: 600;
      }
    }
    .teacher {
      width: px2rem(20);
      z-index: 100;
      margin-top: -2%;
    }
  }
}
</style>
