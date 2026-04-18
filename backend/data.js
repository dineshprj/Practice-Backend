const data = (req, res) => {
  console.log(req.url, req.method);

// CORS

  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');


//Handle Prefight
   if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }


  if(req.method==='POST' &&  req.url==='/api/data'){
    let body='';

    req.on('data', chunk=>{
      body=body+chunk.toString();

    });

    req.on('end', ()=>{
      try{
        const parsed=JSON.parse(body);
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify({
          message:'Data received',
          data:parsed
        }));

      }
      catch(err){
        res.writeHead(400,{'Content-Type':'application/json'});
        res.end(JSON.stringify({error:'invalid  JSON'}));
      }
    });
  }
  else{
    res.writeHead(404);
    res.end();
  }
};

module.exports = data;

