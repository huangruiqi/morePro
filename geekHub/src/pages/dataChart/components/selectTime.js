import React, { Component } from 'react';
import { Drawer,DatePicker,Select } from 'antd';
import '../index.css';

const Option = Select.Option;
const {MonthPicker,WeekPicker} = DatePicker;
class SelectTime extends Component {
    state = { 
        visible: false,
        type:null,
        title:null
    };
    handleChange = (value) => {
        if (value=="月") {
            this.setState({
                type:"month",
                visible:true,
                title:"您希望获取哪一年的数据？（以月为单位显示）"
            })
        }else if(value=="周"){
            this.setState({
                type:"week",
                visible:true,
                title:"您希望获取第几月的数据？（以周为单位显示）"
            })
        }else if(value=="年"){
            this.setState({
                type:"year",
                visible:false
            })
            this.props.getData("year",0);
        }else if(value=="天"){
            this.setState({
                type:"day",
                visible:true,
                title:"您希望获取第几周的数据？（以天为单位显示）"
            })
        }
        
    }
    monthChange=(date,dateString)=>{
        this.props.getData("week",dateString);
        this.setState({
            visible:false
        })
    }
    weekChange=(date,dateString)=>{
        this.props.getData("day",dateString);
        this.setState({
            visible:false
        })
    }
    yearChange=(dateString,date)=>{
        this.props.getData("month",dateString);
        this.setState({
            visible:false
        })
    }
    handleClose=()=>{
        this.setState({
            visible:false
        })
    }
    renderDrawer=()=>{
        switch (this.state.type){
            case "week":
            return(
                <MonthPicker size="default" onChange={this.monthChange} placeholder="选择月份" /> 
            );
            case "day":
            return(
                <WeekPicker size="default" onChange={this.weekChange} placeholder="选择周" />
            )
            case "month":
            return (
                <Select defaultValue="请选择年" onChange={this.yearChange}>
                    <Option value="2018">2018年</Option>
                    <Option value="2017">2017年</Option>
                    <Option value="2016">2016年</Option>
                </Select>
            ) 
        }
    }
    render() {
        return (
        <div>
            <Select className="selectTime" defaultValue="年" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="年">年</Option>
                <Option value="月">月</Option>
                <Option value="周">周</Option>
                <Option value="天">天</Option>
            </Select>
            <Drawer
                title={this.state.title}
                placement="top"
                closable={true}
                onClose={this.handleClose}
                visible={this.state.visible}
                style={{
                    height: "30px",
                    display: "flex",
                    justifyContent: "center"
                }}>
               {this.renderDrawer()}
            </Drawer>
        </div>
        )
    }
}
export default SelectTime