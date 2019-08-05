import React from 'react';
import SubSection from './subSection';

export default function(props){
  return(
  <div>
    <SubSection {...props} name="ORG" announcements ={props.data}/>
    <SubSection {...props} name="Department" announcements ={props.data}/>
    <SubSection {...props} name="My Team" announcements ={props.data}/>
  </div>);
}