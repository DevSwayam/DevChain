
import {GENESIS_BLOCK} from "./config.js"; // imported our genesis block 

class Block{

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

    
}

//creating a sample block
const block1 = new Block({timestamp : '1/1/1' , 
                            prevHash :'0x' , 
                            hash :'0x' ,
                            data :'hello'
                        });

const newGenesis = Block.genesis();
console.log(block1);
console.log(newGenesis);