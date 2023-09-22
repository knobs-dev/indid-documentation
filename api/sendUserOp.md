# Send a userOperation

Category: `User Operations`

Description: Sends an ERC-4337 userOperation to the bundler, that will execute it (the request type is IUserOperation, a JSON containing the fields in body params)

Type: `POST`

URL: /send-op

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
| maxPriorityFeePerGas | bigNumberish | yes |  |
| paymasterAndData | bytesLike | yes |  |
| signature | bytesLike | yes |  |




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
const url = `${this.backendUrl}/send-op`;
let config = {
  method: "post",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  },

};


const response = await fetch(url, config)


```