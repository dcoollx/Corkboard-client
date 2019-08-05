import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Main from './components/main/main';
import Login from './components/login/login';
import NoticePage from './components/main/announcements/NoticePage/noticePage';
import {testNotices} from './test/demoData';

class App extends React.Component {
  state = {
    orgName:null,
    announcements:[...testNotices(5)],
    isSignedIn: false,
    hasError:false,
  };
  render(){
    console.log(this.state.announcements)
  return (
    <div className="App">
      <Route exact path="/" render={(props)=>{
        return(
        <Main {...props} announcements={this.state.announcements}/>
        );
        }}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/notice/:id" render={(props)=>{
        return(<NoticePage {...props} notice={this.state.announcements.find((notice)=>props.match.params.id === String(notice.id))}/>);
      }}/>
    </div>
  );
  }
}

export default App;
