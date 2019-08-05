import React from 'react';
import Comments from './comments';
import {testComments} from '../../../../test/demoData';


export default function(props){
  //todo, make this a fetch to get commets from server, for now using testdata
  let comments = testComments(props.notice.id).map((comment, index)=>{
    return (<Comments key={index} content={comment.content} by={comment.created_by}/>);
  });
  return(
  <div>
    <h2>{props.notice.title}</h2>
    <p>{props.notice.content}</p>
    <p>by: <i>{props.notice.created_by}</i></p>
    {comments}
    <button onClick={(e)=>props.history.push('/')}>Go Back</button>
  </div>);
}