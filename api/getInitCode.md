# Get the initCode

Category: Create Account

Description: Returns the initCode, useful for an account creation inside an userOperation. The request has a JSON as query param (IInitCodeRequest, that contains the parameters below)

Type: `GET`

URL: /initCode

### Query Params (IInitCodeRequest)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| owner | string | yes |  |
| factoryAddress | string | no |  |
| guardiansHash | string | no |  |
| guardianId | string | no |  |
| moduleAddress | string | no |  |
| salt | number | no |  |
| chainId | bigNumberish | no |  |

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