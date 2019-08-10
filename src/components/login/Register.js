import React from 'react';
import Api from '../../services/api.service';

 export default class Register extends React.Component{
   state={
     isNewOrg:false,
     hasError:true,
     err:new Error('Pass word must match')
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
      <div> <label>Create New Organization?</label><br/>
      <p className="error">{this.state.hasError && this.state.err.message}</p>
          <input onChange={(e)=>this.setState({isNewOrg:e.target.checked})} type="checkbox"/>
        <form onSubmit = {(e)=>{
          e.preventDefault();
          this.handleSubmit(e.target);
        }}>
          <label>UserName</label>
          <input type="text" name="user_name" id="user_name" required/>
          <label>password</label>
          <input type="password" name="password" id="password" required/>
          <label>re-enter password</label>
          <input type="password" onChange={(e)=>{
            if(e.target.value === document.getElementById('password').value){
              document.getElementById('register_submit').disabled =false;
              this.setState({hasError:false, err:null});
            }
          }}/>
          <div><label htmlFor="org">Organization</label>
          <input id="org" name="org" type="text" required/></div>}
          {this.state.isNewOrg && <div>
            <label>Organization name</label>
            <input type='text'/>
          </div>} 
          <button id="register_submit" type="submit" disabled>Submit</button>
        </form>
      </div>
    );
  }
}