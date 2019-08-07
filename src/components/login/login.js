import React from 'react';
export default function(props){
  return(
    <div>
      Sign in page
      <form onSubmit={(e)=>{
        e.preventDefault();
        props.signIn();
        //then->
        props.history.push('/');
      }}>
        <label>username</label>
        <input type="test"/>
        <label>password</label>
        <input type="password"/>
        <button type="submit">Sign in</button>
      </form>
      <a href="www.google.com">Already a user</a>
      <button onClick={(e)=>props.history.push('/')}>go back</button>
    </div>
  );
}