import React from 'react';
//expecting name and anouncements
export default function(props){
  console.log(props.data.created_on);
  return(
  <div className="notice col-1" onClick={()=>props.history.push(`/notice/${props.data.id}`)}>
    <div className="status"></div>
    <h3>{props.data.title}</h3>
    <p>{new Date(props.data.created_on).toLocaleString()}</p>
        
  </div>
  );
}