# Indid Admin SDK

The admin sdk provides all the methods and functionalities of the core sdk, it also provides the following:

## init

A method for obtaining an initialized instance of the sdk

```ts
const clientAdmin = await AdminClient.init(
  config: IClientConfig
  );
```

It's possible to pass optional parameters to the init method, such as the entry point, the override bundler rpc url, the override backend url and the log level.
The log level defaults to NONE, which means no logs will be printed.

```ts
interface IClientConfig {
    apiKey: string;
    rpcUrl?: string;
    chainId?: BigNumberish;
    overrideBundlerRpc?: string;
    overrideBackendUrl?: string;
    overrideEntryPoint?: string;
    logLevel?: LogLevel;
}
```

```ts
enum LogLevel {
  NONE,
  DEBUG,
  INFO,
  WARNING,
  ERROR
}
```

## createAccount

A method for creating(deploying) a smart contract wallet, requires CUs. The salt defaults to 0 and should be changed only if the same owner wants to deploy multiple smart contract wallets.
The field opts is only needed when the values set at project creation should be overridden.

Returns the address and the task ID of the deploy transaction inside an ```ICreateAccountResponse```.

```ts
const response = await clientAdmin.createAccount(
  owners: IndidAddress[],
  salt?: string,
  webhookData?: IWebHookRequest,
  opts?: ICreateAccountOpts
);
```

### Interfaces

```ts
interface IWebHookRequest {
  tag : string;
  metadata? : Record<string, unknown>;
}
```

```ts
interface ICreateAccountOpts {
  storageType: string;
  moduleType: string;
  factoryAddress: string;
  moduleAddress: string;
  guardians: IndidAddress[];
  beaconId?: BytesLike;
}
```

```ts
interface ICreateAccountResponse {
  accountAddress: string;
  taskId: string;
  error?: string;
}
```

### Parameters

Takes the following parameters:
- `owners`: An array of `IndidAddress` objects representing the account owners
- `salt` (optional): A unique value to ensure deployment address uniqueness. Defaults to "0"
- `webhookData` (optional): Configuration for webhook notifications about the deployment process
- `opts` (optional): Configuration options to override default project settings:
  - `storageType`: The type of storage to use for the account
  - `moduleType`: The type of module to use for the account
  - `factoryAddress`: The address of the account factory contract
  - `moduleAddress`: The address of the module contract
  - `guardians`: An array of guardian addresses for the account
  - `beaconId`: Optional beacon ID for shared storage accounts

### Returns

Returns an object containing:
- `accountAddress`: The address of the newly created smart contract wallet
- `taskId`: A unique identifier for tracking the deployment process
- `error`: Optional error message if the request fails

### Example Usage
```ts
// Prepare the account parameters
const ownerPrivateKey = "0x123...";
const wallet = new ethers.Wallet(ownerPrivateKey);
const ownerAddress = IndidAddress.fromSecp256k1(wallet.address);

// Create the account
const response = await clientAdmin.createAccount(
  [ownerAddress],
  "1", // Salt
);

console.log(`Created account at address: ${response.accountAddress}`);

// Monitor the deployment process
const result = await clientAdmin.waitTask(response.taskId);
console.log(`Deployment status: ${result.status}`);
```

The returned task ID can be used with the `waitTask` method to monitor the deployment process status. If a webhook was configured, updates will also be sent to the specified endpoint.

## createAndConnectAccount

A method for creating(deploying) a SCW, requires CUs.
The salt defaults to 0 and should be changed only if the same owner wants to deploy multiple smart contract wallets.
The field opts is only needed when the values set at project creation should be overridden.
It will always wait internally for the deploy transaction to be validated and then connect to the newly created account.

Returns the address and the task ID of the deploy transaction inside an ```ICreateAccountResponse```. If no signer has been provided it also returns the seed of the newly created signer.

```ts
const response = await clientAdmin.createAndConnectAccount(
  signer: IndidSigner,
  salt?: string,
  webhookData?: IWebHookRequest,
  opts?: ICreateAccountOpts
);
```

