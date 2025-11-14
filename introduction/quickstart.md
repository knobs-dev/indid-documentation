# Quickstart Guides

Follow these steps to complete your first sponsored (gasless) User Operation in ≈5 minutes.

## 1) Create account and project

Create your account and first project in the INDID Dashboard.

## 2) Get your API Key

You will use it to authenticate your requests.

## 3) Send your first User Operation

Submit a sponsored operation via INDID (Paymaster sponsorship + Bundler relay behind the scenes).

### Install dependencies

```bash
npm install @indid/indid-core-sdk
npm install @indid/indid-admin-sdk
npm install --save-dev ethers
```

### Script: ETH transfer from a Smart Contract Wallet (client + server)

The following end-to-end example shows how to transfer ETH on-chain from a Smart Contract Wallet using both SDK clients:

- Core SDK in the client environment (browser/app)
- Admin SDK in the server environment (backend)

Note: Do not use Admin SDK in a browser – keep admin keys on the server.

```ts
import { Client } from "@indid/indid-core-sdk"; // client-side
import { AdminClient } from "@indid/indid-admin-sdk"; // server-side
import { ethers } from "ethers";

async function run() {
  const rpcUrl = "https://your-rpc";
  const coreApiKey = "YOUR_CORE_API_KEY";
  const adminApiKey = "YOUR_ADMIN_API_KEY"; // server-only
  const walletPrivateKey = "0x...";

  // ---------------------------
  // Server-side (Node/Backend)
  // ---------------------------
  // Initialize Admin client (server only)
  const adminClient = await AdminClient.init({ rpcUrl, apiKey: adminApiKey });

  // Create the owner wallet (owner EOA)
  const wallet = new ethers.Wallet(walletPrivateKey);

  // Deploy the smart account (server-side)
  const deployRes = await adminClient.createAccount(wallet.address);
  if (deployRes.error) throw new Error(`Deploy failed: ${deployRes.error}`);
  const smartAccount = deployRes.accountAddress;

  // ---------------------------------
  // Client-side (Browser/App/Frontend)
  // ---------------------------------
  const client = await Client.init({ rpcUrl, apiKey: coreApiKey });

  // Prepare ETH transfer (0.001 ETH) from the smart account
  const recipient = "0xRecipient...";
  const builder = await client.prepareSendETH(
    recipient,
    ethers.utils.parseEther("0.001")
  );

  // Sign with the smart account
  await client.signUserOperation(builder);

  // Send the user operation
  const { taskId, userOpHash, error } = await client.sendUserOperation(builder);
  if (error) throw new Error(`Send failed: ${error}`);

  console.log("userOpHash:", userOpHash);
  console.log("taskId:", taskId);

  // Wait for completion (optional)
  const { operationStatus, receipt, reason } = await client.waitTask(taskId);
  console.log("status:", operationStatus);
  if (reason) console.log("reason:", reason);
  if (receipt) console.log("receipt:", receipt);
}

run().catch(console.error);
```

### Example

```ts
import { Client } from "@indid/indid-core-sdk";
import { AdminClient } from "@indid/indid-admin-sdk";
import { ethers } from "ethers";

async function foo() {
  // initialize client with node provider rpc url and project api key
  const client = await Client.init({ rpcUrl, apiKey: coreApiKey });

  // inizialize admin client on backend-side with admin api key
  const adminClient = await AdminClient.init({
    rpcUrl,
    apiKey: adminApiKey,
  });

  // create a new ethers Wallet for private key
  const wallet = new ethers.Wallet(walletPrivateKey);

  // get smart account address for the wallet
  // will be the same of the deployed one
  const { accountAddress } = await client.getCounterfactualAddress(
    wallet.address
  );

  // deploy smart account on-chain passing the owner wallet address
  // this step is done on backend-side via admin client
  const { error: createErr, accountAddress: address } =
    await adminClient.createAccount(wallet.address);
  if (createErr) {
    // do stuff
  }

  // once the account is deployed, we can use the client to send user operations
  const recipientAddress = "0x...."; // recipient address
  // prepare a user operation to send 0.001 ETH
  const userop = await client.prepareSendETH(
    recipientAddress,
    ethers.utils.parseEther("0.001")
  );

  // sign the user operation with the smart account
  await client.signUserOperation(userop);

  // send the user operation
  const {
    taskId,
    userOpHash,
    error: sendErr,
  } = await client.sendUserOperation(userop);
  if (sendErr) {
    // do stuff
  }

  console.log("userOpHash:", userOpHash);
  console.log("taskId:", taskId);

  // wait for the task to be completed

  // operationStatus: TaskUserOperationStatus;
  //   receipt?: JSON;
  //   reason?: string;
  const { operationStatus, receipt, reason } = await client.waitTask(taskId);

  // do stuff ...
}
```
