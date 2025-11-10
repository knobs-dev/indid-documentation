# Get Proof of Inclusion

Category: `Notarization`

Description: Retrieves the Proof of Inclusion for a notarization that has been successfully completed.

Type: `GET`

URL: /notarizations/proof-of-inclusion

### Requirements

- A valid API Key must be provided (header `Authorization: Bearer <API_KEY>`)
- The Notarization module must be enabled and configured for the project

### Query Params (IProofOfInclusionQuery)

| Name   | Type   | Description                                                  | Required |
| ------ | ------ | ------------------------------------------------------------ | -------- |
| taskId | string | Unique notarization task ID for which the proof is requested | ✅       |

### Response

```ts
type ProofOfInclusionResponse = {
  root: string; // Merkle tree root generated for the notarization
  leaves: string[]; // Leaves that compose the Merkle tree
  algorithm: string; // Hashing algorithm used (e.g., "sha256")
};
```

### Error Handling

| HTTP Status | Meaning                                                                |
| ----------- | ---------------------------------------------------------------------- |
| 200         | Proof of Inclusion retrieved successfully                              |
| 400         | The request has inconsistent or invalid data/parameters                |
| 404         | Notarization not found for taskId, or exists but has not completed yet |
| 512         | Unhandled internal server error                                        |

## Code Examples

### Installation

```tsx
npm i node-fetch
```

### Request

```tsx
const params = { taskId };
const url =
  `${this.backendUrl}/notarizations/proof-of-inclusion?` +
  new URLSearchParams(params);
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
