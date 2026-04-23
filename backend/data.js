

const fs =require('fs');
const path =require('path');
const data = (req, res) => {
  console.log(req.url, req.method);

// CORS

//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Methods','GET, POST');
//   res.setHeader('Access-Control-Allow-Headers','Content-Type');


// //Handle Prefight
//    if (req.method === 'OPTIONS') {
//     res.writeHead(204);
//     return res.end();
//   }


//   if(req.method==='POST' &&  req.url==='/formdata'){
//     let body='';

//     req.on('data', chunk=>{
//       body=body+chunk.toString();

//     });

//     req.on('end', ()=>{
//       try{
//         const parsed=JSON.parse(body);
//         res.writeHead(200, {'Content-Type':'application/json'});
//         res.end(JSON.stringify({
//           message:'Data received',
//           data:parsed
//         }));

//       }
//       catch(err){
//         res.writeHead(400,{'Content-Type':'application/json'});
//         res.end(JSON.stringify({error:'invalid  JSON'}));
//       }
//     });
//   }
//   else{
//     res.writeHead(404);
//     res.end();
//   }





if(req.url.startsWith('/files')){
  const filename=req.url.slice(7);
  const filepath =path.join(__dirname,'..','public',filename);


  const readstream =fs.createReadStream(filepath);

  readstream.on('error',()=>{
    res.writeHead(404);
    res.end("File not Found");
  });

  readstream.pipe(res);

}
else{
  res.writeHead(404);
  res.end("Route not found");
}












};





module.exports = data;

