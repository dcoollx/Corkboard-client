import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import tokenService from '../../../services/token.service';


export default function(props){
  return(
    <nav id="header" className=" container col-full" >
      <div>
      {props.orgInfo.orgName}<br/>
      <p style={{'fontSize':'40%'}}>{props.team.team_name}</p>
      </div>
      {tokenService.hasAuthToken() && <button id="settings_button" className="col-right" onClick={()=>props.openSettings()}>&#9776;</button>}
      {props.history.location.pathname === '/' && tokenService.hasAuthToken() && <button onClick={(e)=>props.history.push('/newNotice')} id="add_Notice">+</button>}
    </nav>
  );
}