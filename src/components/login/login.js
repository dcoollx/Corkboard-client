import React from 'react';
import {Link} from 'react-router-dom';
export default class Login extends React.Component{
  state = {
      hasError:false,
      err:null
    };
  render(){
    
    return(
    <div id="login" className=" col-center ">
      <div className="col-center">
        <h2>Log In</h2>
    <p className={`error error-${this.state.hasError}`}>{this.state.err || "No Error"}</p>
      </div>
      <form className="col-center" onSubmit={(e)=>{
        e.preventDefault();
        this.props.signIn(e.target.user_name.value,e.target.password.value)
          .then((x)=>this.props.history.push('/'))
          .catch((err)=>{
            err.then(err=>this.setState({hasError:true,err:err.error}))
          });
        //then->
        
      }}>
        <div>
          <label htmlFor="user_name">Username</label><br/>
          <input type="test" name="user_name" id="user_name" required />
        </div>
        <div>
          <label htmlFor="password">Password</label><br/>
          <input type="password" name="password" id="password" required/>
        </div>
        <div className="login-controls container">
          <button className="col-1" type="submit">Sign In</button>
          <Link className="col-right" to='/register'>Register</Link>
        </div>
      </form>
      
    </div>
  );
}
}