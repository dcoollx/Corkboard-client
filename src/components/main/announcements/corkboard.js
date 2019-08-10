import React from 'react';
import SubSection from './subSection';

export default function(props){
  return(
  <div>
    <SubSection {...props} name="ORG" announcements ={props.data.filter((notice)=>notice.level === 1)}/>
    <SubSection {...props} name="Department" announcements ={props.data.filter((notice)=>notice.level === 2)}/>
    <SubSection {...props} name="My Team" announcements ={props.data.filter((notice)=>notice.level === 3)}/>
  </div>);
}