```ts
interface IWebHookRequest {
  tag : string;
  metadata? : Record<string, unknown>;
}
```

```ts
interface ICreateAccountOpts {
  storageType: string;
  moduleType: string;
  factoryAddress: string;
  moduleAddress: string;
  guardians: IndidAddress[];
  beaconId?: BytesLike;
}
```

```ts
interface ICreateAndConnectAccountResponse {
  accountAddress: string;
  taskId: string;
  error?: string;
}
```

## getUserOpSponsorship

A method for getting a User Operation Sponsored, it consumes Computes Units (CU).

It applies the PaymasterAndData field on the builder itself. If only the field is needed it can be retrieved from the ```IUserOpSponsorshipResponse```.

```ts
const response = await clientAdmin.getUserOpSponsorship(
  builder: IUserOperationBuilder
);
```

### Interfaces

```ts
interface IUserOpSponsorshipResponse {
  paymasterAndData: string;
  error?: string;
}
```

### Parameters

Takes the following parameters:
- `builder`: An `IUserOperationBuilder` object containing the user operation to be sponsored

### Returns

Returns an object containing:
- `paymasterAndData`: The paymaster data needed to sponsor the user operation
- `error`: Optional error message if the request fails

### Example Usage
```ts
// Get sponsorship for the user operation
const response = await clientAdmin.getUserOpSponsorship(builder);
// The builder now has the paymaster data applied to it

// Alternatively, you can access the paymaster data directly
console.log(`PaymasterAndData: ${response.paymasterAndData}`);
```

Note that the sponsorship is automatically applied to the builder object. The operation can be sent immediately after getting sponsorship without any additional steps.

## recoverEnterpriseAccount

A method for changing the owner of an existing smart contract account, it consumes Computes Units (CU).
GuardianSigner is the signer of the wallet's guardian.

Returns a taskID inside ```IRecoverAccountResponse```.

```ts
const response = await clientAdmin.recoverEnterpriseAccount(
    accountAddress: string,
    newOwner: IndidAddress,
    guardianSigner: IndidSigner,
    webhookData?: IWebHookRequest
  );
```

### Interfaces

```ts
interface IWebHookRequest {
  tag : string;
  metadata? : Record<string, unknown>;
}
```

```ts
interface IRecoverAccountResponse {
  taskId: string;
  error?: string;
}
```

### Returns

Returns an object containing:
- `taskId`: A unique identifier for tracking the recovery process
- `error`: Optional error message if the request fails

### Example Usage
```ts
// Prepare the recovery parameters
const accountToRecover = "0x123..."; // The address of the account to recover
const newOwnerAddress = IndidAddress.fromSecp256k1("0x456..."); // The new owner's address
const guardianPrivateKey = "0x789..."; // The guardian's private key
const wallet = new ethers.Wallet(guardianPrivateKey);
const guardianSigner = IndidSigner.fromSecp256k1(wallet.privateKey, SignerKind.Guardian);

// Optional webhook data
const webhook = {
  tag: "account-recovery",
  metadata: {
    reason: "lost access",
    requestedBy: "support-team-123"
  }
};

// Initiate account recovery
const response = await clientAdmin.recoverEnterpriseAccount(
  accountToRecover,
  newOwnerAddress,
  guardianSigner,
  webhook
);

// Monitor the recovery process
const result = await clientAdmin.waitTask(response.taskId);
console.log(`Recovery status: ${result.status}`);
```

The returned task ID can be used with the `waitTask` method to monitor the recovery process status. If a webhook was configured, updates will also be sent to the specified endpoint.

## sendDelegatedTransactions

A method for sending a batch of delegated transactions, requires CUs. If the provider/chainId are not provided at initialization they chaindId be required in this function. 
The webhookData is optional and can be used to specify a webhook to be called upon the transactions success or failure.
Returns a taskID inside ```ISendDelegatedTransactionsResponse```.

```ts
const response = await clientAdmin.sendDelegatedTransactions(
    transactions: ICall[],
    opts?: IDelegatedTransactionOptions
  );
```

### Interfaces

