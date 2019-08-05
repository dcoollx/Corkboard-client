import React from 'react';


export default function(props){
  return(
  <div>
    <p>"{props.content}"</p>
    <p>{props.by}</p>
  </div>);
}