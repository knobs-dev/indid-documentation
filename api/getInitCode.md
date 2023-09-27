# Get the initCode

Category: `Create Account`

Description: Returns the initCode, useful for an account creation inside an userOperation. The request has a JSON as query param (IInitCodeRequest, that contains the parameters below)

Type: `GET`

URL: /initCode

### Query Params (IInitCodeRequest)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| owner | string | yes | The address of the smart contract wallet owner |
| factoryAddress | string | no | The address of the smart contract wallet factory |
| guardiansHash | string | no | The hash of the guardians array in case of generalized account |
| guardianId | string | no | The guardians structId in case of shared storage account |
| moduleAddress | string | no | The address of the module |
| salt | number | no | The salt for initCode generation |
| chainId | bigNumberish | no | The chainId for cross-chain handling |

### Error Handling

| HTTP Status | Meaning |
| --- | --- |
| 200 | OK |
| 512 | Internal server error while retrieving initCode |
| 515 | Error during initCodeRequest parsing. Wrong input format for the initCodeRequest |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
params: IInitCodeRequest

const url = `${this.backendUrl}/initCode?` + new URLSearchParams({...(params as any)})
let config = {
  method: "get",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  }
};

const response = await fetch(url, config)
const JSONResponse = await response.json();

```