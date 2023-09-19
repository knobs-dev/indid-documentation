# Details of Indid API

Through this API it is possible to interact with Indid service without the usage of the SDK but dealing directly with the endpoints of the backend.

The base URL to send all API requests is https://api.dev.indid.io. HTTPS is required for all API requests.

The Indid API follows RESTful conventions and all the operations are performed via `GET` and `POST` requests. Request and response bodies are encoded as JSON.

To use all the features and, thus, enjoy the full experience of the Indid service, it is necessary to sign up for a subscription with KNOBS, which will give to the user access to all the calls exposed by the API, through the distribution of Compute Units (CU).

## Compute Units

For each type of subscription to the service, Indid will give to the user a different amount of Compute Units, that will be necessary to perform some actions in the application. In particular the account creation, the sponsorization of a userOperation and the account recovery needs that the caller account owns a certain amount of CU to complete the operation.

---

Returning to the endpoints, through them it is possible to perform the operations that concern the creation of an account, the ones that are responsible for the recovery of an account and the ones that deal with User Operations.

## Account Creation

A user can create his/her personal account and also smart contract wallet. This operation can be done by interacting with the endpoints devoted to the Account Creation. 

### CreateAccount

By dealing with this endpoint, a user asks to the backend to create a new smart contract wallet. The backend will execute a transaction on-chain for the wallet creation, and will also create the user's account on Indid database.

The request is a POST and the request type is ICreateAccountRequest, an object containing all the info useful for the smart contract method call. In particular, the user can decide to pass as input into the request object only the owner's address or also the information about the guardians (guardians storage identifier if the project works with a shared guardians storage, or guardians array if the project is in "generalized" mode and, so, it doesn't have any shared storage), the factory address, the module address and a salt for address generation.

In case the user passes to the endpoint only the owner address, the other values are retrieved by the backend from the database according to the user's apiKey (mandatory in the request header).

The reply of this endpoint call returns to the client an object containing the smart contract wallet address and the transaction hash.

### InitCode

The smart contract wallet creation can be done also when sending the first userOperation on-chain from that wallet. This is possible, also according ERC-4337 standard, by inserting an initCode as a field of a userOp (otherwise, the default initCode is represented by 32 bytes made by zeros).

This endpoint is useful to get an initCode that can be successively used as parameter in the crafting phase of the userOp to send.

The request type is IInitCodeRequest, that is a JSON that contains the owner's address as mandatory field and, following the same logic of the createAccount endpoint, also contains optional params: guardianId or guardians array (same logic as above), factory address, module address, salt and chainId (at the moment the chainId is not used in our application, but we set up the endpoint to deal, in future, with multiple chains).

The reply of this method is a JSON containing the initCode.

### Get the default values for createAccount

A user can interact with this endpoint in order to retrieve the default values for account creation.

The Request contains the chainId (optional as in the initCode endpoint, useful for future multiple chains logic) and the apiKey in the header.

The endpoint sends to the client a reply that is a JSON containing the factory address, the module address, the info about the guardians (same logic as above), the storage type ("shared" or "generalized") and the module type ("enterprise" or "user").


