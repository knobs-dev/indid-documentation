# Indid Core SDK

Software development kit that facilitates the interaction with Indid infrastructure.

## init

A method for obtaining an initialized instance of the sdk.
Throws an error if the provided rpcUrl is invalid or the coreApiKey is not valid.

```ts
const clientUser = await Client.init(
      rpcUrl: string,
      coreApiKey: string
    );
```

## connectAccount

A method for connecting to a smart contract account with the signer of the owner, this is necessary for preparing and signing user operations. The field opts is only needed when the values set at project creation should be overridden.

```ts
clientUser.connectAccount(
  signer: ethers.Wallet | ethers.providers.JsonRpcSigner,
  accountAddress: string,
  opts?: IConnectAccountOpts
  );
```

```ts
interface IConnectAccountOpts {
  moduleType: string,
  moduleAddress: string,
  storageType: string,
}
```

## getCounterfactualAddress

A method for getting the address of a yet to be deployed smart contract wallet. The salt defaults to 0 and should be changed only if the same owner wants to deploy multiple smart contract wallets. The field opts is only needed when the values set at project creation should be overridden.

Returns the address inside an ```IGetCounterfactualAddressResponse```

```ts
const response = await clientUser.getCounterfactualAddress(
    owner: string,
    salt?: string,
    opts?: ICreateAccountOpts
  );
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
interface IGetCounterfactualAddressResponse {
  accountAddress: string;
  error?: string;
}
```

## getInitCode

A method for getting the init code for a new smart contract wallet. The field opts is only needed when the values set at project creation should be overridden.

Returns the init code inside an ```IInitCodeResponse```

```ts
const response = await clientUser.getInitCode(
    owner: string,
    salt?: string,
    opts?: ICreateAccountOpts
  );
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
interface IInitCodeResponse {
  initCode: string;
  error?: string;
}
```

## getAccountNonce

A method for getting the deployed smart contract wallet nonce. If a smart contract wallect has been connected the accountAddress field is not needed. Otherwise the returned nonce is the nonce of the specified accountAddress.

Returns a BigNumber with the account nonce inside an ```IGetNonceResponse```.

```ts
const response = await clientUser.getAccountNonce(accountAddress?: string);
```

```ts
interface IGetNonceResponse {
  nonce: BigNumberish;
  error?: string;
}
```

## prepareSendTransaction

A method for preparing a partial user operation that executes the specified transactions. It’s partial because it still needs to be sponsored (optionally) and signed.
It can be used to send multiple transactions in a single operation, the array positions of the parameters must match. The nonceOP field is optional and can be used to override the nonce of the smart contract account. The initCode is optional and can be used to deploy a new smart contract wallet.

Returns a builder containing the partial user operation.

```ts
const builder = await clientUser.prepareSendTransactions(
    to: string[],
    value: BigNumberish[],
    calldata: string[],
    nonceOP?: string,
    initCode?: string
  );
```

## prepareSendETH

A method for preparing a partial user operation that sends the desired amount of native currency to the recipient. The nonceOP field is optional and can be used to override the nonce of the smart contract account. It’s partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```ts
const builder = await clientUser.prepareSendETH(
    recipientAddress: string,
    amount: BigNumberish,
    nonceOP?: string
  );
```

## prepareSendERC20

A method for preparing a partial user operation that sends the desired amount of the specified ERC20 to the recipient. It’s partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```ts
const builder = await clientUser.prepareSendERC20(
    contractAddress: string,
    recipientAddress: string,
    amount: BigNumberish,
    nonceOP?: string
  );
```

## prepareSendModuleOperation

A method for preparing a partial user operation that executes specific wallet functions implemented by the main module. The nonceOP field is optional and can be used to override the nonce of the smart contract account. It’s partial because it still needs to be sponsored (optionally) and signed.
The initCode is optional and can be used to deploy a new smart contract wallet.

Returns a builder containing the partial user operation.

```tsx
const builder = await clientUser.prepareSendModuleOperation(
    calldata: string,
    nonce: string,
    deadline: string,
    signatures: string,
    nonceOP?: string,
    initCode?: string
  );
```

## prepareEnterpriseRecoveryOperation

A method for preparing a partial user operation that executes a recovery operation. It’s partial because it still needs to be sponsored (optionally) and signed. The connected smart contract wallet should be owned by the enterprise guardian.

Returns a builder containing the partial user operation.

```ts
const builder = await prepareEnterpriseRecoveryOperation(
    accountAddress: string,
    newOwner: string
  );
```

## signUserOperation

A method for signing user operations, it applies the signature on the builder object itself.
Return the userOpHash that has been signed, the signature and an optional error string inside an ```ISignUserOperationResponse```.

```ts
const response = await clientUser.signUserOperation(
  builder: IUserOperationBuilder
  );
```

```ts
interface ISignUserOperationResponse {
  userOpHash: string;
  signature: string;
  error?: string;
}
```

## sendUserOperation

A method for directing a builder instance to create a User Operation and send it to Indid bundler.
The webhookData is optional and can be used to specify a webhook to be called upon the operation success or failure.
Returns the User Operation Hash and a Task Id inside an ```ISendUserOpResponse```.

```ts
const response = await clientUser.sendUserOperation(
  builder: IUserOperationBuilder
  webhookData?: IWebHookRequest
  );
```

```ts
interface ISendUserOpResponse {
  userOpHash: string;
  taskId: string;
  error?: string;
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

## getUserOperationHash

A method for getting the User Operation Hash from a builder instance. This can be useful for signing the operation in a different environment.

Returns the User Operation Hash inside an ```IGetUserOperationHashResponse```, this needs to be arrayfied before being signed.

```ts
const response = getUserOperationHash(builder: IUserOperationBuilder);
```

```ts
interface IGetUserOperationHashResponse {
  userOpHash: string;
  error?: string;
}
```

## waitOP

A method for waiting an User Operation Hash returned by sendUserOperation, returns the receipt inside an ```IUserOperationReceipt``` upon success.

```ts
const response = await clientUser.waitOP(userOpHash: string);
```

```ts
interface IUserOperationReceipt {
  blockHash: string;
  logsBloom: string;
  contractAddress: string;
  transactionIndex: number;
  transactionHash: string;
  gasUsed: BigNumberish;
  blockNumber: BigNumberish;
  cumulativeGasUsed: BigNumberish;
  from: string;
  blockTimestamp: string;
  to: string;
  logs: [{}];
  status: number;
  error?: string;
}
```

## waitTask

A method for waiting a backend task ID returned by some sdk functions. sendUserOperation, returns the task outcome inside an ```IWaitTaskResponse``` and an optional reason with information about the task outcome.

```ts
const response = await clientUser.waitTask(
  taskId: string,
  timeout?: number
);
```

```ts
interface IWaitTaskResponse {
  status: TaskUserOperationStatus;
  receipt?: JSON;
  reason?: string;
}
```

```ts
enum TaskUserOperationStatus {
  NOT_FOUND = "NOT_FOUND",
  PENDING = "PENDING",
  EXECUTED = "EXECUTED",
  REVERTED = "REVERTED",
  UNHANDLED = "UNHANDLED",
  FAILED = "FAILED",
  TIMEOUT = "TIMEOUT",
}
```

## verifyWebhookSignature

A static method for verifying the signature of a webhook callback.
Returns a ```boolean```, true if the signature is valid, false otherwise.

```ts
const response = verifyWebhookSignature(req: IWebHookSignatureRequest);
```

```ts
interface IWebHookSignatureRequest {
  headers: {
  signature: string;
  encodedMessage: string;
  };
  body: Record<string, unknown>;
}
```
