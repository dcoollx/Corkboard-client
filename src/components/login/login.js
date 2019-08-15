import React from 'react';
import {Link} from 'react-router-dom';
export default class Login extends React.Component{
  state = {
      hasError:false,
      err:null
    };
  render(){
    
    return(
    <div id="login" className=" container col-center row-center">
      <div className="col-center">
        {this.state.hasError && <p className="error">{this.state.err}</p>}
        <h2>Login in</h2>
      </div>
      <form className="col-center" onSubmit={(e)=>{
        e.preventDefault();
        this.props.signIn(e.target.user_name.value,e.target.password.value)
          .then((x)=>this.props.history.push('/'))
          .catch((err)=>{
            console.log(err)
            err.then(err=>this.setState({hasError:true,err:err.error}))
          });
        //then->
        
      }}>
        <div>
          <label htmlFor="user_name">Username</label><br/>
          <input type="test" name="user_name" id="user_name" required />
        </div>
        <div>
          <label htmlFor="password">password</label><br/>
          <input type="password" name="password" id="password" required/>
        </div>
        <div className="login-controls container">
          <button className="col-1" type="submit">Sign in</button>
          <Link className="col-right" to='/register'>New user?</Link>
        </div>
      </form>
      
    </div>
  );
}
}