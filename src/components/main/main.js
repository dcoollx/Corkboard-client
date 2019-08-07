import React from 'react';
import Header from './header/header';
import Corkboard from './announcements/corkboard';

export default function(props){
  return(
    <main>
      <Header orgInfo = {props.orgInfo} {...props}/>
      <Corkboard {...props} data = {props.announcements}/>
    </main>
  );
}