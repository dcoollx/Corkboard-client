
let test = {
testNotices : (howMany=1)=> {
   let result = [];
   for(let x =0; x<= howMany;x++)
    result.push({
  id:x,title:'Not connected to server',content:'Check your internet connection or report a buf [here](http://www.google.com)',created_by:'admin',created:new Date()});
  return result;
},

 testComments : (how_many=1)=>{
  let result = [];
  for(let x = 0;x<=how_many;x++)
    result.push({id:x,content:'this is a test comment',created_by:1,created:new Date(),on:1})
return result;

},
testOrg : (howMany=1)=>{
  let result = [];
  for(let x = 0;x<=howMany;x++)
    result.push({id:x,org_name:'this is a test comment',admin:x})
return result;

},
testTeam : (howMany=1) =>{
  let result = [];
  for(let x = 0;x<=howMany;x++)
    result.push({id:x,team_name:'this is a test comment',admin:x, parent:x})
return result;

}
}

export default test;