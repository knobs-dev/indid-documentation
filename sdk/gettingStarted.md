# Getting Started

This guide will walk you through the basic steps of integrating with INDID SDKs to create and interact with smart contract wallets using ERC-4337 account abstraction. You'll learn how to:

1. Initialize both Core and Admin SDKs
2. Create a smart contract wallet
3. Connect to an existing wallet
4. Prepare and send transactions
5. Sponsor user operations
6. Wait for transaction completion

## Prerequisites

- API keys for both Core and Admin SDKs (obtain from [INDID Dashboard](https://dashboard.indid.io))
- Basic understanding of Ethereum and smart contracts

## Installation

First, install the required packages:

```bash
# For client-side usage
npm install @indid/indid-core-sdk ethers

# For server-side/admin usage
npm install @indid/indid-admin-sdk ethers
```

## Step 1: Initialize the SDKs

### Core SDK (Client Side)

The Core SDK is used for client-side operations like preparing transactions, signing operations, and interacting with deployed wallets.

```ts
import { Client } from "@indid/indid-core-sdk";
import { LogLevel } from "@indid/indid-core-sdk";

// Initialize with configuration
const clientUser = await Client.init({
  apiKey: "your-core-api-key",
  rpcUrl: "https://polygon-mumbai-rpc.com",
  logLevel: LogLevel.INFO // Optional, defaults to NONE
});
```

### Admin SDK (Server Side)

The Admin SDK extends Core SDK functionality with additional admin capabilities like deploying wallets and sponsoring transactions.

```ts
import { AdminClient } from "@indid/indid-admin-sdk";
import { LogLevel } from "@indid/indid-admin-sdk";

// Initialize with configuration
const clientAdmin = await AdminClient.init({
  apiKey: "your-admin-api-key",
  rpcUrl: "https://polygon-mumbai-rpc.com",
  logLevel: LogLevel.INFO // Optional, defaults to NONE
});
```

## Step 2: Create a Smart Contract Wallet

Before creating a wallet, you can get its counterfactual address (the address it will have once deployed).

```ts
import { IndidAddress } from "@indid/indid-core-sdk";

// Create an address object from an EOA address
const ownerAddress = IndidAddress.fromSecp256k1("0x123..."); // Your EOA wallet address

// Get the counterfactual address
const addressResponse = await clientUser.getCounterfactualAddress([ownerAddress]);
console.log("Counterfactual address:", addressResponse.accountAddress);

// Deploy the wallet using Admin SDK
const createResponse = await clientAdmin.createAccount(
  [ownerAddress],
  "0" // Salt (optional, defaults to "0")
);

console.log("Wallet deployed at:", createResponse.accountAddress);
console.log("Task ID:", createResponse.taskId);

// Optional: Wait for the deployment to complete
const deploymentStatus = await clientAdmin.waitTask(createResponse.taskId);
console.log("Deployment status:", deploymentStatus.operationStatus);
```

## Step 3: Connect to the Wallet

To interact with a deployed wallet, connect to it using the Core SDK.

```ts
import { IndidSigner } from "@indid/indid-core-sdk";
import { Wallet } from "ethers";

// Create a signer from a private key
const privateKey = "0x456..."; // Your EOA private key
const wallet = new Wallet(privateKey);
const signer = IndidSigner.fromSecp256k1(wallet.privateKey);

// Connect to the deployed wallet
const connectResponse = await clientUser.connectAccount(
  signer,
  addressResponse.accountAddress // The wallet address
);

if (!connectResponse.error) {
  console.log("Successfully connected to wallet");
} else {
  console.error("Failed to connect:", connectResponse.error);
}
```

## Step 4: Prepare a Transaction

You can prepare different types of transactions. Here are some examples:

### ETH Transfer

```ts
import { parseEther } from "ethers";

// Simple ETH transfer
const ethBuilder = await clientUser.prepareSendETH(
  "0x789...", // Recipient address
  parseEther("0.01") // Amount in ETH
);
```

### ERC-20 Token Transfer

```ts
import { parseUnits } from "ethers";

// ERC-20 token transfer
const tokenBuilder = await clientUser.prepareSendERC20(
  "0xabc...", // Token contract address
  "0x789...", // Recipient address
  parseUnits("10", 18) // Amount with decimals
);
```

### Multiple Transactions

```ts
import { parseEther } from "ethers";

// Execute multiple transactions in a single operation
const transactions = [
  {
    to: "0x123...", // First recipient
    value: parseEther("0.01"),
    data: "0x" // Empty data for ETH transfer
  },
  {
    to: "0x456...", // Token contract
    value: 0n, // No ETH sent
    data: "0xa9059cbb000000000000000000000000789...0000000000000000000000000000000000000000000000000de0b6b3a7640000" // transfer(address,uint256)
  }
];

const multiBuilder = await clientUser.prepareSendTransactions(transactions);
```

Change to:

```ts
const multiBuilder = await clientUser.prepareSendTransaction(transactions);
```

## Step 5: Sponsor the Transaction (Optional)

If you want to pay for the user's gas fees, you can sponsor the transaction. There are two approaches:

### Option 1: Direct Sponsorship (Backend)

If your application handles the entire flow on the backend:

```ts
// Apply sponsorship directly to the builder
await clientAdmin.getUserOpSponsorship(multiBuilder);
console.log("Transaction sponsored!");
```

### Option 2: Client-Server Flow

If your application has a client-server architecture:

1. On the client, get the operation data:

```ts
// Client side
const userOp = multiBuilder.getOp();

// Send to your backend
const sponsorshipResponse = await fetch("https://your-backend.com/sponsor", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userOp })
});

const { paymasterAndData } = await sponsorshipResponse.json();

// Apply the sponsorship data
multiBuilder.setPaymasterAndData(paymasterAndData);
```

2. On your backend:

```ts
// Server endpoint implementation
app.post('/sponsor', async (req, res) => {
  const { userOp } = req.body;
  
  // Call INDID API for sponsorship
  const paymasterdAndData = await fetch("https://api.indid.io/sign-paymaster-op", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminApiKey}`,
  },
  body: JSON.stringify({
    op,
  }),
}).then((res) => res.json().then((data) => data.paymasterAndData));
  
  // Return the sponsorship data to the client
  res.json({ paymasterAndData: paymasterAndData });
});
```

## Step 6: Sign and Send the Transaction

After preparing and optionally sponsoring the transaction, sign and send it:

```ts
// Sign the operation
const signResponse = await clientUser.signUserOperation(multiBuilder);
console.log("Operation signed with hash:", signResponse.userOpHash);

