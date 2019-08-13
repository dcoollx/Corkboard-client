import React from 'react';


export default function(props){
  return(
  <div className="comment">
    <p className="comment-content">{props.content}</p>
    <p className="by">{props.by}</p>
  </div>);
}