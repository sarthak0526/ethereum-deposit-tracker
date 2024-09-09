

# Ethereum Deposit Tracker

This project tracks deposits to the Ethereum Beacon chain's deposit contract and logs the details to a file, as well as sends notifications to a Telegram bot.

## Index
1. [Features](#features)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Logging](#logging)
6. [Telegram Notifications](#telegram-notifications)
7. [Example Output](#example-output)

## Features

- **Alchemy SDK Integration**: Connects to Ethereum using Alchemy's WebSocket and REST API.
- **Winston Logger**: Logs deposit transaction details and errors.
- **Telegram Bot Notifications**: Sends deposit information to a specified Telegram chat.
- **File Logging**: Saves deposit details to a JSON file for future reference.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ethereum-deposit-tracker.git
   cd ethereum-deposit-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create an Alchemy account and get your API key from [Alchemy](https://www.alchemy.com/).

2. Set up a Telegram bot using [BotFather](https://core.telegram.org/bots#botfather), and get the bot token.

3. Set the following environment variables in the `settings` object or directly replace them in the code:
   
   - **Alchemy API Key**: Replace `"2xw003RCRo7MXfJHXO-eub_LviyVyDXh"` in the `settings` with your Alchemy API key.
   - **Telegram Bot Token**: Replace `"7024162703:AAFs0BfIcn0qwMpAdqPK0BSuiznHdF9gTAk"` with your bot token.
   - **Telegram Chat ID**: Replace `"1051713060"` with the chat ID of your desired Telegram chat or group.

## Usage

1. Start the Ethereum deposit tracker:

   ```bash
   node index.js
   ```

2. The script will:

   - Connect to the Ethereum blockchain.
   - Subscribe to the Ethereum Beacon chain deposit contract.
   - Detect new logs for the deposit contract and fetch transaction data.
   - Log deposit information to `deposit-tracker.log` and `deposits.json`.
   - Send a notification to your Telegram bot with deposit details.

## Logging

Logs are generated using the [Winston](https://www.npmjs.com/package/winston) logger and saved to:

- `deposit-tracker.log`: General information and errors.
- `deposits.json`: Stores all detected deposit details.

## Telegram Notifications

Whenever a new deposit is detected, a message is sent to the configured Telegram chat with details like block number, transaction hash, gas fees, and more.

## Example Output

Sample console output when a deposit is detected:

```bash
Connected to Ethereum! Current block number: 17450232
Subscribed to Ethereum contract logs...
Deposit Detected: {
  "blockNumber": 17450232,
  "blockTimestamp": 1672864291,
  "fee": "123000000000000000",
  "hash": "0x1234567890abcdef...",
  "pubkey": "0xabcdef..."
}
```

---
## Output
![image](https://github.com/user-attachments/assets/cd43421e-4c57-4f70-85d9-1f1f59d59279)


## Telegram Message Recieved

![image](https://github.com/user-attachments/assets/f338543d-5bd1-4068-83dc-7fef3493c8c4)

---
