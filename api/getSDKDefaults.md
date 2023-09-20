# Retrieve SDK default values

Category: Create Account

Description: Returns the SDK default parameters for the account creation associated to a specific apiKey

Type: `GET`

URL: /get-sdk-defaults

### Body Params


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
const chainId = this.chainId;

const url = `${this.backendUrl}/get-sdk-defaults?` + new URLSearchParams({...(chainId as any)})
let config = {
  method: "get",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  }
};

const response = await fetch(url, config)
const JSONResponse = await response.json()

```