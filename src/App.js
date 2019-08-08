import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Main from './components/main/main';
import Login from './components/login/login';
import NoticePage from './components/main/announcements/NoticePage/noticePage';
import NewNotice from './components/newNotice/newNotice';
import {testNotices} from './test/demoData';
import token_service from './services/token.service';
import Api from './services/api.service';
import Register from './components/login/Register';

class App extends React.Component {
  state = {
    org:JSON.parse(localStorage.getItem('orgInfo')) || {orgId:0,orgName:'Not connected to an org'},
    notices:[...testNotices(5)],
 
    hasError:false,
    err:null
  };
  
  componentDidMount(){
    let options ={
      method:'GET',
      headers: new Headers({'content-type':'application/json'})
    };
    Api.doFetch('corkboards',options)
      .then(notices=>this.setState({notices:notices.notices}))
      .catch(err=>{
        this.setState({hasError:true,err})
        console.log('fetch encountered an error', err);
      });
  }
  init(){
    let options ={
      method:'GET',
      headers: new Headers({'content-type':'application/json'})
    };
    Api.doFetch('corkboards',options)
      .then(notices=>this.setState({notices:notices.notices}))
      .catch(err=>{
        this.setState({hasError:true,err:err.message})
        console.log('fetch encountered an error', err);
      });

  }
  signIn = (user_name, password,org)=>{
    let options ={
      method:'POST',
      headers:new Headers({'Content-type':'application/json'}),
      body: JSON.stringify({user_name,password,org})
    };
    return Api.doFetch('login',options).then((res)=>{
      token_service.setAuthToken(res.Auth);
      this.setState({org:{orgName:org,orgId:1}})//TODO, orgid is hardcoded
      localStorage.setItem('orgInfo',JSON.stringify({orgName:org,orgId:1}));
      this.init();
    }).catch(err=>this.setState({hasError:true,err:err.message});)
  }
  render(){
    console.log(this.state.notices)
  return (
    
    <div className="App">
    <Route exact path="/register" component = {Register}/>
    <Switch>
      <Route exact path="/" render={(props)=>{
        if(token_service.hasAuthToken())
          return(
          <Main {...props} orgInfo = {this.state.org} announcements={this.state.notices}/>
          );
        else
            return <Login {...props} signIn = {this.signIn}/>
        }}/>
      <Route exact path="/" component={Login}/>
      <Route exact path="/notice/:id" render={(props)=>{
        return(<NoticePage {...props} notice={this.state.notices.find((notice)=>props.match.params.id === String(notice.id))}/>);
      }}/>
    </Switch>
    <Route path="/newNotice" component={NewNotice}/>  
    </div>
  );
  }
}

export default App;
