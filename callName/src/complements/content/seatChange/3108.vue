<template>
  <div class="seatPosition">
      <!-- <table class="3108" width=49%>
          <tr v-for="m in 10">
              <td v-for="n in 8" @click="apearPerson($event, (m-1)*8 + n - 1) " ref="geZi">

              </td>
          </tr>
      </table> -->
      <!-- <table class="3108" width=49%>
          <tr v-for="m in 10" >
              <td v-for="n in 8" @click="apearPerson($event, (m-1)*8 + n - 1 + 80) " ref="geZi"></td>
          </tr>
      </table> -->
      <!-- <table class="2208" width=21%>
          <tr v-for="m in 10">
              <td v-for="n in 3" @click="apearPerson($event, (m-1)*3 + n - 1) " ref="geZi" width=100%>

              </td>
          </tr>
      </table>
      <table class="2208" width=25%>
          <tr v-for="m in 10" >
              <td v-for="n in 4" @click="apearPerson($event, (m-1)*4 + n - 1 + 30) " ref="geZi" width=100%></td>
          </tr>
      </table>
      <table class="2208" width=21%>
          <tr v-for="m in 10" >
              <td v-for="n in 3" @click="apearPerson($event, (m-1)*3 + n - 1 + 70) " ref="geZi" width=100%></td>
          </tr>
      </table> -->
      <!-- <table class="2201" width=30%>
          <tr v-for="m in 8">
              <td v-for="n in 6" @click="apearPerson($event, (m-1)*6 + n - 1) " ref="geZi" width=100%>

              </td>
          </tr>
      </table>
      <table class="2201" width=35%>
          <tr v-for="m in 10" >
              <td v-for="n in 8" @click="apearPerson($event, (m-1)*8 + n - 1 + 48) " ref="geZi" width=100%></td>
          </tr>
      </table>
      <table class="2201" width=30%>
          <tr v-for="m in 8" >
              <td v-for="n in 6" @click="apearPerson($event, (m-1)*6 + n - 1 + 128) " ref="geZi" width=100%></td>
          </tr>
      </table> -->
      <table class="3101" width=30%>
          <tr v-for="m in 8">
              <td v-for="n in 6" @click="apearPerson($event, (m-1)*6 + n - 1) " ref="geZi" width=100%>

              </td>
          </tr>
      </table>
      <table class="3101" width=35%>
          <tr v-for="m in 10" >
              <td v-for="n in 8" @click="apearPerson($event, (m-1)*8 + n - 1 + 48) " ref="geZi" width=100%></td>
          </tr>
      </table>
      <table class="3101" width=30%>
          <tr v-for="m in 8" >
              <td v-for="n in 6" @click="apearPerson($event, (m-1)*6 + n - 1 + 128) " ref="geZi" width=100%></td>
          </tr>
      </table>
  </div>
</template>

<script type="text/ecmascript-6">
import path from '../../../assets/img/student.png'
export default {
  data() {
    return {
        path: path
    }
  },
  props: ['allInfor'],
  methods: {
      apearPerson(e, index) {
          let that = this;
          let information = this.allInfor.information[0];
          let a = this.$refs.geZi;
          for (let i = 0; i < a.length; i++) {
              a[i].innerHTML = "";
          }
          this.$refs.geZi[index].innerHTML = '<img src="'+this.path+'" class="ren"/>';
          if(that.allInfor.information) {
            this.$axios.get("http://localhost:8080/api/seat",{
                params: {
                    id: information.id,
                    name: information.name,
                    index: index
                }
            })
            .then(res => {
                console.log("成功");
            })
            .catch(error => {
                console.log(error);
            }) 
          }
      }
  },
  components: {

  }
}
</script>

<style lang="scss">
@import "../../../styles/main";
@import "../../../styles/common";
.seatPosition {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    table {
        // width: 49%;
        // min-width: 10%;
        height: 80%;
        border: 1px solid black;
        border-collapse: collapse; 
        table-layout:fixed ;
        cursor: pointer;
        tr {
            // border: 1px solid red;
            height: 10%;
            display: flex;
            td {
                float: left;
                // border: 1px solid red;
                // width: 12.5%;
                background: url('../../../assets/img/chair.png') no-repeat center center;
                background-size: 140%;
                display: flex;
                align-items: center;
                .ren {
                    width: px2rem(10) ;
                    height: px2rem(20);
                }
            }
        }
    }
}
</style>
