import React from 'react';
import token_service from '../../services/token.service';
import Api from '../../services/api.service';
//import {Link, NavLink} from 'react-router-dom';

export default class NewNotice extends React.Component{
  state = {
    hasError:false,
    err:null
  }
  handleSubmit=(form)=>{
    let [title, content] = form;
    title = title.value;
    content = content.value;//shave off form element
    let options = {
      method:'POST',
      headers: new Headers({
        'content-type':'application/json',
        'Authorization':'bearer ' + token_service.getAuthToken()
      }),
      body: JSON.stringify({title,content,created_by:1})
    };
    Api.doFetch('notices',options).then((resp)=>{
      this.props.history.push('/');
    }).catch(err=>{
      this.setState({hasError:true,err});
    });
  }
  preview = (text)=>{
    document.getElementById('preview').value = text;

  }
  render(props){
  return(
    <div>
      <form onSubmit={(e)=>{
        e.preventDefault();
        this.handleSubmit(e.target);
        }} onReset={(e)=>this.props.history.push('/')}>
        <label htmlFor="title">title</label>
        <input type="text" id="title" name="title" placeholder="title"/><br/>
        <label htmlFor="content">content</label>
        <textarea id="content" name="content" onChange={(e)=>this.preview(e.target.value)}/><br/>
        <button type="submit">POST</button><button type="reset">cancle</button>
      </form>
      <textarea id="preview" contentEditable={false}>

      </textarea>
    </div>
  );
  }
}