# Get the status of a userOperation

Category: `User Operation`

Description: Retrieves the status of a userOperation. (request type: string that represents the userOp transaction hash).
The response is a JSON containing all the userOp info from the bundler.

Type: `GET`

URL: /op-status

### Query Params

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| opHash | string | yes | The hash of the userOperation to be checked |


### Error Handling

| HTTP Status | Meaning |
| --- | --- |
| 200 | OK |
| 204 | userOperation for the requested opHash not found on-chain -> null |
| 512 | Internal server error while retrieving op status |
| 516 | userOperation not found in the DB |

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