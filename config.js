// this is genesis block and wont chage
export const mining_rate = 1000; // 1s = 1000ms 
const INITIAL_DIFFICULTY = 2;
export  const GENESIS_BLOCK ={
        timestamp:'1/1/2023;',
        prevHash: '0x000', 
        hash:'0x123',
        data:[],
        owner:'DevSwayam',
        nonce:0,
        difficulty:INITIAL_DIFFICULTY
}

