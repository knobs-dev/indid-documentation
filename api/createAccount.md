# Create a new account

Category: `Create Account`

Description: Creates a new smart contract wallet and the account in the database related to it. The request body is a JSON (type ICreateAccountRequest) containing the params below.

Type: `POST`

URL: /create-account

### Body Params (ICreateAccountRequest)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| owner | string | yes |  |
| factoryAddress | string | no |  |
| _guardians | string[] | no |  |
| _guardianId | string | no |  |
| _module | string | no |  |
| salt | number | no |  |

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
data: ICreateAccountRequest //input
const url =  `${this.backendUrl}/create-account`
let config = {
  method: "post",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.apiKey}`,
  },
  body: JSON.stringify(data),
};

const response = await fetch(url, config)
const JSONResponse = await response.json();

```