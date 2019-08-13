import React from 'react';
import Header from './header/header';
import Corkboard from './announcements/corkboard';

export default function(props){
  return(
    <div className="container col-center row-full">
      <Header orgInfo = {props.orgInfo} {...props}/>
      <Corkboard {...props} data = {props.announcements}/>
    </div>
  );
}