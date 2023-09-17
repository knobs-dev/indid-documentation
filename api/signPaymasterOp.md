# Sign an userOperation for Paymaster sponsorization

Category: User Operations
Description: Sends a partial ERC-4337 userOperation (an userOp without paymasterAndData and signature) to the backend, that crafts the paymasterAndData field of the userOp and sends it back signed to the caller. (Request type IUserOperation)
Type: POST
URL: https://api.dev.indid.io/sign-paymaster-op

### Body Params (IUserOperation)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| sender | string | yes |  |
| nonce | bigNumberish | yes |  |
| initCode | bytesLike | yes |  |
| callData | bytesLike | yes |  |
| callGasLimit | bigNumberish | yes |  |
| verificationGasLimit | bigNumberish | yes |  |
| preVerificationGas | bigNumberish | yes |  |
| maxFeePerGas | bigNumberish | yes |  |
| maxPriorityFeePerGas | bigNumberish | yes |  |


### Responses

|  | Response Body |
| --- | --- |
| 200 |  |
| 400 |  |

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