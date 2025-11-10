# Create a new account

Category: `Create Account`

Description: Creates a new smart contract wallet. The flow deploys the wallet via factory, configures initial guardians and recovery settings, returns the wallet address and deployment status, and finalizes the account setup for ERC‑4337 operations.

Type: `POST`

URL: /create-account

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The provided `chainId` must be configured for the project
- The Account Abstraction module must be enabled for the project

### Body Params (ICreateAccountRequest)

| Name           | Type            | Description                                                           | Required |
| -------------- | --------------- | --------------------------------------------------------------------- | -------- |
| owner          | string          | The designated owner address for the smart contract wallet            | ✅       |
| factoryAddress | string          | The factory contract address used to deploy the smart contract wallet |          |
| \_guardians    | string[]        | Array of guardian addresses, used for generalized accounts            |          |
| \_guardianId   | string          | Guardians structure ID, used for shared-storage accounts              |          |
| \_module       | string          | The module address to associate with the account                      |          |
| salt           | number          | Numeric salt used for counterfactual address generation               |          |
| webHookData    | IWebHookRequest | Post-creation webhook configuration with a tag and optional metadata  |          |

### IWebHookRequest detail

```ts
interface IWebHookRequest {
  tag: string; // Endpoint or identifier to be invoked via webhook
  metadata?: Record<string, unknown>; // Optional additional metadata
}
```

### Response

```ts
type CreateAccountResponse = {
  taskId: string; // Unique ID to track the creation task
  accountAddress: string; // The deployed smart account address
};
```

### Error Handling

| HTTP Status | Meaning                                                        |
| ----------- | -------------------------------------------------------------- |
| 200         | Account successfully created and operation started             |
| 512         | Internal server error during account creation                  |
| 515         | Parsing error: wrong input format for the createAccountRequest |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
data: ICreateAccountRequest; //input
const url = `${this.backendUrl}/create-account`;
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
