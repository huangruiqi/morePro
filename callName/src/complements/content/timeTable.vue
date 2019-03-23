<template>
  <div class="bigContent">
      <div class="timeTitle">
        <span>课表查询</span>
      </div>
      <div class="table">
        <table width="100%" ref="table">
          <tr class="week">
            <th width="4%" style="background-color:#BEC3C7"></th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
            <th>星期六</th>
            <th>星期天</th>
          </tr>
          <tr>
            <td style="background-color:#ECECEC" class="order"><span>1</span><span>2</span></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
          </tr>
          <tr>
            <td style="background-color:#ECECEC" class="order"><span>3</span><span>4</span></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
          </tr>
          <tr>
            <td style="background-color:#ECECEC" class="order"><span>5</span><span>6</span></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
          </tr>
          <tr>
            <td style="background-color:#ECECEC" class="order"><span>7</span><span>8</span></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
          </tr>
          <tr>
            <td style="background-color:#ECECEC" class="order"><span>9</span><span>10</span></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
          </tr>
          <tr>
            <td style="background-color:#ECECEC" class="order"><span>11</span><span>12</span></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
            <td class="middle"></td>
          </tr>
        </table>
      </div> 
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      allInfor: {}
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
  methods: {
    getCowRol(col, row) {
      let noTd =document.getElementsByClassName('middle');
      let i;
      for(i = 0; i < (((col - 1) * 7) + row); i++) {}
      // console.log(i);
      return noTd[i - 1];
    },
    importTable() {
      const use = this;
      use.getCowRol(3, 2);
      let allClass = this.allInfor.information[0].class;
      let information = this.allInfor.information[0];
      let season = this.allInfor.season;
      let dateNow = new Date();
      let dateStart = new Date(season[0], season[1], season[2]-1);
      let distance = Math.ceil((dateNow.getTime() - dateStart.getTime()) / (1000 * 60 * 60 *24));
      let erectWeek = Math.ceil(distance / 7);//为第几周
      let control = 0;
      for(let i = 0; i < allClass.length && allClass[i]; i++) {
        for(let j = 0; j < allClass[i].week.length && allClass[i].week; j++) {
          console.log(distance);
          if(allClass[i].week[j] == erectWeek){  
            console.log(333);
            let tableAdd = "<span>" + allClass[i].classID + "</span><br><span>" + allClass[i].className + "</span><br><span>" + allClass[i].teacher + "</span><br><span>" + allClass[i].room + "</span>";
            for(let k = 0; allClass[i].time[k] && allClass[i]; k++) {
              console.log(allClass[i].time[k][1]+","+allClass[i].time[k][0]);
              use.getCowRol(allClass[i].time[k][1], allClass[i].time[k][0]).innerHTML = tableAdd;
            }  
          }
        }
      }
    }
  },
  components: {

  },
  watch: {
    allInfor() {
      this.importTable();
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
.bigContent {
  width: 100%;
  height: 90%;
  background-color: #DBFCA6;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .timeTitle {
    width: px2rem(26);
    height: px2rem(6);
    background-color: #fff;
    display: flex;
    justify-content: center;
    span {
      font-size: px2rem(5);
      color: #384E69;
      font-weight: 600;
      // text-align: center;
    }
  }
  .table {
    width: 100%;
    height: 95%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: px2rem(4);
    table {
      border-collapse: collapse; 
      width: 98%;
      height: 98%;
      border: px2rem(0.6) solid #E7E7E7;
      color: #777A7B;
      background-color: #F9F9F9;
      table-layout:fixed ;
      tr {
        height: 14%;
        border: px2rem(0.6) solid #E7E7E7;
        th {
          border: px2rem(0.6) solid #E7E7E7;
          background-color: #ECECEC;
        }
        td {
          border: px2rem(0.6) solid #E7E7E7;
        }
        .middle {
          span {
            display:block;
            text-align:center;
            color: #777A7B;
            font-size: px2rem(3);
            line-height: px2rem(0.01);
          }
        }
        .order {
          border: px2rem(0.6) solid #E7E7E7;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          background-color:#ECECEC;
          height: 100%;
          span {
            color: #777A7B;
          }
        }
      }
      .week {
        height: px2rem(10);
      }
    }
  }
}
</style>
