import React from "react";
import ReactDOM from "react-dom";
import {testNotices} from '../../../../test/demoData';
import NoticePage from "./noticePage";
import Comments from './comments';

it('renders Notice page',() => {
  const div = document.createElement('div');
  ReactDOM.render(<NoticePage match={{params:{id:0}}} notice={testNotices[0]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
  });
  it('renders comments',()=>{
    const div = document.createElement('div');
  ReactDOM.render(<Comments content="hello" by="david"/>, div);
  ReactDOM.unmountComponentAtNode(div);
  });