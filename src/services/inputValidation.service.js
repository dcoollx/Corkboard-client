export default{
  validatePassword(password){
    let test = new RegExp(/\w+(?=[!@#$%^*]){8,7}/)
  },
};