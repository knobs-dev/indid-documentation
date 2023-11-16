# Create a new account

Category: `Create Account`

Description: Creates a new smart contract wallet and the account in the database related to it. The request body is a JSON (type ICreateAccountRequest) containing the params below.

Type: `POST`

URL: /create-account

### Body Params (ICreateAccountRequest)

| Name | Type | Required? | Description |
| --- | --- | --- | --- |
| owner | string | yes | The address of the smart contract wallet owner |
| factoryAddress | string | no | The address of the smart contract wallet factory |
| _guardians | string[] | no | The guardians array in case of generalized account |
| _guardianId | string | no | The guardians structId in case of shared storage account |
| _module | string | no | The address of the module |
| salt | number | no | The salt for counterfactual address generation |
| webHookData | IWebHookRequest | no | Data structure with two fields, a tag that represents the endpoint that will be called from the webhook, and an optional metadata that represents a generic object that will be returned by the backend with the webhook call |

### IWebHookRequest detail 

```ts

interface IWebHookRequest {
    tag : string;
    metadata? : Record<string, unknown>;
}

```


### Error Handling

| HTTP Status | Meaning |
| --- | --- |
| 200 | OK |
| 512 | Internal server error while creating account |
| 515 | Error during createAccountRequest parsing. Wrong input format for the createAccountRequest |

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