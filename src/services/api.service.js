import tokenService from "./token.service";


export default class Api{
  development = true;
  static url = 'https://murmuring-island-24347.herokuapp.com/'
  static Api_Key = '';
  static doFetch(endpoint,options= {Method:'GET', headers:new Headers({'content-type':'application/json'})}){
    if(tokenService.hasAuthToken())
      options.headers.set('Authorization','bearer ' + tokenService.getAuthToken());
    return fetch(this.url + endpoint,options).then(res=>{
      if(!res.ok)
        return Promise.reject(res.json());
      else
        return res.json();
    })
  }
}