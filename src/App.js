import React from 'react';
import {Route} from 'react-router-dom';
import './styles/App.css';
import tokenService from './services/token.service';
import Settings from './components/settings';
import Login from './components/login/login';
import Landing from './components/Landing/Landing';
import NoticePage from './components/main/announcements/NoticePage/noticePage';
import NewNotice from './components/newNotice/newNotice';
import token_service from './services/token.service';
import Api from './services/api.service';
import Register from './components/login/Register';
import Corkboard from './components/main/announcements/corkboard';
import Header from './components/main/header/header';
import Modal from 'react-modal';


class App extends React.Component {
  state = {
    org:JSON.parse(localStorage.getItem('orgInfo')) || {orgId:0,orgName:'Not connected to an org'},
    team:JSON.parse(localStorage.getItem('team')) || {id:0,team_name:'Not connected to a team'},
    notices:[],
    modalIsOpen:false, 
    hasError:false,
    err:null
  };
  
  componentDidMount(){
    this.init();
    try{
    Modal.setAppElement('#root');
    }
    catch(err){// catch this error so test passw
      console.error(err);
    }
  }
  openSettings = () =>{
    this.setState({modalIsOpen:true});
  }
  closeSettings = () =>{
    this.setState({modalIsOpen:false});
  }
  changeTeam = (newTeam)=>{
    this.setState({team:newTeam})
  }
  addNotice = (newNotice)=>{
    this.setState({notices: [...this.state.notices,...newNotice]})
  }
  init(){
    if(tokenService.hasAuthToken()){
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
      localStorage.setItem('orgInfo',JSON.stringify(
        {
          orgName:payload.org_name,
          orgId:payload.org,
          orgCode: null
        }));
      this.init();
    });
  }

  render(){
  return ( 
    <main className="App main-container ">
      <Modal
    isOpen={this.state.modalIsOpen}
    onRequestClose={this.closeSettings}
    id="settings"
    className="settings"
    overlayClassName="Overlay"
    >
      <Settings closeSettings={this.closeSettings} changeTeam={this.changeTeam}/>
    </Modal>
    <Route path="/" render={(props)=><Header {...props} openSettings={this.openSettings} orgInfo = {this.state.org} team = {this.state.team}/>}/>
    <Route exact path="/" render={(props)=>{
        if(token_service.hasAuthToken())
          return(
          <Corkboard {...props} data={this.state.notices}/>
          );
        else
            return <Landing/>
        }}/>
      <Route exact path="/login" render={(props)=><Login {...props} signIn = {this.signIn}/>}/>
      <Route exact path="/register" component = {Register}/>
      <Route exact path="/notice/:id" render={(props)=>{
        return(<NoticePage {...props} notice={this.state.notices.find((notice)=>props.match.params.id === String(notice.id))}/>);
      }}/>
    <Route path="/newNotice" render={(props)=>{
      return <NewNotice {...props} addNotice={this.addNotice}/>
      }
    }/>  
    </main>
  );
  }
}

export default App;
