import React,{ Component } from 'react';
import * as echarts from 'echarts/src/echarts';
import 'echarts/src/chart/pie';
import 'echarts/src/component/title';
import 'echarts/src/component/tooltip';
import '../index.css'
class PieChart extends Component{
    componentDidMount(){
        const option = this.props.data;
        var myChart = echarts.init(document.getElementById(this.props.id),'light');
        myChart.setOption(option);
    }
    render(){
        return (
            <div id={this.props.id} className="pieChart"></div>
        )
    }
}

export default PieChart;