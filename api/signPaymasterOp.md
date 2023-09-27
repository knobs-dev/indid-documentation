# Sign a userOperation for Paymaster sponsorization

Category: `User Operations`

Description: Sends a partial ERC-4337 userOperation (a userOp without paymasterAndData and signature) to the backend, that crafts the paymasterAndData field of the userOp and sends it back signed to the caller. (Request type IUserOperation)

Type: `POST`

URL: /sign-paymaster-op

### Body Params (IUserOperation)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| sender | string | yes | The address of the sender smart contract wallet |
| nonce | bigNumberish | yes | The nonce of the sender smart contract wallet |
| initCode | bytesLike | yes | The init code of the sender smart contract wallet |
| callData | bytesLike | yes | The data to be sent to the sender smart contract account during execution |
| callGasLimit | bigNumberish | yes | The gas limit for the execution of the callData |
| verificationGasLimit | bigNumberish | yes | The gas limit for the verification of the signature and the nonce of the userOperation |
| preVerificationGas | bigNumberish | yes | The gas limit for all the operations before the verification of the signature and the nonce of the userOperation |
| maxFeePerGas | bigNumberish | yes | The maximum fee per gas unit that can be paid by the userOperation |
| maxPriorityFeePerGas | bigNumberish | yes | The maximum priority fee per gas unit that can be paid by the userOperation |

### Error Handling

| HTTP Status | Meaning |
| --- | --- |
| 200 | OK |
| 403 | Unauthorized userOperation - validation failure |
| 512 | Internal server error while signing userOperation |
| 515 | Error during partial userOp parsing. Wrong input format for the partial userOp |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx

data: IUserOperation
const dataWithChainId = {
  ...data,
  chainid: this.chainId,
}


const url = `${this.backendUrl}/sign-paymaster-op`
let config = {
  method: "post",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  },
  body: JSON.stringify(dataWithChainId),
};


const response = await fetch(url, config)
const JSONResponse = await response.json();


```