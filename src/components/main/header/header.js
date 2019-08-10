import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import tokenService from '../../../services/token.service';

export default function(props){
  return(
    <nav className="header container col-full">
      {props.orgInfo.orgName}
      <button onClick ={(e)=>{
        tokenService.clearAuthToken();
        props.history.push('/');

      }}>logout</button>
      <Link to='/newNotice'>+</Link>
      <button>settings</button>
    </nav>
  );
}