import React from 'react';
import Comments from './comments';
import Api from '../../../../services/api.service';
import showdown from 'showdown';




export default class NoticePage extends React.Component{
  constructor(props){
    super(props);
    this.markdown = new showdown.Converter();
    this.converted = null;
  }
  state = {
    hasError:false,
    err:null,
    content: null,
    comments:[],
    noticeNumber: this.props.match.params.id,
    notice:{title:'no notice found',content:'nothing',posted_by:'noone',created:Date.now()}
  };

  componentDidMount(){
    
    Api.doFetch(`notices/${this.props.match.params.id}`).then((notice)=>{
      this.setState({notice},()=>document.getElementById('content').innerHTML = this.markdown.makeHtml(this.state.notice.content));
    }).catch(err=>err.then((err)=>this.setState({hasError:true,err})));
    
    Api.doFetch(this.state.noticeNumber +'/comments')//todo add options to include key
      .then((comments)=>{
        this.setState({
          hasError:false,
          err:null,
          comments:comments
        });

      }).catch(err=>err.then((err)=>this.setState({hasError:true,err:new Error(err.error)})));
  }
  postComment = (content) =>{//comment requires content, created by(int), org(?), posted_on(init)
    let options ={
      method:'POST',
      headers:new Headers({'content-type':'application/json'}),
      body: JSON.stringify({content,posted_on:this.state.noticeNumber})
    };
    Api.doFetch(this.state.noticeNumber + '/comments',options)
    .then(res=>{
      this.setState({
        comments: [...this.state.comments,...res],
        hasError:false,
        err:null
      });


    }).catch(err=>err.then((err)=>this.setState({hasError:true,err:new Error(err.error)})));
  }
  //todo, make this a fetch to get commets from server, for now using testdata
  render(){
    this.converted = this.markdown.makeHtml(this.props.content);
  let comments = this.state.comments.map((comment, index)=>{
    return (<Comments key={index} content={comment.content} by={comment.created_by}/>);
  });
  return(
  <div id="noticePage" className=" col-center row-center page">
   {this.state.hasError && <p className="error col-full" >{this.state.err.message}</p>}
   <div className="notice-content col-full">
     <div className="small_container">
    <h2 className="col-1">{this.state.notice.title}</h2> <h2 className="hide col-right">{new Date(this.state.notice.created_on).toLocaleDateString()}</h2>
    </div>
    <div className="content col-full" id="content"></div>
    <p className="by col-right">by: <i>{this.state.notice.created_by}</i></p>
    </div>
    <div className="comments col-center">{comments}</div>
    <form className="col-center" onSubmit={
      (e)=>{e.preventDefault();
      this.postComment(e.target['comment'].value);
      e.target['comment'].value = '';
      }
    }>
    <textarea id="comment" name="comment"></textarea>
    <div className="noticePage-controls container">
    <button className="col-1" type="submit">Comment</button>
    <button className="col-right" onClick={(e)=>this.props.history.push('/')}>Go Back</button>
    </div>
    </form>
    
  </div>);
  }
}