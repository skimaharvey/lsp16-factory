import { ethers } from "ethers";

// Connect to the network
let provider = new ethers.providers.WebSocketProvider("https://ws-rpc.testnet.lukso.network");

// The address that the Contract WILL BE deployed to when we deploy it (replace with your contract address)
let contractAddress = "0xfB10A65e5f0402b8e9D4Ca84D0F367F0779Cc67F";

// The Contract interface
let abi = [
  // ERC721 Transfer event
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
let contract = new ethers.Contract(contractAddress, abi, provider);

contract.on("Transfer", (from, to, tokenId, event) => {
  // This will be called when a Transfer event is emitted
  console.log(`Transfer event. From: ${from}, To: ${to}, TokenId: ${tokenId.toString()}`);
});

// In case of any errors
contract.on("error", (error, event) => {
  console.log(error, event);
});
