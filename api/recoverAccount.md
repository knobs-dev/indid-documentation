# Recover Account

Category: `Recover Account`

Description: Transfers the ownership of a smart contract wallet to a new owner. The request is a JSON (IRecoveryRequest) and the reply returns a JSON containing the hash of the transaction that changed the owner of the wallet.

Type: `POST`

URL: /recovery-account

### Body Params (IRecoveryRequest)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| walletAddress | string | yes | The smart contract wallet to recover |
| newOwner | string | yes | The address of the new owner of the smart contract wallet |
| signature | string | yes | The signature of all the guardians |
| nonce | number | yes | The internal nonce of the module, mandatory because it is not sequential |
| deadline | number | yes | The deadline of the request |
| moduleAddress | string | no | The address of the module on which the recovery method has to be called |
| params | any | no |  |

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

| HTTP Status | Meaning |
| --- | --- |
| 200 | OK |
| 512 | Internal server error while trying to recover account |
| 515 | Error during recoverAccountRequest parsing. Wrong input format for the recoverAccountRequest |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
data: IRecoverRequest //input
const url =  `${this.backendUrl}/recovery-account`
let config = {
  method: "post",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  },
  body: JSON.stringify(data),
};

const response = await fetch(url, config)
const JSONResponse = await response.json();

```