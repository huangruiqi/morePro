import React, { Component } from 'react';
import * as echarts from 'echarts/src/echarts';
import 'echarts/src/chart/line';
import 'echarts/src/component/title';
import 'echarts/src/component/tooltip';
import 'echarts/src/component/legend';
import '../index.css'
import axios from 'axios';
import SelectTime from './selectTime';
class LineChart extends Component {
    state = {
        title: {
            text: "数据统计情况",
            subtext: "2018-11-11"
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['用户数', '文章数', '资源数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:[]
        },
        yAxis: {
            type: 'value'
        },
        series: []
    }
    componentDidMount() {
            this.renderData("year",0);
        }
        renderData=(type,time)=>{
            axios.get("http://mock-api.com/4jzA4LKk.mock/lineChart?type="+type+"&time="+time)
            .then((Response)=>{
                // console.log(Response);
                // console.log(Response.data.data);
                Response.data.data.forEach(element => {
                    element["type"] = "line";
                    element["stack"] = "总量";
                    // console.log(element);
                });
               this.setState({
                   xAxis:{
                    ...this.state.xAxis,
                    data:Response.data.time
                   },
                   series:Response.data.data,
                   title:{
                       ...this.state.title,
                       subtext:Response.data.deadtime
                   }
               })
                var myChart = echarts.init(document.getElementById("lineChart"), 'light');
                myChart.setOption(this.state);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    render() {
        return(
            <div className="lineGroup">
                <div className="lineChart" id="lineChart">
                </div>
                <SelectTime getData={this.renderData}/>
            </div>
        )
    }
}
export default LineChart;