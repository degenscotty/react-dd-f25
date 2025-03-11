# Smart Contract Deployment Guide

This guide explains how to deploy the MessageContract and connect it to your DApp.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Hardhat](https://hardhat.org/) or [Foundry](https://book.getfoundry.sh/)
- MetaMask or another Ethereum wallet
- Some Sepolia testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

## Deployment Steps

### Option 1: Deploy with Hardhat

1. Create a new Hardhat project:
```bash
mkdir message-contract
cd message-contract
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
npx hardhat init
```

2. Copy `MessageContract.sol` to the `contracts` folder

3. Create a deployment script in `scripts/deploy.js`:
```javascript
const hre = require("hardhat");

async function main() {
  const MessageContract = await hre.ethers.getContractFactory("MessageContract");
  const contract = await MessageContract.deploy();
  await contract.deployed();
  console.log("MessageContract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

4. Configure Hardhat in `hardhat.config.js`:
```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

5. Create a `.env` file with:
```
PRIVATE_KEY=your_wallet_private_key
INFURA_API_KEY=your_infura_api_key
```

6. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Option 2: Deploy with Remix

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `MessageContract.sol` and paste the contract code
3. Compile the contract (Solidity compiler tab)
4. Deploy to Sepolia testnet (Deploy & Run Transactions tab)
   - Select "Injected Provider - MetaMask" as environment
   - Make sure your wallet is connected to Sepolia
   - Deploy and confirm the transaction
5. Note the contract address after deployment

## Connecting to Your DApp

1. Update `src/contract/contractConfig.js` with your deployed contract address:
```javascript
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

2. Make sure your `.env` file contains the WalletConnect project ID:
```
REACT_APP_PROJECT_ID=your_walletconnect_project_id
```
   - If you don't have one, get it from [WalletConnect Cloud](https://cloud.walletconnect.com/)

3. Test your DApp to ensure it connects to the contract:
   - Start your app: `yarn start`
   - Connect your wallet
   - Check if the initial message displays correctly
   - Try updating the message

## Troubleshooting

- **Contract interactions fail**: Ensure you're on the Sepolia network in your wallet
- **Cannot read contract data**: Verify that the CONTRACT_ADDRESS and ABI match your deployed contract
- **Transaction errors**: Check console logs for specific error messages
- **Wallet not connecting**: Ensure your project ID is correct in the .env file

## Production Considerations

For production deployments, consider:
- Using a mainnet or production-ready L2 like Arbitrum or Optimism
- Implementing proper contract security measures (reentrancy guards, access control)
- Adding events to the contract for better front-end tracking
- Adding more comprehensive error handling 