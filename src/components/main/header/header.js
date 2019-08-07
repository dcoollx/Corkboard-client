import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './header.css';

export default function(props){
  return(
    <nav className="header">
      {props.orgName || 'TEST ORG'}
      {(props.isSignedIn && <button onClick ={(props)=>props.history.push('/')}>logout</button>) || <button onClick={()=>props.history.push('/login')}>login</button>}
      <Link to='/newNotice'>+</Link>
      <button>settings</button>
    </nav>
  );
}