import React from 'react';
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
   handleSubmit = async (form) => {
     let {display_name, user_name, password, org, position} = form;
     if(!form.newOrg.checked)
      org.id = await this.checkIfName(org.value,org);
    else{
      let options = {
        method:'POST',
        headers: new Headers({'Content-type':'application/json'}),
        body:JSON.stringify({org_name:org.value})
      };
      org = await Api.doFetch('register/orgs',options);
      
      }
     window.org = org;
     if(org){//returns org id if it exsist and false if it doesnt
     let newUser = {display_name:display_name.value, user_name:user_name.value, password:password.value, org:org.id, user_position:position.value};
     console.log(newUser);
     let options ={
       method:'POST',
       headers: new Headers({'Content-type':'application/json'}),
       body: JSON.stringify(newUser)
     };
     console.log('code gets here')
     Api.doFetch('register/user',options)
      .then(res=>{
        this.setState({hasError:false,err:null});
        this.props.history.push('/');
      })
      .catch(err=> err.then(err=>this.setState({hasError:true,err:err.error})))
    }else{
      this.setState({hasError:true,err:'that org doesnt exist'});

    }

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
          <label htmlFor="position">Position</label><br/>
          <select name="position" id="position">
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
          
          <div className="container register-controls"> 
          <button id="register_submit" className="col-1" type="submit" disabled>Submit</button>
          <button className="col-right" id="reset" type="reset"onClick={(e)=>this.props.history.push('/')}>cancel</button>
          </div>
        </form>
        <form onSubmit={(e)=>{
          e.preventDefault();
          this.handleNext(e.target)
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
        </div>
      </div>
    );
  }
}