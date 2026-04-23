    const express=require('express');
    const app=express();

    const cors=require('cors');
    
    app.use(cors());


    //Route

    app.use(express.json());

    let storedata=[]; //Store Data

    app.post('/data',(req,res)=>{
        console.log(req.body);

        const {name,role}=req.body;
  

        if(!name || !role){
            return res.status(400).json({
                message :" name and role are requireed"
            });
        }
              const data={name,role};


        storedata.push(data);  //store here

        res.status(201).json({
            message:"Data recieved",
            data: data
        });
    });


    //Get -return Data

    app.get('/data',(req,res)=>{
        res.json({
            data:storedata
        });
    });

    //Start server

    app.listen(3000,()=>{
        console.log('Server   is running on http://localhost:3000');
    });