// Send the operation
const sendResponse = await clientUser.sendUserOperation(multiBuilder);
console.log("Operation sent with hash:", sendResponse.userOpHash);
console.log("Task ID:", sendResponse.taskId);

// Wait for operation completion
const receipt = await clientUser.waitOP(sendResponse.userOpHash);

if (receipt.receipt.success) {
  console.log("Transaction successful!");
  console.log("Transaction hash:", receipt.receipt.transactionHash);
} else {
  console.error("Transaction failed:", receipt.receipt.error);
}
```

## Using Webhooks (Optional)

You can configure webhook notifications to be called when operations complete:

```ts
// Send with webhook notification
const webhookResponse = await clientUser.sendUserOperation(
  multiBuilder,
  {
    tag: "transfer-complete", // Must be configured in your INDID dashboard
    metadata: {
      transferId: "123",
      amount: "0.01",
      currency: "ETH"
    }
  }
);
```

## Complete Example

Here's a complete example bringing everything together:

```ts
import { Client, AdminClient, IndidAddress, IndidSigner, LogLevel } from "@indid/indid-sdk";
import { Wallet, parseEther } from "ethers";

async function main() {
  try {
    // Initialize SDKs
    const clientUser = await Client.init({
      apiKey: "your-core-api-key",
      rpcUrl: "https://polygon-mumbai-rpc.com"
    });
    
    const clientAdmin = await AdminClient.init({
      apiKey: "your-admin-api-key",
      rpcUrl: "https://polygon-mumbai-rpc.com"
    });
    
    // Create wallet signer
    const privateKey = "0x123..."; // Your EOA private key
    const wallet = new Wallet(privateKey);
    const ownerAddress = IndidAddress.fromSecp256k1(wallet.address);
    const signer = IndidSigner.fromSecp256k1(wallet.privateKey);
    
    // Get counterfactual address
    const addressResponse = await clientUser.getCounterfactualAddress([ownerAddress]);
    console.log("Counterfactual address:", addressResponse.accountAddress);
    
    // Deploy wallet
    const createResponse = await clientAdmin.createAccount([ownerAddress]);
    console.log("Wallet deployed at:", createResponse.accountAddress);
    
    // Wait for deployment
    await clientAdmin.waitTask(createResponse.taskId);
    
    // Connect to wallet
    await clientUser.connectAccount(signer, addressResponse.accountAddress);
    
    // Prepare a transaction
    const recipient = "0x789...";
    const builder = await clientUser.prepareSendETH(
      recipient,
      parseEther("0.01")
    );
    
    // Sponsor the transaction
    await clientAdmin.getUserOpSponsorship(builder);
    
    // Sign and send
    await clientUser.signUserOperation(builder);
    const sendResponse = await clientUser.sendUserOperation(builder);
    
    // Wait for completion
    const receipt = await clientUser.waitOP(sendResponse.userOpHash);
    
    console.log("Transaction result:", receipt.receipt.success ? "Success" : "Failed");
    console.log("Transaction hash:", receipt.receipt.transactionHash);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
```

## Next Steps

Now that you understand the basics, consider exploring:

- [Core SDK Documentation](./coreSdk.md) - For client-side functions
- [Admin SDK Documentation](./adminSdk.md) - For server-side and administrative functions
- [INDID Dashboard](https://dashboard.indid.io) - For managing your projects, API keys and webhooks
