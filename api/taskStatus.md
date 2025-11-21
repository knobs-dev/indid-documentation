# Get task status by task ID

Category: `Tasks`

Description: Retrieves the current status of a task.

Type: `GET`

URL: /task-status

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)

### Query Params (ITaskStatusQuery)

| Name   | Type   | Description            | Required |
| ------ | ------ | ---------------------- | -------- |
| taskId | string | Unique task identifier | ✅       |

### Response (TypeScript)

// Pending task

```ts
{
  taskId: string;
  status: "PENDING";
}
```

// Executed task

```ts
{
  taskId: string;
  status: "EXECUTED";
  receipt: object; // Resulting data from task execution
}
```

// Failed task

```ts
{
  taskId: string;
  status: "FAILED";
  reason: string; // Failure reason
}
```

### Error Handling

| HTTP Status | Meaning                                            |
| ----------- | -------------------------------------------------- |
| 200         | Request succeeded and status retrieved             |
| 516         | Provided taskId not found                          |
| 512         | Internal server error while processing the request |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
const url = `${this.backendUrl}/task-status?` + new URLSearchParams({ taskId });
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
