//Check one
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

// Web3 provider for the desired network (e.g., Infura)
const web3Provider = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));

// Sender's account address and private key
const senderAddress = '0x...'; // Replace with the sender's Ethereum address
const privateKey = Buffer.from('PRIVATE_KEY', 'hex'); // Replace with the sender's private key

// Recipient's Ethereum address
const recipientAddress = '0x...'; // Replace with the recipient's Ethereum address

// Tether (USDT) token contract address and ABI
const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const usdtABI = [/* ... */]; // Replace with the Tether token contract ABI

// Tether token contract instance
const usdtContract = new web3.eth.Contract(usdtABI, usdtContractAddress);

// Number of USDT tokens to send (in the smallest unit of the token, e.g., 6 decimals for USDT)
const amountToSend = '100000000'; // Replace with the desired amount (e.g., 100 USDT)

async function sendUSDT() {
  try {
    // Get the transaction count of the sender's address
    const nonce = await web3.eth.getTransactionCount(senderAddress, 'pending');

    // Prepare the data to call the transfer function on the Tether contract
    const data = usdtContract.methods.transfer(recipientAddress, amountToSend).encodeABI();

    // Get the gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Create the transaction object
    const transactionObject = {
      from: senderAddress,
      to: usdtContractAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(80000), // Replace with an appropriate gas limit
      nonce: web3.utils.toHex(nonce),
      data: data
    };

    // Sign the transaction
    const tx = new Tx(transactionObject, { 'chain': 'mainnet' }); // Use 'rinkeby' for the Rinkeby testnet
    tx.sign(privateKey);

    // Serialize the signed transaction
    const serializedTx = tx.serialize();

    // Send the transaction to the Ethereum network
    const transactionHash = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log('Transaction hash:', transactionHash);
  } catch (err) {
    console.error('Error sending USDT:', err);
  }
}

sendUSDT();

// Another checj

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

// Web3 provider for the desired network (e.g., Infura)
const web3Provider = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));

// Sender's account address and private key (user making the initial deposit)
const senderAddress = '0x...'; // Replace with the sender's Ethereum address
const privateKey = Buffer.from('PRIVATE_KEY', 'hex'); // Replace with the sender's private key

// ERC-20 token contract address and ABI
const tokenContractAddress = '0x...'; // Replace with the ERC-20 token contract address
const tokenABI = [/* ... */]; // Replace with the ERC-20 token contract ABI

// Admin's Ethereum address
const adminAddress = '0x...'; // Replace with the admin's Ethereum address

// Number of tokens to transfer (in the smallest unit of the token, e.g., 18 decimals for DAI, USDT)
const amountToSend = '1000000000000000000'; // Replace with the desired amount

async function transferTokens() {
  try {
    // ERC-20 token contract instance
    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    // Get the transaction count of the sender's address
    const nonce = await web3.eth.getTransactionCount(senderAddress, 'pending');

    // Prepare the data to call the transfer function on the token contract
    const data = tokenContract.methods.transfer(tokenContractAddress, amountToSend).encodeABI();

    // Get the gas price
    const gasPrice = await web3.eth.getGasPrice();

    // Create the transaction object
    const transactionObject = {
      from: senderAddress,
      to: tokenContractAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(80000), // Replace with an appropriate gas limit
      nonce: web3.utils.toHex(nonce),
      data: data
    };

    // Sign the transaction
    const tx = new Tx(transactionObject, { 'chain': 'mainnet' }); // Use 'rinkeby' for the Rinkeby testnet
    tx.sign(privateKey);

    // Serialize the signed transaction
    const serializedTx = tx.serialize();

    // Send the transaction to the Ethereum network
    const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

    // Get the transaction hash
    const transactionHash = receipt.transactionHash;
    console.log('Transaction hash:', transactionHash);

    // Transfer tokens from the token contract to the admin address
    const transferReceipt = await tokenContract.methods.transfer(adminAddress, amountToSend).send({ from: tokenContractAddress });
    console.log('Transfer receipt:', transferReceipt);
  } catch (err) {
    console.error('Error transferring tokens:', err);
  }
}

transferTokens();


//Check 3
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;

// Web3 provider for the desired network (e.g., Infura)
const web3Provider = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));

// Sender's account address and private key
const senderAddress = '0x...'; // Replace with the sender's Ethereum address
const privateKey = Buffer.from('PRIVATE_KEY', 'hex'); // Replace with the sender's private key

// ERC-20 token contract address and ABI
const tokenContractAddress = '0x...'; // Replace with the ERC-20 token contract address
const tokenABI = [/* ... */]; // Replace with the ERC-20 token contract ABI

// Array of user addresses to transfer tokens to
const userAddresses = ['0x...', '0x...', '0x...', /* Add more user addresses here */];

// Number of tokens to transfer per user (in the smallest unit of the token, e.g., 18 decimals for DAI, USDT)
const amountToSend = '1000000000000000000'; // Replace with the desired amount

