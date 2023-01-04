import express from 'express';
import { Blockchain } from './blockchain.js';
import bodyParser from 'body-parser';

const app = express();// to use expree on app
const blockchain = new Blockchain();


app.use(bodyParser.json());
//app.get for reading data from server  
app.get('/api/blocks',(req,res)=>{ // whenever we {call /api/blocks} we want system to return blockchain data  
    res.json(blockchain.chain); // what we want in response and as we get response in terms of json we convert it into json
})

//app.post for writing data 
app.post("/app/mine", (req,res)=>{
    const {data} = req.body; //
    blockchain.addBlock({data});
    res.redirect("/api/blocks");
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`listening to PORT:${PORT}`);
})