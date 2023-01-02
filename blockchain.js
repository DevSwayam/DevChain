import {Block} from './block.js';
import { cryptoHash } from './crypto-hash.js';

export class Blockchain{
    constructor(){
        this.chain = [Block.genesis()]; // array represents chain of blocks and on 0th index we are initialising it with genesis block
    }
    addBlock({data}){ // will take data
        const newBlock = Block.mineBlock({ // will pass this data amd prevBlock to mine function and it willr eturn new mined block
            prevBlock : this.chain[this.chain.length-1],
            data : data,
        });
        this.chain.push(newBlock);// weill push this mined block in chain
    }
    replaceChain(chain){ // to select longest chain by miners to update
        if(chain.length<=this.chain.length){ // the chain which is miner sending should be greater than current chain
            console.error("Incoming chain has less proof of work"); // or throw error
        }
        if(!blockchain.isValidChain(chain)){ // if the chain is big then check if it is actually legit 
            console.error("Incomin chain is not valid");
        }
        this.chain = chain;
    }

    static isValidChain(chain){ // is chain valid?
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){ // both objects are of different types henece we are converting them into strings to compare
            return false;
        }
        for(let i = 1; i<chain.length;i++){
            const {timestamp,prevHash,hash,data,nonce,difficulty} =chain[i];
            const realLastHash = chain[i-1].hash;
            const validatedHash = cryptoHash(timestamp,prevHash,data,nonce,difficulty);
            if(prevHash !== realLastHash){
                return false;
            }
            if(hash!==validatedHash){ // current block hash should be equal to miners sended hash no tampering of data
                return false;
            }
        }
        return true;
    }
}


const blockchain = new Blockchain();
blockchain.addBlock({data: "swayam hu bhai"});
const result = Blockchain.isValidChain(blockchain.chain);
console.log(result,blockchain.chain);
