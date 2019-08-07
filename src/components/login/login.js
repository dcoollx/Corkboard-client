import React from 'react';
export default function(props){
  return(
    <div>
      Login in page
      <form onSubmit={(e)=>{
        e.preventDefault();
        props.signIn(e.target.user_name.value,e.target.password.value,e.target.org_name.value)
          .then((x)=>props.history.push('/')).catch((err)=>{
            console.log(err);
          });
        //then->
        
      }}>
        <label>username</label>
        <input htmlFor="user_name" type="test" name="user_name" id="user_name"/>
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password"/>
        <label htmlFor="org_name">Organization</label>
        <input type="text" id="org_name" name="or_name" defaultValue={localStorage.getItem('org_name')|| ''}/>
        <button type="submit">Sign in</button>
      </form>
      <a href="www.google.com">Already a user</a>
      <button onClick={(e)=>props.history.push('/')}>go back</button>
    </div>
  );
}