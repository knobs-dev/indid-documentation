# Sign a userOperation for Paymaster sponsorization

Category: `User Operations`

Description: This endpoint streamlines gasless transactions by completing a partial ERC-4337 userOperation (missing `paymasterAndData` and `signature`). The Indid backend validates that the Paymaster is authorized to sponsor the operation, signs the userOperation by adding the Paymaster data, and locks the maximum estimated CU amount from the user's credit (with a refund if the actual cost is lower). It returns the userOperation with the signed `paymasterAndData`, ready to be forwarded to the Bundler so your app can pay gas fees on behalf of the end user.

Type: `POST`

URL: /sign-paymaster-op

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The provided `chainId` must be configured for the project
- The Account Abstraction module must be enabled for the project

### Body Params (IUserOperation)

The userOperation must NOT include `paymasterAndData` and `signature`.

| Name                 | Type         | Description                                                                                                      | Required? |
| -------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- | --------- |
| sender               | string       | The address of the sender smart contract wallet                                                                  | ✅        |
| nonce                | bigNumberish | The nonce of the sender smart contract wallet                                                                    | ✅        |
| initCode             | bytesLike    | The init code of the sender smart contract wallet                                                                | ✅        |
| callData             | bytesLike    | The data to be sent to the sender smart contract account during execution                                        | ✅        |
| callGasLimit         | bigNumberish | The gas limit for the execution of the callData                                                                  | ✅        |
| verificationGasLimit | bigNumberish | The gas limit for the verification of the signature and the nonce of the userOperation                           | ✅        |
| preVerificationGas   | bigNumberish | The gas limit for all the operations before the verification of the signature and the nonce of the userOperation | ✅        |
| maxFeePerGas         | bigNumberish | The maximum fee per gas unit that can be paid by the userOperation                                               | ✅        |
| maxPriorityFeePerGas | bigNumberish | The maximum priority fee per gas unit that can be paid by the userOperation                                      | ✅        |

### Response

```ts
type SignPaymasterOpResponse = {
  paymasterAndData: string; // Signed paymaster data to include in the userOperation
};
```

### Error Handling

| HTTP Status | Meaning                                                                        |
| ----------- | ------------------------------------------------------------------------------ |
| 200         | OK                                                                             |
| 403         | Unauthorized userOperation - validation failure                                |
| 512         | Internal server error while signing userOperation                              |
| 515         | Error during partial userOp parsing. Wrong input format for the partial userOp |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
data: IUserOperation;
const dataWithChainId = {
  ...data,
  chainid: this.chainId,
};

const url = `${this.backendUrl}/sign-paymaster-op`;
let config = {
  method: "post",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  },
  body: JSON.stringify(dataWithChainId),
};

const response = await fetch(url, config);
const JSONResponse = await response.json();
```
