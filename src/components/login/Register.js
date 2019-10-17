import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../../services/api.service';
import validator from '../../services/inputValidation.service';
import seima from 'siema';

 export default class Register extends React.Component{
   componentDidMount(){
    this.seima = new seima({
      //draggable:false,
    });
   }
   state={
     isNewOrg:false,
     hasError:true,
     err:'Password must match',
     newUser : {},
     nameTaken : true,
     //todo make controled input
   };
   handleNext(form){
     let user = this.state.newUser;//copy existing data if there is some;
     Object.keys(form).forEach(field=>{
       user[form[field].name] = form[field].value;
     });
      this.setState({newUser:user});
     this.seima.next();
   }
   createNewOrg = (org_name) =>{
    let options = {
            method:'POST',
            headers: new Headers({'Content-type':'application/json'}),
            body:JSON.stringify({org_name})
          };
          return Api.doFetch('register/orgs',options)
          .then(res=>{
            let user = this.state.newUser;
            user.org = res[0];
              this.setState({newUser:user})
          }).catch(err=>this.setState({err}))
   }
   handleSubmit = async (form) => {
     let {display_name, user_name, password, org, user_position} = this.state.newUser;
     console.log(org);
     let options ={
       method:'POST',
       headers: new Headers({'Content-type':'application/json'}),
       body: JSON.stringify({display_name, user_name, password, org:org.id, user_position})
     };
     return Api.doFetch('register/user',options)
      .then(res=>{
        this.setState({hasError:false,err:null});
      })
      .catch(err=> err.then(err=>this.setState({hasError:true,err:err.error})))
   

   }
   checkIfName= async (name)=>{
     let nameTaken = true;
     //!! this function returns true if it FAILS, meaning that name was not found
      let res = await fetch(`${Api.url}orgs?name=${name}`,{method:'head'})
       if(res.status === 404){
            nameTaken = false;
       }
       else if(res.ok){
        nameTaken = true;
       }
       this.setState({nameTaken});
      
   }
  render(){
    return(
      <div id="register" className=" container col-center row-full">
      {this.state.hasError && <p className="error col-center">{this.state.err}</p>}
       <h2 className="col-center">Sign-Up</h2> 
      <div className="siema  container col-center">
     
        <form className="col-center" onSubmit = {(e)=>{
          e.preventDefault();
          this.handleNext(e.target);
        }}>
          <div>
          <label htmlFor="display_name">Display Name</label><br/>
          <input type="text" name="display_name" id="display_name" required/>
          </div>
          <div>
          <label htmlFor="user_position">Position</label><br/>
          <select name="user_position" id="user_position">
            <option value="1">Junior</option>
            <option value="2">Senior</option>
            <option value="3">Management</option>
            <option value="4">Director</option>            
          </select>
          </div>
          
          <div>
          <label htmlFor="user_name">UserName</label><br/>
          <input type="text" name="user_name" id="user_name" required/>
          </div>
          <div>
          <label htmlFor="password">password</label>
          <input onChange={(e)=>{
                if(validator(e.target.value))
                  this.setState({hasError:false,err:''});
                else
                this.setState({hasError:true,err:'Weak Password'});
              
          }} type="password" name="password" id="password" required/>
          </div>
          <div>
          <label htmlFor="re-enter_password">re-enter password</label>
          <input id="re-enter_password" name="re-enter_password" type="password" onChange={(e)=>{
            if(e.target.value === document.getElementById('password').value){
              document.getElementById('register_submit').disabled =false;
              this.setState({hasError:false, err:null});
            }else{
              document.getElementById('register_submit').disabled =true;
              this.setState({hasError:true, err:'Password must match'});
            }
          }}/>
          </div>
          
          <div className="small_container register-controls">
          <button className="col-left" id="reset" type="reset"onClick={(e)=>this.props.history.push('/')}>cancel</button> 
          <button id="register_submit" className="col-right" type="submit" disabled>Next</button>
          </div>
        </form>
        <form onSubmit={async (e)=>{
          e.preventDefault();
          this.handleNext(e.target);
          if(this.state.newUser.new_org_name)
            await this.createNewOrg(this.state.newUser.new_org_name)
          else{
              //look up existing org
            }
         await this.handleSubmit();//todo maybe use promise.all to cancel if either fails
        }}
        
        onReset={(e)=>{
          this.seima.prev();
        }}>
        <div className="container">
            <label id="newOrgLabel" htmlFor="newOrg">New Org</label>
            <input id="newOrg" name="newOrg" type="checkbox" onChange={(e)=>{
              this.setState({isNewOrg : e.target.checked});
            }}/> 
          </div>
          {!this.state.isNewOrg && <div><label htmlFor="org">Organization Code</label>
          <input id="org_code" name="org_code" type="text" required/></div>}
          {this.state.isNewOrg && <div>
            <label>Organization name</label>
            <input name="new_org_name" id="new_org_name" onChange={(e)=> this.checkIfName(e.target.value)} type='text' required placeholder="Organization name"/>          </div>}
            {this.state.isNewOrg && this.state.nameTaken && <p className="error">Can't Use That Name</p>}
          <div className="small_container">
          <button type="reset">Go Back</button>
          <div></div>
          <button type="submit" disabled = {this.state.nameTaken}>Submit</button>
          
          
          </div>
        </form>
        <div>
          <progress/>
          <h3>Welcome to [ORG NAME]</h3>
          <p> Your Organization's invite code is [code]</p>
          <p>Click <Link to="/login">Here</Link> to Log in</p>
        </div>
        </div>
      </div>
    );
  }
}