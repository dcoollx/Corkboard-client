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
     err:'',
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
   handleSubmit = async () => {
     let {display_name, user_name, password, org, user_position} = this.state.newUser;
     let options ={
       method:'POST',
       headers: new Headers({'Content-type':'application/json'}),
       body: JSON.stringify({display_name, user_name, password, org:org.id, user_position})
     };
     return Api.doFetch('register/user',options)
      .then(res=>{
        let org = this.state.newUser.org;
        this.setState({hasError:false,err:null});
        localStorage.setItem('orgInfo',JSON.stringify({orgId:org.id,orgName:org.org_name,orgCode: org.code}));
      })
      .catch(err=> err.then(err=>{
        this.setState({hasError:true,err:err.error})
        this.seima.goTo(0);
      }))
   

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
   getOrg = async (code) =>{
     Api.doFetch(`code?code=${code}`).then(org=>{
       let user = this.state.newUser;
       user.org = org;
       this.setState({newUser:user});
     })
     .catch(err=> err.then(err=>this.setState({hasError:true,err:err.error})));
    }
  render(){
    return(
      <div id="register" className=" page row-full">
       <h3 className="col-full">Sign-Up</h3>
       {this.state.hasError && <p className="error">{this.state.err}</p>} 
      <div className="siema  container col-center">{/* page one */}
     
        <form className="col-center container" onSubmit = {(e)=>{
          e.preventDefault();
          this.handleNext(e.target);
        }}>
          <div className="col-full">
          <label htmlFor="display_name">Display Name</label><br/>
          <input type="text" name="display_name" id="display_name" required/>
          </div>
          <div className="col-full">
          <label htmlFor="user_position">Position</label><br/>
          <select name="user_position" id="user_position">
            <option value="1">Junior</option>
            <option value="2">Senior</option>
            <option value="3">Management</option>
            <option value="4">Director</option>            
          </select>
          </div>
          
          <div className="col-full">
          <label htmlFor="user_name">User Name</label><br/>
          <input type="text" name="user_name" id="user_name" required/>
          </div>
          <div className="col-full">
          <label htmlFor="password">Password</label>
          <input onChange={(e)=>{
                if(validator(e.target.value))
                  this.setState({hasError:false,err:''});
                else
                this.setState({hasError:true,err:'Weak Password'});
              
          }} type="password" name="password" id="password" required/>
          </div>
          <div className="col-full">
          <label htmlFor="re-enter_password">Re-Enter Password</label>
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
          
          <div className="small_container col-full register-controls">
          <button className="col-1" id="reset" type="reset"onClick={(e)=>this.props.history.push('/')}> Cancel</button> 
          <button id="register_submit" className="col-right" type="submit" disabled>Next</button>
          </div>
        </form>
        <form className="container" id="org_form" onSubmit={async (e)=>{
          e.preventDefault();
          this.handleNext(e.target);
          if(this.state.isNewOrg){
           await this.createNewOrg(this.state.newUser.new_org_name)
           
          }//else
           // await this.handleSubmit();//todo maybe use promise.all to cancel if either fails
            await this.handleSubmit();
         
        }}
        
        onReset={(e)=>{
          this.seima.prev();
        }}>
        <div className="col-full small_container">
            <label id="newOrgLabel" htmlFor="newOrg">New Organization?</label>
            <input id="newOrg" name="newOrg" type="checkbox" className="checkbox" onChange={(e)=>{
              this.setState({isNewOrg : e.target.checked});
            }}/> 
            <label for="newOrg" class="switch"></label>
          </div>
          {!this.state.isNewOrg && <div className="col-full"><label htmlFor="org">Organization Code</label>
          <input id="org_code" name="org_code" type="text" required maxLength="8"
          onChange={(e)=>{
            if(e.target.value.length === 8)
            {
              this.getOrg(e.target.value);
            }
          }}
          />{this.state.newUser.org && <p>Organization Found: {this.state.newUser.org.org_name}</p>}</div>}
          {this.state.isNewOrg && <div>
            <label>Organization Name</label>
            <input name="new_org_name" id="new_org_name" onChange={(e)=> this.checkIfName(e.target.value)} type='text' required placeholder="Organization name"/>          </div>}
            {this.state.isNewOrg && this.state.nameTaken && <p className="error col-full">Can't Use That Name</p>}
            <span className="info col-full"> <span>Don't have an Organization Code?</span> <span>Contact your organization's administrator to retreive yours, or if you are an administrator try creating a new organization</span></span>
          <div className=" col-full small_container">
          <button className="col-1" type="reset">Go Back</button>
          <button  className="col-right" type="submit" disabled = {this.state.isNewOrg ? this.state.nameTaken : !this.state.newUser.org}>Submit</button>
          {/* page 3 start */}
          
          </div>
        </form>
        <div>
          {!this.state.newUser.org && <progress/>}
          {this.state.newUser.org && <h3>Welcome to {String(this.state.newUser.org.org_name)}</h3>}
          {this.state.newUser.org && this.state.newUser.org.code && <p> Your organization's invite code is [{this.state.newUser.org.code}]</p>}
          <p>Click <Link to="/login">Here</Link> to Log in</p>
        </div>
        </div>
      </div>
    );
  }
}