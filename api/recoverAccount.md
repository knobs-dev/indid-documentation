# Recover Account

Category: Recover Account

Description: Transfers the ownership of a smart contract wallet to a new owner. The request is a JSON (IRecoveryRequest) and the reply returns a JSON containing the hash of the transaction that changed the owner of the wallet.

Type: `POST`

URL: /recovery-account

### Body Params (IRecoveryRequest)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| walletAddress | string | yes |  |
| newOwner | string | yes |  |
| signature | string | yes |  |
| nonce | number | yes |  |
| deadline | number | yes |  |
| moduleAddress | string | no |  |
| params | any | no |  |

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