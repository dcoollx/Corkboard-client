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

class App extends React.Component {
  state = {
    orgName:null,
    notices:[...testNotices(5)],
    isSignedIn: false,
    hasError:false,
    err:null
  };
  
  componentDidMount(){
    let options ={
      method:'GET',
      headers: new Headers({'content-type':'application/json'})
    };
    Api.doFetch('1/corkboard',options)
      .then(notices=>this.setState({notices:notices.notices}))
      .catch(err=>{
        this.setState({hasError:true,err})
        console.log('fetch encountered an error', err);
      });
  }
  signIn = (username, password)=>{
    token_service.setAuthToken(token_service.encodeUsername(username,password));//todo add server side validation

  }
  render(){
    console.log(this.state.notices)
  return (
    <div className="App">
    <Switch>
      <Route exact path="/" render={(props)=>{
        if(token_service.hasAuthToken())
          return(
          <Main {...props} announcements={this.state.notices}/>
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
