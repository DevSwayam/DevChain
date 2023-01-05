import express, { response } from 'express';
import { Blockchain } from './blockchain.js';
import bodyParser from 'body-parser';
import { PubSub } from './publishsubscribe.js';
import request from 'request';

const app = express();// to use expree on app
const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain});

const DEFAULT_PORT = 3000;
let PEER_PORT;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

 setTimeout(() => pubsub.broadcastChain(), 1000); 


 const syncChain =()=>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body)=>{
        if(!error && response.statusCode===200){
            const rootChain = JSON.parse(body);
            console.log("replace chain on sync with ", rootChain);
            blockchain.replaceChain(rootChain);
        }
    })
 }
app.use(bodyParser.json());
//app.get for reading data from server  
app.get('/api/blocks',(req,res)=>{ // whenever we {call /api/blocks} we want system to return blockchain data  
    res.json(blockchain.chain); // what we want in response and as we get response in terms of json we convert it into json
})



//app.post for writing data 
app.post('/api/mine', (req,res)=>{
    const {data} = req.body; //
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/api/blocks');
});



if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT ; 
app.listen(PORT,()=>{

    console.log(`listening to PORT:${PORT}`);
    syncChain();
});