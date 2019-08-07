import config from '../config';
export default {
  hasAuthToken(){
    if(sessionStorage.getItem(config._Token_Location))
      return true;
    else
      return false;

  },
  getAuthToken(){
    return sessionStorage.getItem(config._Token_Location);
  },
  clearAuthToken(){
    sessionStorage.clear();
  },
  setAuthToken(token){
    sessionStorage.setItem(config._Token_Location,token);
  },
  encodeUsername(username, password){
    return btoa(username + ':' + password);
  }
}