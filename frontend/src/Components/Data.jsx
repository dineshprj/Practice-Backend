import React, { useState, useEffect } from "react";

const Data = () => {

    const [form, setform] = useState({
        name:"",role:""
    });


    const [data, setdata] = useState([]);


    //Load data from backend

    const loaddata=async ()=>{
        const res=await fetch('http://localhost:3000/data');
        const result=await res.json();
        setdata(result.data);
    };


    useEffect(()=>{
        loaddata();
    },[]);

    //Handle Input

    const handlechange= (e)=>{
        setform({
            ...form,[e.target.name]:e.target.value
        });


    };


    //Submit Form

    const handlesubmit =async (e)=>{
        e.preventDefault();

        try{
            const res= await fetch('http://localhost:3000/data', {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(form)
            });

            const result =await res.json();
            
            if(!res.ok){
                alert(result.message); //show error
                return;
            }
            setform({name:"",role:""});
            loaddata(); //refresh data
        }
        catch(err)
        {
            console.log("Error",err.message);
        }
    };

  return (
    <div>
      <h1>User Form</h1>

      <form>
        <br />
        <label htmlFor="name">Name</label>

        <input type="text" placeholder="name" />

        <br />
        <br />

        <label htmlFor="role">Role</label>
        <input type="text" placeholder="role" />

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>

      <br />
      <br />
    </div>
  );
};

export default Data;
