import tokenService from "./token.service";
import config from '../config';


export default class Api{
  development = true;
  static url = config._API_ENDPOINT;
  static Api_Key = '';
  static doFetch(endpoint,options= {Method:'GET', headers:new Headers({'content-type':'application/json'})}){
    if(tokenService.hasAuthToken())
      options.headers.set('Authorization','bearer ' + tokenService.getAuthToken());
    return fetch(this.url + endpoint,options).then(res=>{
      if(!res.ok)
        return Promise.reject(res.json()); //return res.json().then(err=>Promise.reject(err))
      else
        return res.json();
    })
  }
}