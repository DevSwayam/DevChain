import {Block} from './block.js';

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

    static isValidChain(chain){ // is chain valid?
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){ // both objects are of different types henece we are converting them into strings to compare
            return false;
        }
        for(let i = 1; i<chain.length;i++){
            const {timestamp,prevHash,hash,data} =chain[i];
            const realLastHash = chain[i-1].hash;
            if(prevHash !== realLastHash){
                return false;
            }
        }
    }
}


const blockchain = new Blockchain();
blockchain.addBlock({data: "swayam hu bhai"});

console.log(blockchain);
