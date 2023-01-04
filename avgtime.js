<<<<<<< HEAD
import {Blockchain} from './blockchain.js'; 
const blockchain = new Blockchain();

blockchain.addBlock({data :"new Data"});
let prevTimestamp,nextTimestamp,nextBlock,timeDiff,averageTime;

const times = [];

for(let i =0; i<1000 ;i++){
    prevTimestamp=blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data : `block ${i}`});
    nextBlock=blockchain.chain[blockchain.chain.length-1];
    nextTimestamp=nextBlock.timestamp;

    timeDiff = nextTimestamp-prevTimestamp;
    times.push(timeDiff);

    averageTime = times.reduce((total,num) => total+num)/times.length;
    console.log(`Block mined at time: ${nextBlock.timestamp} Time to mine block : ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, Average time :${averageTime}ms`);
=======
import {Blockchain} from './blockchain.js';

const blockChain = new Blockchain();


const Blockchain = require("./blockchain");
const blockchain = new Blockchain();

blockchain.addBlock({ data: "new data" });
console.log(blockchain.chain[blockchain.chain.length - 1]);
let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;

const times = [];

for (let i = 0; i < 1000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

  blockchain.addBlock({ data: `block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;

  timeDiff = nextTimestamp - prevTimestamp;

  times.push(timeDiff);

  averageTime = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to mine block :${timeDiff}ms,Difficulty:${nextBlock.difficulty},Average time:${averageTime}ms`
  );
>>>>>>> 010c5c42f8de8799d98ab7a2cb9cc5a508397eea
}
