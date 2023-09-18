# Get the status of an userOperation

Category: User Operation

Description: Retrieves the status of an userOperation. (request type: string that represents the userOp transaction hash).
The response is a JSON containing all the userOp info from the bundler.

Type: GET

URL: https://api.dev.indid.io/op-status

### Query Params

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| opHash | string | yes |  |

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

const url = `${this.backendUrl}/op-status?` + new URLSearchParams({opHash: opHash})
let config = {
  method: "get",
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  headers: {
    Authorization: `Bearer ${this.apiKey}`,
  },
};


const response = await fetch(url, config)



```