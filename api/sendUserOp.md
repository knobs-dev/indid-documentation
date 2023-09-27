# Send a userOperation

Category: `User Operations`

Description: Sends an ERC-4337 userOperation to the bundler, that will execute it (the request type is IUserOperation, a JSON containing the fields in body params)

Type: `POST`

URL: /send-op

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
| paymasterAndData | bytesLike | yes | The address of the paymaster address that will sponsor the userOperation and further data required by the paymaster smart contract. This parameter can be left blank if the userOperation doesn't have to be sponsored |
| signature | bytesLike | yes | The signature of the userOperation |




### Error Handling

| HTTP Status | Meaning |
| --- | --- |
| 200 | OK |
| 512 | Internal server error while sending userOperation
| 515 | Error during send-userOp request parsing. Wrong input format for the userOperation |
| 516 | Error received from the bundler while handling the userOperation

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