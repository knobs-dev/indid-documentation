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