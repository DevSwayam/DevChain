
import {GENESIS_BLOCK} from "./config.js"; // imported our genesis block 
import {cryptoHash} from "./crypto-hash.js";

export class Block{

    // Every block need to be intialize with below values 
    constructor({timestamp,prevHash,hash,data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }

    // as genesis block is a static data and wont change hence we use static method
    static genesis(){
        return new this(GENESIS_BLOCK); // whenever someone calls it will return this genesis block data
    }

    static mineBlock({prevBlock,data}){ // will take inputs and mine block
        const timestamp = Date.now(); // current date
        const prevHash = prevBlock.hash; // take previous block hash as current block prevHash
        return new Block({ // will call constructor of this class function and constructor will get all this arguments and block will be created
            timestamp,
            prevHash,
            data,
            hash : cryptoHash(timestamp,prevHash,data)
        })
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