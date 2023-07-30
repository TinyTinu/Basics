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




