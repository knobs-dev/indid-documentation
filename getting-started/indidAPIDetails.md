# Details of Indid API

Through this API it is possible to interact with Indid service without the usage of the SDK but dealing directly with the endpoints of the backend.

To use all the features and, thus, enjoy the full experience of the Indid service, it is necessary to sign up for a subscription with KNOBS, which will give to the user access to all the calls exposed by the API, through the distribution of Compute Units (CU).

## Compute Units

For each type of subscription to the service, Indid will give to the user a different amount of Compute Units, that will be necessary to perform some actions in the application. In particular the account creation, the sponsorization of a userOperation and the account recovery needs that the caller account owns a certain amount of CU to complete the operation.

## Bundler

Indid uses the bundler developed by Infinitism team (https://github.com/eth-infinitism/bundler/tree/main).

This bundler follows all the rules of ERC-4337 standard for account abstraction.

## Networks

Indid service is active on these networks:

| Chain | Mainnet | Testnet |
| --- | --- | --- |
| Polygon | :heavy_check_mark: Polygon Mainnet  | :heavy_check_mark: Mumbai |
| Ethereum | coming soon... | coming soon... |
| Linea | coming soon... | coming soon... |


---

Returning to the endpoints, through them it is possible to perform the operations that concern the creation of an account, the ones that are responsible for the recovery of an account and the ones that deal with User Operations.

## Account Creation

A user can create his/her personal account and also smart contract wallet. This operation can be done by interacting with the endpoints devoted to the Account Creation. 

### CreateAccount

By dealing with this endpoint, a user asks to the backend to create a new smart contract wallet. The backend will execute a transaction on-chain for the wallet creation, and will also create the user's account on Indid database.

The request is a POST and the request type is ICreateAccountRequest, an object containing all the info useful for the smart contract method call. In particular, the user can decide to pass as input into the request object only the owner's address or also the information about the guardians (guardians storage identifier if the project works with a shared guardians storage, or guardians array if the project is in "generalized" mode and, so, it doesn't have any shared storage), the factory address, the module address and a salt for address generation.

In case the user passes to the endpoint only the owner address, the other values are retrieved by the backend from the database according to the user's apiKey (mandatory in the request header).

The apiKey is also used to check if the user owns the needed amount of compute units, mandatory to perform an account creation.

The reply of this endpoint call returns to the client an object containing the smart contract wallet address and the transaction hash.

### InitCode

The smart contract wallet creation can be done also when sending the first userOperation on-chain from that wallet. This is possible, also according ERC-4337 standard, by inserting an initCode as a field of a userOp (otherwise, the default initCode is represented by 32 bytes made by zeros).

This endpoint is useful to get an initCode that can be successively used as parameter in the crafting phase of the userOp to send.

The request type is IInitCodeRequest, that is a JSON that contains the owner's address as mandatory field and, following the same logic of the createAccount endpoint, also contains optional params: guardianId or guardians array (same logic as above), factory address, module address, salt and chainId (at the moment the chainId is not used in our application, but we set up the endpoint to deal, in future, with multiple chains).

The reply of this method is a JSON containing the initCode.


> ** Note **    
Right now, using the initCode to create a smart contract wallet within a userOperation doesn't create an Indid account in the database. This feature will be available soon!

### Get the default values for createAccount

A user can interact with this endpoint in order to retrieve the default values for account creation.

The Request contains the chainId (optional as in the initCode endpoint, useful for future multiple chains logic) and the apiKey in the header.

The endpoint sends to the client a reply that is a JSON containing the factory address, the module address, the info about the guardians (same logic as above), the storage type ("shared" or "generalized") and the module type ("enterprise" or "user").


## UserOperation

A user can interact with Indid endpoints to send a userOperation, get a userOperation sponsored (user needs to own computeUnits) and can see the status of a userOperation

### Sponsorization of a userOp

A user can interact with this endpoint in order to receive the paymasterAndData field to insert as input in the crafting phase of a userOperation to send.

The request contains the user's apiKey in the header (to check the available compute units) and a JSON that iis made of a partial userOperation (a IUserOperation without the paymasterAndData and signature fields). Check the detail of the endpoint to see the fields of the requests (the userOp structure follows the ERC-4337 standard).

The reply is a JSON containing the crafted paymasterAndData, signed by Indid backend.

### Send a userOperation

A user can send a userOperation to the bundler by interacting with this endpoint.

The request is a JSON containing a userOperation (IUserOperation). The structure of the userOp, as in the previous endpoint, follows the ERC-4337 standard.
The user can insert a paymasterAndData field if wants the userOp to be sponsored by Indid paymaster (as above, there will be a check on his apiKey to verify the possession of the compute units) or, if he wants to pay the operation himself, leave it blank.

The reply is a JSON containing the userOp hash.

### Get the status of a userOperation

With this endpoint, a user can check the status of a userOperation by inserting the hash of the userOp.

The request is a JSON containing the opHash, while the reply is the userOperation receipt if it exists, otherwise 'null'.


## Account Recovery

Through this endpoint a user can recover his smart contract wallet.

### Recover Account

The backend sets a new owner for his smart contract wallet by sending a transaction on-chain that transfers the contract ownership.

Request: a JSON containing the wallet address, the new owner's address, the signature, a nonce for the transaction, the deadline of the request and, optionally, the module address and additional params.

The request must contain the apiKey in the header because, in order to perform an account recovery, the user must have a certain amount of compute units.

The reply is a JSON containing the hash of the transaction that transferred the contract's ownership.



