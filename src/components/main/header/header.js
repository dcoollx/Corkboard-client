import React from 'react';
import tokenService from '../../../services/token.service';
import logo from '../../../images/logo.png'
import {Link} from 'react-router-dom';


export default function(props){
  return(
    <nav id="header" className=" container col-full" >
      
      <div>
        <Link to="/"><img id="logo" src={logo} alt="logo"/></Link>
      <h1 className="home">{props.orgInfo.orgName}</h1>
      <p style={{'fontSize':'40%','margin': '0px'}}>{props.team.team_name}</p>
      </div>
      {!tokenService.hasAuthToken() && <div className="col-right"><Link to="/login">log in</Link> | <Link to ="/register">register</Link></div>}
      {tokenService.hasAuthToken() && <button id="settings_button" className="col-right" onClick={()=>props.openSettings()}>&#9776;</button>}
      {props.history.location.pathname === '/' && tokenService.hasAuthToken() && <button onClick={(e)=>props.history.push('/newNotice')} id="add_Notice">+</button>}
    </nav>
  );
}