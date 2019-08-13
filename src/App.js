import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './styles/App.css';
import Main from './components/main/main';
import Login from './components/login/login';
import NoticePage from './components/main/announcements/NoticePage/noticePage';
import NewNotice from './components/newNotice/newNotice';
import {testNotices} from './test/demoData';
import token_service from './services/token.service';
import Api from './services/api.service';
import Register from './components/login/Register';
import Corkboard from './components/main/announcements/corkboard';
import Header from './components/main/header/header';

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
  signIn = (user_name, password)=>{
    let options ={
      method:'POST',
      headers:new Headers({'Content-type':'application/json'}),
      body: JSON.stringify({user_name,password})
    };
    return Api.doFetch('login',options).then((res)=>{
      token_service.setAuthToken(res.Auth);//need to decode payload
      let payload = JSON.parse(atob(res.Auth.split('.')[1]));
      this.setState({org:{orgName:payload.org_name,orgId:payload.org}})//TODO, orgid is hardcoded
      localStorage.setItem('orgInfo',JSON.stringify({orgName:payload.org_name,orgId:payload.org}));
      this.init();
    }).catch(err=>this.setState({hasError:true,err:err.message}));
  }
  render(){
    console.log(this.state.notices)
  return (
    
    <main className="App main-container ">
    <Route path="/" render={(props)=><Header {...props} orgInfo = {this.state.org}/>}/>
    <Route exact path="/" render={(props)=>{
        if(token_service.hasAuthToken())
          return(
          <Corkboard {...props} data={this.state.notices}/>
          );
        else
            return <Login {...props} signIn = {this.signIn}/>
        }}/>
      <Route exact path="/register" component = {Register}/>
      <Route exact path="/notice/:id" render={(props)=>{
        return(<NoticePage {...props} notice={this.state.notices.find((notice)=>props.match.params.id === String(notice.id))}/>);
      }}/>
    <Route path="/newNotice" component={NewNotice}/>  
    </main>
  );
  }
}

export default App;
