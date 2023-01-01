//we will give timestamp, data , prevHash and so on as a inputs to SHA256 hash function to generate current block hash
import crypto from 'crypto'; // crypto module to import sha256 algorithm

// ...inputs is spread operator which allows you to take multiple inputs 
const cryptoHash=(...inputs)=>{
    const hash = crypto.createHash('sha256'); // tells that we want sha256 algorithm from library
    hash.update(inputs.sort().join('')); // joining/concatenating all inputs it will sort the inputs no matter hoe user passes info
    return hash.digest('hex');
}
