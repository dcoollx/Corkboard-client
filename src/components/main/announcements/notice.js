import React from 'react';
import './notice.css';
//expecting name and anouncements
export default function(props){
  return(
  <div className="notice" onClick={()=>props.history.push(`/notice/${props.data.id}`)}>
    <h3>{props.data.title}</h3>
  </div>
  );
}