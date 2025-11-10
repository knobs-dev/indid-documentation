# Retrieve SDK default values

Category: `Create Account`

Description: Returns the SDK default parameters required for account creation, associated with the provided apiKey.

Type: `GET`

URL: /get-sdk-defaults

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The provided `chainId` must be configured for the project in use
- The Account Abstraction module must be enabled for the project

### Query Params (IGetSDKDefaultsRequest)

| Name    | Type   | Description                      | Required |
| ------- | ------ | -------------------------------- | -------- |
| chainId | string | Blockchain identifier (chain ID) | ✅       |

### Response

```ts
type GetSDKDefaultsResponse = {
  entryPoint: string;
  factory: string;
  // ...other relevant SDK default parameters
};
```

### Error Handling

| HTTP Status | Meaning                                             |
| ----------- | --------------------------------------------------- |
| 200         | SDK defaults retrieved successfully                 |
| 512         | Internal server error while retrieving SDK defaults |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
const chainId = this.chainId;

const url =
  `${this.backendUrl}/get-sdk-defaults?` +
  new URLSearchParams({ ...(chainId as any) });
let config = {
  method: "get",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  },
};

const response = await fetch(url, config);
const JSONResponse = await response.json();
```
