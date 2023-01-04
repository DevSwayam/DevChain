
import {GENESIS_BLOCK, mining_rate} from "./config.js"; // imported our genesis block 
import {cryptoHash} from "./crypto-hash.js";

const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;


    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now(); //00cdef ,00
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );
    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }


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
        } while (hash.substring(0,difficulty) !== '0'.repeat(difficulty));// jab tak hash ke first two character 00 na ho jaye tab tak keep finding hash
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
    

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

const block1 = new Block({
  hash: "0xacb",
  timestamp: "2/09/22",
  prevHash: "0xc12",
  data: "hello",
});

// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result = Block.mineBlock({ prevBlock: block1, data: "block2" });
// console.log(result);
// //console.log(block1);
module.exports = Block;