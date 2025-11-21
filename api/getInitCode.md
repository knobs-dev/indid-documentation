# Get the initCode

Category: `Create Account`

Description: Provides the initCode, an essential value for initializing and creating a new account within a userOperation.

Type: `GET`

URL: /initCode

### Authentication

Public endpoint — no authentication required.

### Query Params (IInitCodeRequest)

| Name           | Type            | Description                                        | Required |
| -------------- | --------------- | -------------------------------------------------- | -------- |
| factoryAddress | string          | Factory contract address                           | ✅       |
| owner          | IWalletOwner    | The wallet owner                                   | ✅       |
| guardians      | IndidGuardian[] | Array of associated guardians                      | ✅       |
| guardianBytes  | string          | Guardians data encoded as bytes                    | ✅       |
| moduleAddress  | string          | Module address                                     | ✅       |
| salt           | BigNumberish    | Salt value                                         | ✅       |
| chainId        | ChainId         | Chain ID                                           | ✅       |
| guardianId     | string          | Optional guardian ID (for shared storage accounts) |          |

### Response

```ts
type GetInitCodeResponse = {
  initCode: string; // The initialization code required for account creation
};
```

### Error Handling

| HTTP Status | Meaning                                                   |
| ----------- | --------------------------------------------------------- |
| 200         | InitCode retrieved successfully                           |
| 512         | Internal server error while retrieving initCode           |
| 515         | Parsing error: wrong input format for the initCodeRequest |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
params: IInitCodeRequest;

const url =
  `${this.backendUrl}/initCode?` + new URLSearchParams({ ...(params as any) });
let config = {
  method: "get",
  maxBodyLength: Infinity,
  headers: {},
};

const response = await fetch(url, config);
const JSONResponse = await response.json();
```