async function transferTokens() {
  try {
    // ERC-20 token contract instance
    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    // Get the transaction count of the sender's address
    const nonce = await web3.eth.getTransactionCount(senderAddress, 'pending');

    // Prepare the data to call the transfer function on the token contract
    const data = tokenContract.methods.transfer('PLACEHOLDER_ADDRESS', amountToSend).encodeABI();

    // Get the gas price
    const gasPrice = await web3.eth.getGasPrice();

    for (const userAddress of userAddresses) {
      // Replace the 'PLACEHOLDER_ADDRESS' in the data with the current user address
      const transferData = data.replace('PLACEHOLDER_ADDRESS', userAddress);

      // Create the transaction object
      const transactionObject = {
        from: senderAddress,
        to: tokenContractAddress,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(80000), // Replace with an appropriate gas limit
        nonce: web3.utils.toHex(nonce),
        data: transferData,
      };

      // Sign the transaction
      const tx = new Tx(transactionObject, { 'chain': 'mainnet' }); // Use 'rinkeby' for the Rinkeby testnet
      tx.sign(privateKey);

      // Serialize the signed transaction
      const serializedTx = tx.serialize();

      // Send the transaction to the Ethereum network
      const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
      console.log(`Tokens transferred to ${userAddress}. Transaction hash:`, receipt.transactionHash);
    }
  } catch (err) {
    console.error('Error transferring tokens:', err);
  }
}

transferTokens();

//Check 4
const Web3 = require('web3');
const cron = require('node-cron');
const Tx = require('ethereumjs-tx').Transaction;

// Web3 provider for the desired network (e.g., Infura)
const web3Provider = 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY';
const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));

// Sender's account address and private key (admin account)
const senderAddress = '0x...'; // Replace with the sender's Ethereum address
const privateKey = Buffer.from('PRIVATE_KEY', 'hex'); // Replace with the sender's private key

// ERC-20 token contract address and ABI
const tokenContractAddress = '0x...'; // Replace with the ERC-20 token contract address
const tokenABI = [/* ... */]; // Replace with the ERC-20 token contract ABI

// Admin's Ethereum address
const adminAddress = '0x...'; // Replace with the admin's Ethereum address

// User addresses with their corresponding deposited token balances
const userDeposits = {
  '0xUser1': '1000000000000000000', // User1's balance in the smallest token unit (wei)
  '0xUser2': '500000000000000000', // User2's balance in the smallest token unit (wei)
  // Add more user addresses and balances as needed
};

async function transferTokens() {
  try {
    // ERC-20 token contract instance
    const tokenContract = new web3.eth.Contract(tokenABI, tokenContractAddress);

    // Get the gas price
    const gasPrice = await web3.eth.getGasPrice();

    for (const userAddress in userDeposits) {
      // Get the transaction count of the sender's address
      const nonce = await web3.eth.getTransactionCount(senderAddress, 'pending');

      // Prepare the data to call the transfer function on the token contract
      const amountToSend = userDeposits[userAddress];
      const data = tokenContract.methods.transfer(userAddress, amountToSend).encodeABI();

      // Create the transaction object
      const transactionObject = {
        from: senderAddress,
        to: tokenContractAddress,
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(80000), // Replace with an appropriate gas limit
        nonce: web3.utils.toHex(nonce),
        data: data,
      };

      // Sign the transaction
      const tx = new Tx(transactionObject, { 'chain': 'mainnet' }); // Use 'rinkeby' for the Rinkeby testnet
      tx.sign(privateKey);

      // Serialize the signed transaction
      const serializedTx = tx.serialize();

      // Send the transaction to the Ethereum network
      const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
      console.log(`Tokens transferred to ${userAddress}. Transaction hash:`, receipt.transactionHash);
    }

    // After transferring to users, transfer tokens to the admin
    const adminBalance = web3.utils.toWei('100', 'ether'); // Example: Transfer 100 tokens to admin
    const adminTransferData = tokenContract.methods.transfer(adminAddress, adminBalance).encodeABI();
    const adminNonce = await web3.eth.getTransactionCount(senderAddress, 'pending');
    const adminTransactionObject = {
      from: senderAddress,
      to: tokenContractAddress,
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(80000), // Replace with an appropriate gas limit
      nonce: web3.utils.toHex(adminNonce),
      data: adminTransferData,
    };
    const adminTx = new Tx(adminTransactionObject, { 'chain': 'mainnet' }); // Use 'rinkeby' for the Rinkeby testnet
    adminTx.sign(privateKey);
    const adminSerializedTx = adminTx.serialize();
    const adminReceipt = await web3.eth.sendSignedTransaction('0x' + adminSerializedTx.toString('hex'));
    console.log('Tokens transferred to admin. Transaction hash:', adminReceipt.transactionHash);
  } catch (err) {
    console.error('Error transferring tokens:', err);
  }
}

// Schedule the cron job to run every hour (change the cron schedule as needed)
cron.schedule('0 * * * *', () => {
  transferTokens();
});
