import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import tokenService from '../../../services/token.service';


export default function(props){
  console.log(props.history);
  return(
    <nav id="header" className=" container col-full" >
      {props.orgInfo.orgName}
      {tokenService.hasAuthToken() && <button className="col-right" onClick={()=>props.openSettings()}>&#9776;</button>}
      {props.history.location.pathname === '/' && tokenService.hasAuthToken() && <button onClick={(e)=>props.history.push('/newNotice')} className="add_Notice">+</button>}
    </nav>
  );
}