import React from 'react';
import {Link} from 'react-router-dom';
//images
import connections_icon from '../../images/connections.png';
import pictures from '../../images/picture.png';
import browser from '../../images/browser.png';

export default function Landing(){
  return(
    <div id="landing" className="container page">
      <div id="landing_header" className="col-full small_container">
        <div  className="col-full small_container">
          <div className="col-1"><h1 >Corkboard</h1>
          <q>The Inter-Organization Message Management System</q>
          </div>

          <div className="landing_sub col-right">
        New here? <Link to="/register">Create An Account</Link><br/>
        Come here often? <Link to="/login">Login</Link>
        </div>
        </div> 
      </div> 
      <div className="small_container col-full  " >
        <h3 className="col-left">Share messsages with your whole Organization or just a single team</h3>
        <img className="col-right" src={connections_icon} alt="connections"/>
      </div>
      <div className="small_container col-full  " >
      <img className="col-left" src={pictures} alt="pictures"/>
        <h3 className="col-right">Share photos and links</h3>
      </div>
      <div className="small_container col-full  " >
        <h3 className="col-left">Craft exciting notifications using HTML5 or markdown</h3>
        <img className="col-right" src={browser} alt="web browser"/>
      </div>
      <footer className="small_container col-full ">
        <p className = "col-1">
          Demo Credentials : testuser, Password1!
        </p>
       <p id="copyright" className="col-right"> &copy; 2019 <a href="https://dcoollx.github.io/Portfolio">David Queen Jr</a></p>
      </footer>
      
    </div>
  );
}