import React from 'react';
import Api from '../../services/api.service';
import showdown from 'showdown';
//import {Link, NavLink} from 'react-router-dom';

export default class NewNotice extends React.Component{
  state = {
    hasError:false,
    err:null
  }
  handleSubmit=(form)=>{
    let {title, content, level} = form;
    title = title.value;
    level = Number(level.value);
    console.log(level);
    content = content.value;//shave off form element
    let options = {
      method:'POST',
      headers: new Headers({
        'content-type':'application/json',
      }),
      body: JSON.stringify({title,content,created_by:1,level})
    };
    Api.doFetch('notices',options).then((resp)=>{
      this.props.addNotice(resp);
      this.props.history.push('/');
    }).catch(err=>{
      err.then(err=>this.setState({hasError:true,err:err.error}))
    });
  }
  preview = (text)=>{
    let converter = new showdown.Converter();
    document.getElementById('preview').innerHTML = converter.makeHtml(text);

  }
  render(props){
  return(
    <div id="newNotice" className="main-container col-center row-center">
      <div className="col-center page_title">
        <h2 className="">New Notice</h2>
        {this.state.hasError && <p className="error">{this.state.err.message}</p>}
      </div>
      <form className="col-center" onSubmit={(e)=>{
        e.preventDefault();
        this.handleSubmit(e.target);
        }} onReset={(e)=>this.props.history.push('/')}>
          <div>
        <label htmlFor="title">Subject</label><br/>
        <input type="text" id="title" name="title" placeholder="Subject" required/><br/>
        </div>
        <div>
        <label htmlFor="level">Send to?</label>
        <select id="level" name="level">
          <option value='1'>Everyone</option>
          <option value='2'>My Department</option>
          <option value='3'>My team</option>
          <option value = '4'>Just For Me</option>
        </select>
        </div>
        <div className="container">
        <label className="col-full" htmlFor="content">content</label>
        <textarea wrap="hard" cols="15" className="col-full" id="content" name="content" required onChange={(e)=>this.preview(e.target.value)}/>
        <div className="col-full" id="preview" contentEditable={false}></div>
        </div><br/>
         <div className="container">
         <button className="col-1" type="submit">POST</button><button className="col-right" type="reset">Cancel</button>
         </div>
      </form>
     

      
    </div>
  );
  }
}