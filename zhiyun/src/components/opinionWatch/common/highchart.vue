<template>
    <div id="chart">
	</div>
</template>
<script>
//import {highchart} from '../js/highcharts.js'
import HighCharts from "highcharts";
import request from "@/utils/request";
var chartData = new Array();
export default {
  name: "watchChart",
  data() {
    return {
      container: "chart"
    };
  },
  mounted() {
    request(
      "http://web.is8.com.cn/om/mpart/echart/echartDo?action=yqzcChart"
    ).then(res => {
      chartData = res.data.series;
      var options = {
        credits: {
          enabled: false
        },
        chart: {
          type: "spline",
          inverted: false
        },
        title: {
          text: " "
        },
        subtitle: {
          text: " "
        },
        xAxis: {
          reversed: false,
          title: {
            enabled: true,
            text: ""
          },
          labels: {
            formatter: function() {
              return this.value + "";
            }
          },
          maxPadding: 0.05,
          showLastLabel: true
        },
        yAxis: {
          title: {
            text: ""
          },
          labels: {
            formatter: function() {
              return this.value + "";
            }
          },
          lineWidth: 2,
          tickPixelInterval: 10
        },
        legend: {
          enabled: false
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br/>",
          pointFormat: "x:{point.x}<br/> y:{point.y}"
        },
        plotOptions: {
          spline: {
            marker: {
              enable: false
            }
          }
        },
        legend: {
          //图例
          layout: "vertical", //图例显示的样式：水平（horizontal）/垂直（vertical）
          // backgroundColor: '#ffc', //图例背景色
          align: "right", //图例水平对齐方式
          verticalAlign: "top", //图例垂直对齐方式 
          x: 0, //相对X位移
          y: 0, //相对Y位移
          floating: false //设置可浮动
        },
        series: [
          {
            name: chartData[0].name,
            data: chartData[0].data
          },
          {
            name: chartData[1].name,
            data: chartData[1].data
          },
          {
            name: chartData[2].name,
            data: chartData[2].data
          }
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      };
      HighCharts.chart(this.container, options);
    });
  }
};
</script>
<style scoped>
#chart {
  width: 100%;
  height: 150px;
}
</style>
