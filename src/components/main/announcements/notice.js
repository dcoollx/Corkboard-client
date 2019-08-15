import React from 'react';
import showdown from 'showdown';
//expecting name and anouncements
export default function(props){
  let renderer = new showdown.Converter();
  console.log(props.data.created_on);
  return(
  <div className="notice col-1" onClick={()=>props.history.push(`/notice/${props.data.id}`)}>
    <div className="status">{props.data.created_by}</div>
    <h3>{props.data.title}</h3>
    <p>{new Date(props.data.created_on).toDateString()}</p>
    <div class="preview_mini"dangerouslySetInnerHTML={{__html:renderer.makeHtml(props.data.content)}}></div>
        
  </div>
  );
}