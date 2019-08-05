import React from 'react';
import Notice from './notice';
//expecting name and anouncements
export default function(props){
  let announcements = props.announcements.map((data,index)=>{
    return (<Notice {...props} id = {data.id} key={index} data={data}/>);
  });
  return(
  <div className="container col-full">
    <h2 className="col-full">{props.name}</h2>
    {announcements}
  </div>);
}