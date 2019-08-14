import React from 'react';
import Api from '../services/api.service';
import tokenService from '../services/token.service';
export default class Settings extends React.Component{
  state={
    teamOptions : [<option>There are no Teams For Your Org</option>],
  }
  render(){
  return (
    <div>
    <h3>Settings</h3>
      <ul>
      {!localStorage.getItem('team') && <li><button className="settings_button" onClick={(e)=>document.getElementById('create_team').style.display = 'block'}> Create a Team</button></li>}
      <form id="create_team" onSubmit={(e)=>{
        e.preventDefault();
        let options = {
          method:'POST',
          headers: new Headers({'content-type':'application/json'}),
          body: JSON.stringify({team_name:e.target.Cteam.value})
        };
        Api.doFetch('teams',options).then((res)=>{
          console.log(res);
          this.setState({team:res});
          localStorage.setItem('team',JSON.stringify(res));
          this.props.closeSettings();
        });
      }}><input name="Cteam" className="team" id="Cteam" type="text" placeholder="team name" required/><button>Create Team</button></form>
      {!localStorage.getItem('team') && <li><button className="settings_button" onClick={(e)=>{
        Api.doFetch('teams').then(teams=>{
          this.setState({teams:teams,
            teamOptions : teams.map((team,index)=>{
            return(<option key={index} Value={team.id}>{team.team_name}</option>);
          })})

        });
        document.getElementById('join_team').style.display = 'block'}
        }> Join a Team</button></li>}
      <form id="join_team" onSubmit={(e)=>{
         e.preventDefault();
         let teamId = Number(e.target.Jteam.value);
         console.log(teamId);
        let options = {
          method:'PATCH',
          headers: new Headers({'content-type':'application/json'}),
          body: JSON.stringify({update:{team:teamId}})
        };
        Api.doFetch('users',options).then((res)=>{
          let myTeam = this.state.teams.find((team)=>team.id === teamId);
          this.setState({team: myTeam});
          localStorage.setItem('team',JSON.stringify(myTeam));
          this.props.closeSettings();
        });
      }}><select name="Jteam" className="team" id="Jteam" type="text" placeholder="team name" required>{this.state.teamOptions}</select><button>Join Team</button></form>
      {localStorage.getItem('team') && <li><button onClick={(e)=>document.getElementById('manage_team').style.display='block'} className="settings_button">Manage Team</button></li>}
      <div id="manage_team" className="container">
        <button id="leave_team" className="settings_button" onClick={(e)=>{
          let options = {
            method:'PATCH',
            headers: new Headers({'content-type':'application/json'}),
            body: JSON.stringify({update:{team:null}})
          };
          Api.doFetch('users',options).then((res)=>{
            this.setState({team:{id:0,team_name:'Not connected to an team'}});
            localStorage.removeItem('team');
            this.props.closeSettings();
          });
        }}>Leave Team</button>
      </div>
      <li><button className="settings_button">Notice Archive</button></li>
      <li><button className="settings_button" onClick ={(e)=>{
        tokenService.clearAuthToken();
        this.props.closeSettings();
      }}>logout</button></li>
      </ul>
      </div>
  );
    }
}