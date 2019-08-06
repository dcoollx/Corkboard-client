import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Main from './components/main/main';
import Login from './components/login/login';
import NoticePage from './components/main/announcements/NoticePage/noticePage';
import {testNotices} from './test/demoData';
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
  render(){
    console.log(this.state.notices)
  return (
    <div className="App">
      <Route exact path="/" render={(props)=>{
        return(
        <Main {...props} announcements={this.state.notices}/>
        );
        }}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/notice/:id" render={(props)=>{
        return(<NoticePage {...props} notice={this.state.notices.find((notice)=>props.match.params.id === String(notice.id))}/>);
      }}/>
    </div>
  );
  }
}

export default App;
