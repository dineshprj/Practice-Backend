    const http=require('http');
    const data=require('./data');

    const server = http.createServer(data);

    server.listen(3000,()=>{
        console.log('Server is running on http://localhost:3000');
    });