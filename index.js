import { Network, Alchemy } from "alchemy-sdk";
import winston from 'winston';
import axios from 'axios';
import fs from 'fs';


const settings = {
  apiKey: "2xw003RCRo7MXfJHXO-eub_LviyVyDXh",  // Alchemy API key
  network: Network.ETH_MAINNET,  
};


const alchemy = new Alchemy(settings);

const BEACON_DEPOSIT_CONTRACT = '0x029290c564Ef921c56a784AA16C97E930dAF7372';


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'deposit-tracker.log' })
  ]
});

alchemy.core.getBlockNumber().then(blockNumber => {
    console.log(`Connected to Ethereum! Current block number: ${blockNumber}`);
}).catch(err => {
    console.error("Failed to connect to Ethereum:", err.message);
});

logger.info("Ethereum Deposit Tracker started...");


const TELEGRAM_BOT_TOKEN = "7024162703:AAFs0BfIcn0qwMpAdqPK0BSuiznHdF9gTAk";  
const TELEGRAM_CHAT_ID = "1051713060";  


async function fetchDepositData(transactionHash) {
  try {
    const receipt = await alchemy.core.getTransactionReceipt(transactionHash);
    if (receipt && receipt.logs.length > 0) {
      receipt.logs.forEach(async (log) => {
        const block = await alchemy.core.getBlock(receipt.blockNumber);

        const deposit = {
          blockNumber: receipt.blockNumber,
          blockTimestamp: block.timestamp,
          fee: receipt.effectiveGasPrice * receipt.gasUsed,  
          hash: receipt.transactionHash,
          pubkey: log.data  
        };

        logger.info(deposit);
        console.log(`Deposit Detected: ${JSON.stringify(deposit, null, 2)}`);
        saveDeposit(deposit);
        sendTelegramMessage(`New deposit detected: ${JSON.stringify(deposit, null, 2)}`);
      });
    }
  } catch (error) {
    logger.error(`Error fetching transaction: ${error.message}`);
  }
}


alchemy.ws.on({
  address: BEACON_DEPOSIT_CONTRACT,
  topics: []  
}, (log) => {
  logger.info(`New log detected: ${log.transactionHash}`);
  console.log(`Log detected: ${JSON.stringify(log, null, 2)}`);
  fetchDepositData(log.transactionHash);
});

console.log("Subscribed to Ethereum contract logs...");


async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    });
    if (response.status === 200) {
      logger.info('Telegram message sent successfully.');
    }
  } catch (error) {
    logger.error(`Error sending Telegram message: ${error.response?.data?.description || error.message}`);
  }
}


async function saveDeposit(depositInfo) {
  fs.appendFile('deposits.json', JSON.stringify(depositInfo, null, 2), (err) => {
    if (err) {
      logger.error(`Error saving deposit: ${err.message}`);
    } else {
      logger.info('Deposit saved successfully.');
    }
  });
}


fetchDepositData('0x1391be19259f10e01336a383217cf35344dd7aa157e95030f46235448ef5e5d6');
