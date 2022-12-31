import {GENESIS_DATA} from "./config.js";

class Block{
    constructor({timestamp,prevHash,hash,data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
}


const block1 = new Block({timestamp : '1/1/1' , 
                            prevHash :'0x' , 
                            hash :'0x' ,
                            data :'hello'
                        });
const genesisBlock = Block.genesis();
console.log(block1);
console.log(genesisBlock);