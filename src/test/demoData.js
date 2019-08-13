 let testNotices =(howMany)=> {
   let result = [];
   for(let x =0; x<= howMany;x++)
    result.push({
  id:x,title:'Not connected to server',content:'Check your internet connection or report a buf [here](http://www.google.com)',created_by:'admin',created:new Date()});
  return result;
}

function testComments(how_many){
  let result = [];
  for(let x = 0;x<=how_many;x++)
    result.push({id:x,content:'this is a test comment',created_by:1,created:new Date(),on:1})
return result;

}


export {testNotices, testComments};