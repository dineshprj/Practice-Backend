const fs=require('fs').promises;
const { read, write } = require('fs');
const url=require('url');

const FILE='./task.json';

//Read task

async function readtask() {
    try{
        const data =await fs.readFile(FILE,'utf-8');
        return JSON.parse(data);
    }
    catch{
        return [];
    }
    
}

//Write Tasks

async function writetask(task) {
    await fs.writeFile(FILE,JSON.stringify(task,null,2));

}

//send response

function send(res,status,data){
    res.writeHead(status,{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
        'Access-Control-Allow-Headers':'Content-Type'
    });

    res.end(JSON.stringify(data));

}

const task= async (req,res)=>{
    const parsed =url.parse(req.url,true);
    const path=parsed.pathname;
    const method=req.method;


//CORS Origin

if(method==='OPTIONS'){
    res.writeHead(204);
    return res.end();

}

//Get Task

if(method==='GET' && path ==='/task'){
    const task = await readtask();
    return send(res,200, task);
}


//POST Task

if(method==='POST' && path==='/task'){
    let body='';
    req.on('data',chunk=>body+=chunk.toString());

    req.on('end', async()=>{
        try{
            const {text}=JSON.parse(body);

            if(!text) return send(res,400,{error:"Text required"});

            const task=await readtask();

            const newtask={
                id: Date.now(),
                text,
                completed: false
            };

            task.push(newtask);

        }
        catch{
            send(res,400,{error:"INvalid  JSON"});

        }
    });
    return;
}


//Delete Task
const delmatch=path.match(/^\/task\/(\d+)$/);

if (method==='DELETE' && delmatch){
    const id= parseInt(delmatch[1]);

    const task=await readtask();
    const updated=task.filter(t =>t.id!==id);

    await writetask(updated);

    return send(res, 200, {message:'deleted'});
}

// Put task

const putmatch=path.match(/^\/task\/(d+)$/);

if(method==='PUT' && putmatch){
    const id=parseInt(putmatch[1]);

    let body='';
    req.on('data', chunk=>body+=chunk.stringify());

    req.on('end',async ()=>{
        try{
            const update=JSON.parse(body);
            const task=await readtask();

            const index= task.findIndex(t=>t.id===id);
            if(index===-1) return send(res,404,{error:'Not Found'});

            task[index]={...task[index],...update};
            await writetask(task);

            send(res,200,task[index]);

        }
        catch{
            send(res,400,{error: 'Invalid Json'});
        }
    });
    return;
}
}