<<<<<<< HEAD
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

=======
const MINE_RATE = 1000; //1s = 1000ms
const INITIAL_DIFFICULTY = 2;
const GENESIS_DATA = {
  timestamp: 1,
  prevHash: "0x000",
  hash: "0x123",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [],
};
module.exports = { GENESIS_DATA, MINE_RATE };
>>>>>>> 010c5c42f8de8799d98ab7a2cb9cc5a508397eea
