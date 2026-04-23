const express=require('express');
const app=express();


//Route
app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/about',(req,res)=>{

    res.send(` <h1>This is about page</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos modi minus illo?</p>`);
});

app.get('/help',(req,res)=>{
    res.send(`this is help section
        you can ask for help  us` );
});

app.get('/api',(req,res)=>{
    res.json({
        name:"Dinesh",
        role:"Developer"
    });
});


app.use(express.json());

app.post('/data',(req,res)=>{
    console.log(req.body);
    res.json({
        message:"Data recieved",
        data: req.body
    });
});

app.get('/data',(req,res)=>{
    res.send('data  is sucessfully uploadeed');
})

//Start server

app.listen(3000,()=>{
    console.log('Server   is running on http://localhost:3000');
});