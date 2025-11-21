# Get notarizations

Category: `Notarization`

Description: Retrieves the list of notarizations associated with the project.

Type: `GET`

URL: /notarizations

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The Notarization module must be enabled for the project

### Query Params (INotarizationsQuery)

| Name      | Type          | Description                       | Required |
| --------- | ------------- | --------------------------------- | -------- |
| queryType | string        | "number" or "date"             | ✅       |
| from      | number \| Date | Start filter (number or date)     |          |
| to        | number \| Date | End filter (number or date)       |          |

### Response

```ts
type NotarizationsResponse = {
  notarizations: Array<{
    hash: string;
    chainId: string;
    status: string;
    name?: string;
    metadata?: string;
    taskId: string;
    createdAt: Date;
    // ...other fields
  }>;
  total: number; // Total number of available notarizations
};
```

### Error Handling

| HTTP Status | Meaning                    |
| ----------- | -------------------------- |
| 200         | OK                          |
| 400         | Invalid parameters provided |
| 512         | Internal server error       |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
const params = {
  queryType: "date", // or "number"
  from: 1711920000,   // or new Date("2024-04-01")
  to: 1714521600       // or new Date("2024-05-01")
};

const url = `${this.backendUrl}/notarizations?` + new URLSearchParams({ ...(params as any) });
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

