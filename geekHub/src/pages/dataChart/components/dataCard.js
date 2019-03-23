import React,{ Component } from 'react';
import '../index.css';
import data from '../../../config/dataCard';
import axios from 'axios';

var dataitem = [];
axios.get("http://mock-api.com/4jzA4LKk.mock/dataCard")
.then((Response)=>{
    dataitem = Response.data;
})
.catch((err)=>{
    console.log(err);
})
class DataCard extends Component{
    renderCard(){
    const renderData=data.map((item,index) => {
            return (
                <div className="dataCard_wrapper" key={index} style={{borderBottom:"4px solid "+item.color,borderTop:"4px solid "+item.color,color:item.color}}>
                <div className="icon_wrapper"> 
                    <img src={item.src} alt="user" />
                    <p>{item.description}</p>
                </div>
                <h1 style={{color:item.color}}>{dataitem[index]}</h1>
            </div>
            )
        });
        return renderData;
    }
    render(){
        return (
            <div className="Header">
               { this.renderCard()}
            </div>
        )    
    }
}

export default DataCard;