import React from 'react';
import Api from '../services/api.service';
import tokenService from '../services/token.service';
export default class Settings extends React.Component{
  state={
    teamOptions : [<option key="0">There are no Teams For Your Org</option>],
    teams : [],
  }
  handleLostFocus(e){
    e.target.style.display ="none";
    e.target.nextSibling.style.display="none";

  }
  render(){
  return (
    <div>
    <h3 className="small_container">Settings <span className="col-right" onClick = {()=>this.props.closeSettings()}>X</span></h3> 
    <p>Org Code: {JSON.parse(localStorage.getItem('orgInfo')).orgCode || 'contact administrator'}</p>
      <ul>
      {!localStorage.getItem('team') && <li><button className="settings_button" onClick={(e)=>{
        let input = document.getElementById('create_team')
        if(input.style.display !== 'block'){
          input.style.display = 'block';
        }
        else{
          input.style.display = 'none';
        }}}> Create A Team</button></li>}
      <form id="create_team" onSubmit={(e)=>{
        e.preventDefault();
        let options = {
          method:'POST',
          headers: new Headers({'content-type':'application/json'}),
          body: JSON.stringify({team_name:e.target.Cteam.value})
        };
        Api.doFetch('teams',options).then((res)=>{
          this.props.changeTeam(res);
          localStorage.setItem('team',JSON.stringify(res));
          this.props.closeSettings();
        });
      }}><input  name="Cteam" className="" id="Cteam" type="text" placeholder="team name" required/><button>Create Team</button></form>
      {!localStorage.getItem('team') && <li><button className="settings_button" onClick={(e)=>{

        let input = document.getElementById('join_team');
        
        if(input.style.display !== 'block'){
        Api.doFetch('teams').then(teams=>{
          if(teams.length >=1){
          this.setState({teams:teams,
            teamOptions : teams.map((team,index)=>{
            return(<option key={index} value={team.id}>{team.team_name}</option>);
          })});
          
        }

        });
        input.style.display = 'block'}
        else{
          input.style.display = 'none';
        }
      }
        }> Join A Team</button></li>}
      <form id="join_team" onSubmit={(e)=>{
         e.preventDefault();
         let teamId = Number(e.target.Jteam.value);
        let options = {
          method:'PATCH',
          headers: new Headers({'content-type':'application/json'}),
          body: JSON.stringify({update:{team:teamId}})
        };
        Api.doFetch('users',options).then((res)=>{
          let myTeam = this.state.teams.find((team)=>team.id === teamId);
          this.props.changeTeam(myTeam);
          localStorage.setItem('team',JSON.stringify(myTeam));
          this.props.closeSettings();
        });
      }}><select  name="Jteam" className="" id="Jteam" type="text" placeholder="team name" required>{this.state.teamOptions}</select>
      <button disabled = {this.state.teams.length < 1}> Join Team</button></form>
      {localStorage.getItem('team') && <li>
        <button  onClick={(e)=>{
          let input = document.getElementById('manage_team')
          if(input.style.display !=='block')
            input.style.display = "block";
          else
            input.style.display = 'none';
          }} className="settings_button">Manage Team</button></li>}
      <div id="manage_team" className="container">
        <button id="leave_team" className="settings_button" onClick={(e)=>{
          let options = {
            method:'PATCH',
            headers: new Headers({'content-type':'application/json'}),
            body: JSON.stringify({update:{team:null}})
          };
          Api.doFetch('users',options).then((res)=>{
            this.props.changeTeam({id:0,team_name:'Not connected to an team'});
            localStorage.removeItem('team');
            this.props.closeSettings();
          });
        }}>Leave Team</button>
      </div>
      {/* <li><button className="settings_button">Notice Archive</button></li> strech goal*/}
      <li><button className="settings_button" onClick ={(e)=>{
        tokenService.clearAuthToken();
        window.location.assign('/');
        localStorage.removeItem('orgInfo');
        this.props.closeSettings();
      }}>Log Out</button></li>
      </ul>
      </div>
  );
    }
}