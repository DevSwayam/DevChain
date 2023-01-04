import hexToBinary from "hex-to-binary";
import {GENESIS_BLOCK, mining_rate} from "./config.js"; // imported our genesis block 
import {cryptoHash} from "./crypto-hash.js";
// just checking if branch is working or not


export class Block{

    // Every block need to be intialize with below values 
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    // as genesis block is a static data and wont change hence we use static method
    static genesis(){
        return new this(GENESIS_BLOCK); // whenever someone calls it will return this genesis block data
    }

    static mineBlock({prevBlock,data}){ // will take inputs and mine block
        let hash,timestamp;
        let nonce =0;
        let {difficulty} = prevBlock;
        //const timestamp = Date.now(); // current date
        const prevHash = prevBlock.hash; // take previous block hash as current block prevHash
        do {
            nonce++; // keep increasing nonce till you get hash of certain difficulty
            timestamp=Date.now(); // constantlly updating timestamp of when block is going to get created
            difficulty = Block.adjustDifficulty({originalBlock : prevBlock,timestamp})
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);
        } while (hexToBinary(hash).substring(0,difficulty) !== '0'.repeat(difficulty));// jab tak hash ke first two character 00 na ho jaye tab tak keep finding hash
        return new Block({ // will call constructor of this class function and constructor will get all this arguments and block will be created  
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash,
        })
    }

    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty} = originalBlock;
        if(difficulty<1){
            return difficulty=1;
        }
        const differnce = timestamp-originalBlock.timestamp;
        if(differnce>mining_rate){
            return difficulty-1;
        }else{
            return difficulty+1;
        }
    }
    
}

//creating a sample block
const block1 = new Block({timestamp : '1/1/1' , 
                            prevHash :'0x' , 
                            hash :'0x' ,
                            data :'hello'
                        });

/*
const newGenesis = Block.genesis();
console.log(newGenesis); */