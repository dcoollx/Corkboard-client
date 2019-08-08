import React from 'react';
import './notice.css';
//expecting name and anouncements
export default function(props){
  console.log(props.data.created_on);
  return(
  <div className="notice" onClick={()=>props.history.push(`/notice/${props.data.id}`)}>
    <h3>{props.data.title}</h3>
    <p>{new Date(props.data.created_on).toLocaleString()}</p>
        
  </div>
  );
}