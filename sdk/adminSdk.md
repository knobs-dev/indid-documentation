# Indid Admin SDK

The admin sdk provides all the methods and functionalities of the core sdk, it also provides the following:

## init

A method for obtaining an initialized instance of the sdk

```ts
const clientAdmin = await AdminClient.init(
  rpcUrl: string,
  adminApiKey: string
  );
```

It's possible to pass optional parameters to the init method, such as the entry point, the override bundler rpc url, the override backend url and the log level.
The log level defaults to NONE, which means no logs will be printed.

```ts
interface IClientOpts {
  entryPoint?: string;
  overrideBundlerRpc?: string;
  overrideBackendUrl?: string;
  logLevel?: LogLevel
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
  owner: string,
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
  guardians: string[];
  guardiansHash?: BytesLike;
  guardianStructId?: BytesLike;
}
```

```ts
interface ICreateAccountResponse {
  accountAddress: string;
  taskId: string;
  error?: string;
}
```

## createAndConnectAccount

A method for creating(deploying) a SCW, requires CUs.
The salt defaults to 0 and should be changed only if the same owner wants to deploy multiple smart contract wallets.
The field opts is only needed when the values set at project creation should be overridden.
It will always wait internally for the deploy transaction to be validated and then connect to the newly created account.

Returns the address and the task ID of the deploy transaction inside an ```ICreateAccountResponse```. If no signer has been provided it also returns the seed of the newly created signer.

```ts
const response = await clientAdmin.createAndConnectAccount(
  signer?: ethers.Signer,
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
  guardians: string[];
  guardiansHash?: BytesLike;
  guardianStructId?: BytesLike;
}
```

```ts
interface ICreateAndConnectAccountResponse {
  accountAddress: string;
  taskId: string;
  seed?: string;
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

```ts
interface IUserOpSponsorshipResponse {
  paymasterAndData: string;
  error?: string;
}
```

## recoverEnterpriseAccount

A method for changing the owner of an existing smart contract account, it consumes Computes Units (CU).
GuardianSigner is the signer of the wallet's guardian.

Returns a taskID inside ```IRecoverAccountResponse```.

```ts
const response = await clientAdmin.recoverEnterpriseAccount(
    accountAddress: string,
    newOwner: string,
    guardianSigner: ethers.Wallet | ethers.providers.JsonRpcSigner,
    webhookData?: IWebHookRequest
  );
```

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