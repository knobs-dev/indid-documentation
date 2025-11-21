# Recover Account

Category: `Recover Account`

Description: Transfers the ownership of a smart contract wallet to a new owner. On success, the response includes a JSON with the transaction hash that changed the wallet owner on-chain.

Type: `POST`

URL: /recovery-account

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The provided `chainId` must be configured for the project
- The Account Abstraction module must be enabled for the project

### Body Params (IRecoveryRequest)

| Name          | Type         | Description                                                                                 | Required |
| ------------- | ------------ | ------------------------------------------------------------------------------------------- | -------- |
| walletAddress | string       | Address of the smart contract wallet to recover                                             | ✅       |
| newOwner      | IWalletOwner | Object representing the new wallet owner                                                    | ✅       |
| signature     | string       | Aggregated signature authorizing the recovery                                               | ✅       |
| nonce         | number       | Nonce used to prevent replay attacks                                                        | ✅       |
| deadline      | number       | Unix timestamp after which the request is no longer valid                                   | ✅       |
| chainId       | ChainId      | Optional blockchain ID of the wallet; defaults to the project’s configured chain if omitted |          |
| moduleAddress | string       | Optional specific module address to use for the recovery operation                          |          |
| calldata      | string       | Optional encoded call data to execute on the module                                         |          |
| params        | any          | Optional additional parameters specific to the recovery implementation                      |          |

### Response

```ts
type RecoverAccountResponse = {
  taskId: string; // Unique ID to track the recovery process
  transactionHash: string; // Hash of the on-chain transaction that changed the owner
};
```

### What is the signature in a recovery request?

The signature, as shortly explained in the description of the endpoint params, is the aggregated signature of all the guardians of an account.
In particular the signature is made by "0x" plus the concatenation of each guardian's signature.
The signature of each guardian is done with the JSON RPC method `eth_signTypedData`, that is the parallel of `eth_sign` but it is used for typed structured data (this signature follows the EIP-712 standard for typed structured data, check the standard for further explanations - https://eips.ethereum.org/EIPS/eip-712).

Below, there is an example of how the signature is computed:

```tsx
import { ethers } from "hardhat";
import { JsonRpcSigner } from "@ethersproject/providers";
import {Wallet} from "@ethersproject/wallet";

export async function signEIP712Transaction(
  wallet: string,
  module: string,
  calldata: string,
  deadline: number,
  signers: Wallet[] | JsonRpcSigner[]
): Promise<{ signature: string; nonce: BigInt }> {


  /*
        Preparing the signature of the standard Transaction message
    */
  const domain = {
    name: "RelayerKnobs",
    version: "1",
    chainId: (await ethers.provider.getNetwork()).chainId,
    verifyingContract: module,
  };

  // The named list of all type definitions
  const types = {
    Transaction: [
      { name: "wallet", type: "address" },
      { name: "data", type: "bytes" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };



  const ABI = {
      "inputs": [
        {
          "internalType": "address",
          "name": "_wallet",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }


  const iface = new ethers.utils.Interface(ABI);

  const calldata = iface.encodeFunctionData("transferOwnership", [
    walletAddress,
    newOwner,
  ]);

  const nonce = BigInt(ethers.utils.hexlify(ethers.utils.randomBytes(32)));
  let value = {
    wallet: walletAddress,
    data: calldata,
    nonce: nonce,
    deadline: deadline,
  };

  let signature = "0x";

    await Promise.all(
    signers.sort((a, b) => {
        return Number(await a.getAddress()) - Number(await b.getAddress())
    }));


  for (let index = 0; index < signers.length; index++) {
    const element = signers[index];
    signature += (await element._signTypedData(domain, types, value)).slice(2);

  }

  return { signature, nonce };
```

### Error Handling

| HTTP Status | Meaning                                                         |
| ----------- | --------------------------------------------------------------- |
| 200         | Recovery process started successfully                           |
| 512         | Internal server error while processing the recovery request     |
| 515         | Parsing error: wrong input format for the recoverAccountRequest |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
data: IRecoverRequest; // input
const url = `${this.backendUrl}/recovery-account`;
let config = {
  method: "post",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  },
  body: JSON.stringify(data),
};

const response = await fetch(url, config);
const JSONResponse = await response.json();
```
