import Web3 from "web3";
import Build from "./alphaByte.json";

let tokenContract: any;
// let window: any;
if ((window as any).ethereum) {
  (window as any).ethereum.send("eth_requestAccounts");
  (window as any).web3 = new Web3((window as any).ethereum);

  // if ((window as any).web3 && (window as any).web3.currentProvider) {
  //   const web3 = new Web3((window as any).web3.currentProvider);

  const { abi } = Build;

  tokenContract = new (window as any).web3.eth.Contract(
    abi as any,
    // "0xC6fE932e671aEe37Fe232143d4B105AF63fD751a" // kovan network
    // "0x726883710b0D8420bfCFB801C03E93950D1aD363" //rinkeby
     "0x0075Ce3F8d2CECaE84600D4A1F8675a72819896d" // mainnet 
  );
}

export default tokenContract;

// import Web3 from "web3";
// const CPRABI = require("./Popelon.json");

// const web3 = new Web3(Web3.givenProvider);
// const addr = "0xfD558ad70A4197fc024645512c34928eb2c1284a";
// const { abi } = CPRABI;
// const tokenContract = new web3.eth.Contract(abi, addr);

// export default tokenContract;
