# Send a delegated transaction

Category: `Delegated Transactions`

Description: Allows sending a delegated transaction.

Type: `POST`

URL: /send-delegated-tx

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The provided `chainId` must be configured for the project
- The Account Abstraction module must be enabled for the project

### Body Params (ISendDelegatedTxRequest)

| Name           | Type            | Description                                                                 | Required |
| -------------- | --------------- | --------------------------------------------------------------------------- | -------- |
| accountAddress | string          | Smart account address that must execute the transaction                     | ✅       |
| moduleAddress  | string          | Module address responsible for handling delegated transactions              | ✅       |
| data           | string          | Encoded calldata of the transactions to execute (multicall supported)       | ✅       |
| nonce          | number          | Module internal nonce used to protect against replay attacks                | ✅       |
| deadline       | number          | Expiration timestamp after which the transaction request is no longer valid | ✅       |
| sigs           | string          | Signatures required to authorize the delegated transaction                  | ✅       |
| chainId        | number          | Target blockchain ID for the transaction execution                          | ✅       |
| webhookData    | IWebHookRequest | Optional data to configure webhook notifications                            |          |

### IWebHookRequest detail

```ts
interface IWebHookRequest {
  tag: string;
  metadata?: Record<string, unknown>;
}
```

### Response

```ts
type SendDelegatedTxResponse = {
  taskId: string; // Unique ID to track the delegated transaction status
};
```

### Error Handling

| HTTP Status | Meaning                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| 200         | Delegated transaction sent successfully                                 |
| 512         | Internal server error while sending the delegated transaction           |
| 513         | Insufficient Credits to process the request                             |
| 515         | Validation error: wrong input format for the delegated transaction data |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
// data: ISendDelegatedTxRequest
const url = `${this.backendUrl}/send-delegated-tx`;
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
