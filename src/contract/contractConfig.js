// Contract ABI - this should match your deployed contract
export const messageContractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"updateMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Contract address on Sepolia testnet
// Replace this with your actual deployed contract address
export const CONTRACT_ADDRESS = "0x23a861F9223a36A5e4BfA05568C9c16CE398d3A0";

// Chain configuration
export const CHAIN_ID = 11155111; // Sepolia testnet 