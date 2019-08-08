import React from 'react';
import Api from '../../services/api.service';

 export default class Register extends React.Component{
   state={
     isNewOrg:false,
     hasError:true,
     err:new Error('Pass word must match')
   };
   handleSubmit = (form) => {
     let {user_name, password, org} = form;
     if(this.checkIfName(org.value)){
     //todo input validation
     let newUser = {user_name:user_name.value, password:password.value, org:org.value};
     let options ={
       method:'POST',
       headers: new Headers('Content-type','application/json'),
       body: JSON.stringify(newUser)
     };
     Api.doFetch('register',options)
      .then(res=>{})
      .catch(err=>this.setState({hasError:true,err}))
    }else{
      this.setState({hasError:true,err:new Error('That Org exist')})

    }

   }
   checkIfName=(name)=>{
     return true;
     //todo
   }
  render(){
    return(
      <div> <label>Create New Organization?</label><br/>
      <p className="error">{this.state.hasError && this.state.err.message}</p>
          <input onChange={(e)=>this.setState({isNewOrg:e.target.checked})} type="checkbox"/>
        <form onSubmit = {(e)=>{

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
          <div><label>Organization</label>
          <input type="text"/></div>}
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