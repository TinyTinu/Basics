const Web3 = require('web3');
const cron = require('node-cron');

// Web3 provider for the desired network (e.g., Infura)
const web3Provider = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));

// Core wallet's Ethereum address and private key
const coreWalletAddress = '0x...'; // Replace with the core wallet's Ethereum address
const coreWalletPrivateKey = 'YOUR_PRIVATE_KEY'; // Replace with the core wallet's private key

// Admin's Ethereum address
const adminAddress = '0x...'; // Replace with the admin's Ethereum address

// Registered user addresses (you can fetch these from your database)
const registeredUserAddresses = [
  '0x...', // Replace with registered user addresses
  '0x...',
  // Add more registered user addresses here
];

// Function to process the deposit for a user
async function processDeposit(userAddress, depositAmount) {
  try {
    // Your logic to handle the deposit for each user (e.g., update database, etc.)
    console.log(`Processing deposit for user ${userAddress}. Amount: ${depositAmount}`);

    // Transfer the deposit to the admin
    const txReceipt = await transferToAdmin(userAddress, depositAmount);
    console.log(`Deposit transferred to admin. Transaction hash: ${txReceipt.transactionHash}`);
  } catch (err) {
    console.error(`Error processing deposit for user ${userAddress}:`, err);
  }
}

// Function to transfer deposit to the admin
async function transferToAdmin(fromAddress, depositAmount) {
  try {
    // Create the transaction object
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 200000; // Replace with an appropriate gas limit
    const transactionObject = {
      from: fromAddress,
      to: adminAddress,
      value: depositAmount,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
    };

    // Sign the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, coreWalletPrivateKey);

    // Send the signed transaction to the Ethereum network
    const txReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    return txReceipt;
  } catch (err) {
    throw err;
  }
}

// Cron job to process deposits
cron.schedule('*/5 * * * *', async () => {
  try {
    // Get the latest block number
    const latestBlockNumber = await web3.eth.getBlockNumber();
    console.log('Latest block number:', latestBlockNumber);

    // Your logic to fetch global deposit and process for registered users
    // Replace this with your method to get global deposit from the contract
    const globalDeposit = await getGlobalDeposit();

    // Process deposits for registered users
    for (const userAddress of registeredUserAddresses) {
      // Your logic to fetch user's deposit from the contract
      // Replace this with your method to get user's deposit from the contract
      const userDeposit = await getUserDeposit(userAddress);

      if (userDeposit > 0) {
        await processDeposit(userAddress, userDeposit);
      }
    }
  } catch (err) {
    console.error('Error in cron job:', err);
  }
});

// Helper functions to fetch global and user deposits from the contract
async function getGlobalDeposit() {
  // Implement your logic to fetch global deposit from the contract
  // Example: return contract.methods.getGlobalDeposit().call();
  return 0;
}

async function getUserDeposit(userAddress) {
  // Implement your logic to fetch user's deposit from the contract
  // Example: return contract.methods.getUserDeposit(userAddress).call();
  return 0;
}
