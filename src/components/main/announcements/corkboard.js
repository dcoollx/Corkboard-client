import React from 'react';
import Comment from './notice';

export default function(props){
  let notices = props.data.map((notice, index)=>{
    return <Comment {...props} key={index} data={notice}/>
   });
  return(
  <div id="corkboard" className="corkboard col-center row-center container">
   {notices}
  </div>);
}