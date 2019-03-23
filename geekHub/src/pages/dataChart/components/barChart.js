import React,{ Component } from 'react';
import * as echarts from 'echarts/src/echarts';
import 'echarts/src/chart/bar';
import 'echarts/src/component/title';
import 'echarts/src/component/tooltip';
import 'echarts/src/component/legend';
import '../index.css'

var barData;
class BarChart extends Component {
    componentDidMount(){
        // var data = this.props.data;
        // const option = {
        //     tooltip : {
        //         trigger: 'axis',
        //         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //             type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        //         }
        //     },
        //     legend: {
        //         data: ['文章','资源']
        //     },
        //     grid: {
        //         left: '3%',
        //         right: '4%',
        //         bottom: '3%',
        //         containLabel: true
        //     },
        //     xAxis:  {
        //         type: 'value'
        //     },
        //     yAxis: {
        //         type: 'category',
        //         data: data.category,
        //         margin:"15px"
        //     },
        //     series: [
        //         {
        //             name: '文章',
        //             type: 'bar',
        //             barWidth: 20,
        //             stack: '总量',
        //             label: {
        //                 normal: {
        //                     show: true,
        //                     position: 'insideRight'
        //                 }
        //             },
        //             data: data.article
        //         },
        //         {
        //             name: '资源',
        //             type: 'bar',
        //             barWidth:20,
        //             stack: '总量',
        //             label: {
        //                 normal: {
        //                     show: true,
        //                     position: 'insideRight'
        //                 }
        //             },
        //             data: data.file
        //         }
        //     ]
        // }
        // var myChart = echarts.init(document.getElementById(this.props.id),'light');
        // myChart.setOption(option);
    }
    render(){
        return (
            <div id={this.props.id} className="barChart"></div>
        )
    }
}
export default BarChart;