# Create a notarization

Category: `Notarization`

Description: Creates a notarization for a specific hash on a designated blockchain.

Type: `POST`

URL: /notarize

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The Notarization module must be enabled for the project

### Body Params (INotarizeRequest)

| Name             | Type             | Description                                                              | Required |
| ---------------- | ---------------- | ------------------------------------------------------------------------ | -------- |
| notarizationHash | string           | The hash to be notarized                                                 | ✅       |
| chainId          | string \| number | The target blockchain ID (chain) where the notarization will be recorded | ✅       |
| name             | string           | Optional name to identify the notarization                               |          |
| metadata         | string           | Optional additional metadata                                             |          |
| webhookData      | object           | Optional data to be sent to the webhook                                  |          |

### Response

```ts
type NotarizeResponse = {
  taskId: string; // Task ID for asynchronous notarization tracking
};
```

### Error Handling

| HTTP Status | Meaning                           |
| ----------- | --------------------------------- |
| 200         | Notarization created successfully |
| 513         | Insufficient compute units        |
| 515         | Parameter validation error        |
| 512         | Internal server error             |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
// data: INotarizeRequest
const url = `${this.backendUrl}/notarize`;
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
