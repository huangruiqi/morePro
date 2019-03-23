import React, { Component } from 'react';
import DataCard from './components/dataCard';
import PieChart from './components/pieChart';
import BarChart from './components/barChart';
import LineChart from './components/lineChart';
import axios from 'axios';

import './index.css';

var articleData,fileData,barData;
articleData = {
  series: [
    {
      name: '文章比例',
      type: 'pie',
      radius: '60%',
      data: []
    }
  ],
  title: {
    text: "文章分布情况",
    subtext: "",
    x: 'center'
  },
  tooltip : {
    show:true,
    trigger: 'item',
    //a表示系列名,b表示去域名,C合并数值
    formatter: "{b} : <br/>{c} ({d}%)",
  }
};
  fileData = {
    series: [
      {
        name: '资源比例',
        type: 'pie',
        radius: '60%',
        data: []
      }
    ],
    title: {
      text: "资源分布情况",
      subtext: "",
      x: 'center'
    },
    tooltip : {
      show:true,
      trigger: 'item',
      //a表示系列名,b表示去域名,C合并数值
      formatter: "{b} : <br/>{c} ({d}%)",
    }
  };
  function getPieData(type,typeData){
    axios.get("http://mock-api.com/4jzA4LKk.mock/"+type)
    .then((Response)=>{
      typeData.series[0].data = Response.data.data;
      typeData.title.subtext = Response.data.deadtime;
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  function getBarData(){
    axios.get("http://mock-api.com/4jzA4LKk.mock/barData")
    .then((Response)=>{
      barData = Response.data;
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  getPieData("articleData",articleData);
  getPieData("articleData",fileData);
  getBarData();
class DataChart extends Component {  
  render() {
    return (
      <div>
        <DataCard />
        <div className="chartsGroup">
          <PieChart id="articlePie" data={articleData} />
          <PieChart id="filePie" data={fileData } />
          <BarChart id="barChart" data={ barData }/>
        </div>
        <LineChart />
      </div>
    )
  }
}

export default DataChart;