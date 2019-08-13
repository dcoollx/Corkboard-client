import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import tokenService from '../../../services/token.service';


export default function(props){
  console.log(props.history);
  return(
    <nav className="header container col-full" >
      {props.orgInfo.orgName}
      {tokenService.hasAuthToken() && <button className="nav-button" onClick ={(e)=>{
        tokenService.clearAuthToken();
        props.history.push('/');

      }}>logout</button>}
      {props.history.location.pathname === '/' && tokenService.hasAuthToken() && <button onClick={(e)=>props.history.push('/newNotice')} className="add_Notice">+</button>}
    </nav>
  );
}