```ts
interface IDelegatedTransactionOptions {
  chainId?: BigNumberish;
  doNotRevertOnTxFailure?: boolean;
  deadlineSeconds?: number;
  webhookData?: IWebHookRequest;
}
```

The tag field is mandatory and represents the specific webhook to be called upon the operation completion.
Metadata is optional and can be used to pass additional information to the webhook that will be returned with the webhook callback.

```ts
interface IWebHookRequest {
  tag : string;
  metadata? : Record<string, unknown>;
}
```

```ts
interface ISendDelegatedTransactionsResponse {
  taskId: string;
  error?: string;
}
```

### Parameters

Takes the following parameters:
- `transactions`: An array of `ICall` objects representing the transactions to be executed
- `opts` (optional): Configuration options for transaction execution, including:
  - `chainId`: The blockchain network identifier (required if not provided during initialization)
  - `doNotRevertOnTxFailure`: Flag to continue execution even if a transaction fails
  - `deadlineSeconds`: Expiration time in seconds after which the transaction becomes invalid
  - `webhookData`: Configuration for webhook notifications

### Returns

Returns an object containing:
- `taskId`: A unique identifier for tracking the transaction execution
- `error`: Optional error message if the request fails

### Example Usage
```ts
// Define transactions to execute
const transactions = [
  {
    to: "0x123...",
    value: ethers.utils.parseEther("0.1"),
    data: "0x"
  },
  {
    to: "0x456...",
    value: 0,
    data: "0x789..."  // Contract interaction data
  }
];

// Set options
const options = {
  chainId: 1,
  deadlineSeconds: 3600, // 1 hour
  webhookData: {
    tag: "batch-transfer",
    metadata: {
      purpose: "weekly payments"
    }
  }
};

// Send delegated transactions
const response = await clientAdmin.sendDelegatedTransactions(transactions, options);

// Monitor the transaction status
const result = await clientAdmin.waitTask(response.taskId);
```

## sendPreparedDelegatedTransactions

A method for sending a previously prepared delegated transaction to the Indid backend. This method executes transactions that have been signed by the account owner but are submitted through a delegated sender.

```ts
const response = await clientUser.sendPreparedDelegatedTransactions(
  preparedTransaction: ISendDelegatedTransactionsRequest
);
```

### Interfaces

```ts
interface ISendDelegatedTransactionsRequest {
    accountAddress: string;
    chainId: BigNumberish;
    moduleAddress: string;
    data: BytesLike;
    nonce: BigNumberish;
    deadline: number;
    sigs: BytesLike;
    webhookData?: IWebHookRequest;
}
```

```ts
interface ISendDelegatedTransactionsResponse {
  taskId: string;
  error?: string;
}
```


### Parameters

Takes a `preparedTransaction` object with the following properties:
- `accountAddress`: The smart contract account address that will execute the transaction
- `chainId`: The blockchain network identifier
- `moduleAddress`: The address of the module contract handling the transaction
- `data`: The encoded transaction calldata
- `nonce`: A unique number to prevent replay attacks
- `deadline`: Expiration time in seconds after which the transaction becomes invalid
- `sigs`: The signatures authorizing the transaction
- `webhookData` (optional): Configuration for webhook notifications

### Returns

Returns an object containing:
- `taskId`: A unique identifier for tracking the transaction execution
- `error`: Optional error message if the request fails

### Example Usage
```ts
// First prepare the delegated transaction
const preparedTx: ISendDelegatedTransactionsRequest = {
  accountAddress: "0x123...",
  chainId: 1,
  moduleAddress: "0x456...",
  data: "0x789...",
  nonce: 1,
  deadline: 3600, // 1 hour from now
  sigs: "0xabc...",
  webhookData: {
    tag: "transfer-eth",
    metadata: {
      type: "payment",
      amount: "1.5 ETH"
    }
  }
};

// Send the prepared transaction
const response = await clientUser.sendPreparedDelegatedTransactions(preparedTx);

// Monitor the transaction status
const result = await clientUser.waitTask(response.taskId);
```

The returned task ID can be used with the `waitTask` method to monitor the transaction's execution status. If a webhook was configured, updates will also be sent to the specified endpoint.