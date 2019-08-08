import React from 'react';
import {Link} from 'react-router-dom';
export default class Login extends React.Component{
  state = {
      hasError:false,
      err:null
    };
  render(){
    
    return(
    <div>
      {this.state.hasError && <p className="error">{this.state.err}</p>}
      Login in page
      <form onSubmit={(e)=>{
        e.preventDefault();
        this.props.signIn(e.target.user_name.value,e.target.password.value,e.target.org_name.value)
          .then((x)=>this.props.history.push('/')).catch((err)=>{
            console.log(err);
            this.setState({hasError:true,err:err})
          });
        //then->
        
      }}>
        <label>username</label>
        <input htmlFor="user_name" type="test" name="user_name" id="user_name"/>
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password"/>
        <label htmlFor="org_name">Organization</label>
        <input type="text" id="org_name" name="or_name" defaultValue={(JSON.parse(localStorage.getItem('orgInfo')) || '').orgName}/>
        <button type="submit">Sign in</button>
      </form>
      <Link to='/register'>New user?</Link>
    </div>
  );
}
}