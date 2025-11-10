# Get account info

Category: `Accounts`

Description: Retrieves details of an existing account or the parameters needed to create a new one.

Type: `POST`

URL: /get-account-info

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The provided `chainId` must be configured for the project

### Body Params (IGetAccountInfoRequest)

| Name           | Type   | Description                | Required |
| -------------- | ------ | -------------------------- | -------- |
| accountAddress | string | Account address            | ✅       |
| chainId        | number | Unique blockchain chain ID | ✅       |

### Response

```ts
type GetAccountInfoResponse = {
  accountAddress: string;
  moduleAddress: string;
  factoryAddress: string;
  initCode?: string; // Present only if the account is not yet deployed
  moduleType: string;
  storageType: string;
  guardians: string[];
  guardianStructId?: string;
  guardiansHash?: string;
};
```

### Error Handling

| HTTP Status | Meaning                        |
| ----------- | ------------------------------ |
| 200         | Success. Information retrieved |
| 515         | Data validation error          |
| 512         | Internal server error          |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
// data: IGetAccountInfoRequest
const url = `${this.backendUrl}/get-account-info`;
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
