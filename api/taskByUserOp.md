# Get task status by User Op hash

Category: `Tasks`

Description: Retrieves the task ID associated with a specific user operation.

Type: `GET`

URL: /task-by-userop/:userOpHash

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)

### Path Params

| Name       | Type   | Description                       | Required |
| ---------- | ------ | --------------------------------- | -------- |
| userOpHash | string | Unique hash of the user operation | ✅       |

### Response

On success, returns the taskId as a string.

```ts
{
  taskId: string; // Task ID associated with the user operation
}
```

### Error Handling

| HTTP Status | Meaning                                            |
| ----------- | -------------------------------------------------- |
| 200         | Task ID retrieved successfully                     |
| 404         | No task found for the specified user operation     |
| 512         | Internal server error while processing the request |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
const userOpHash = "0x...";
const url = `${this.backendUrl}/task-by-userop/${userOpHash}`;
let config = {
  method: "get",
  maxBodyLength: Infinity,
  headers: {
    Authorization: `Bearer ${this.apiKey}`,
  },
};

const response = await fetch(url, config);
const JSONResponse = await response.json();
```
