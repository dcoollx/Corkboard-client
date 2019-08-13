import React from 'react';
import Api from '../../services/api.service';

 export default class Register extends React.Component{
   state={
     isNewOrg:false,
     hasError:true,
     err:new Error('Password must match')
   };
   handleSubmit = async (form) => {
     let {user_name, password, org} = form;
     org = await this.checkIfName(org.value,org);
     window.org = org;
     if(org){//returns org id if it exsist and false if it doesnt
        
     //todo input validation
     let newUser = {user_name:user_name.value, password:password.value, org};
     let options ={
       method:'POST',
       headers: new Headers({'Content-type':'application/json'}),
       body: JSON.stringify(newUser)
     };
     Api.doFetch('register/user',options)
      .then(res=>{
        this.setState({hasError:false,err:null});
        this.props.history.push('/');
      })
      .catch(err=>this.setState({hasError:true,err}))
    }else{
      //this.setState({hasError:true,err:new Error('That Org doenst exist, do you want to create a new org?')})
      //first create new
      alert('that org doesnt exist');

    }

   }
   checkIfName=(name,org)=>{
     //!! this function returns true if it FAILS, meaning that name was not found
     return fetch(`${Api.url}orgs?name=${name}`)
     .then(res =>{
       if(res.status === 404){
            return false;
       }
      else if(res.ok)
        return res.json();
      else
        return Promise.reject(new Error(res.json()))
     }).then(org=>{
      if(!org)
        return false;
      else
        return org.id
    });
     //todo
   }
  render(){
    return(
      <div id="register" className=" container col-center row-full">
        <div className="col-center"> 
      {this.state.hasError && <p className="error col-center">{this.state.err.message}</p>}
      <h2 className="col-center">Sign-Up</h2> 
      </div>
        <form className="col-center" onSubmit = {(e)=>{
          e.preventDefault();
          this.handleSubmit(e.target);
        }}>
          <div>
          <label>First Name</label><br/>
          <input type="text" name="first_name" id="first_name" required/>
          </div>
          <div>
          <label>Last Name</label><br/>
          <input type="text" name="Last_name" id="last_name" required/>
          </div>
          <div>
          <label>Position</label><br/>
          <select>
            <option>Junior</option>
            <option>Senior</option>
            <option>Management</option>
            <option>Director</option>            
          </select>
          </div>
          
          <div>
          <label>UserName</label><br/>
          <input type="text" name="user_name" id="user_name" required/>
          </div>
          <div>
          <label>password</label>
          <input type="password" name="password" id="password" required/>
          </div>
          <div>
          <label>re-enter password</label>
          <input type="password" onChange={(e)=>{
            if(e.target.value === document.getElementById('password').value){
              document.getElementById('register_submit').disabled =false;
              this.setState({hasError:false, err:null});
            }else{
              document.getElementById('register_submit').disabled =true;
              this.setState({hasError:true, err:new Error('Password must match')});
            }
          }}/>
          </div>
          <div><label htmlFor="org">Organization</label>
          <input id="org" name="org" type="text" required/></div>
          {this.state.isNewOrg && <div>
            <label>Organization name</label>
            <input type='text'/>
          </div>}
          <div className="container register-controls"> 
          <button id="register_submit" className="col-1" type="submit" disabled>Submit</button>
          <button className="col-right" id="reset" type="reset"onClick={(e)=>this.props.history.push('/')}>cancel</button>
          </div>
        </form>
      </div>
    );
  }
}