# Untitled

Category: Search

# Getting Started

The following steps show how to set up the Indid Core SDK and Indid Admin SDK, deploy a new smart contract wallet, create an user operation, get the user operation sponsored, and execute the user operation. 

First of all we need to create an instance of the two sdks, client:

```tsx
import { Client } from "@knobs-dev/indid-core-sdk";
const clientUser = await Client.init(
      rpcUrl,
      coreApiKey
    );
```

admin:

```tsx
import { AdminClient } from "@knobs-dev/indid-admin-sdk";
const clientAdmin = await AdminClient.init(
      rpcUrl,
      adminApiKey
    );
```

now you can use either the core or the admin to get a counterfactual address, i.e. an address to which a contract will eventually be deployed but hasn't yet is called a counterfactual address

```tsx
const accountAddress = await clientUser.getCounterfactualAddress(ownerAddress);
console.log("accountAddress returned from coresdk", accountAddress.accountAddress);
```

to actually deploy the smart contract wallet you need to use the admin sdk

```tsx
await clientAdmin.createAccount(ownerAddress);
```

once the account has been created it can actually be used by the core sdk, let’s send a generic transaction, for example a transfer of 1 wei to a friend.

```tsx
 await clientUser.connectAccount(
      ownerSigner,
      accountAddress,
    );
const to = friendAddress
const value = "1"
const calldata = "0x"

const builder = await clientUser.prepareSendTransactions([to],[value],[calldata])
```

now you can decide if the user should pay for the user operation with their own funds or if they should get sponsored by the admin, if the latter it’s the case:

```tsx
await clientAdmin.getUserOpSponsorship(builder);
```

after that you have to sign and send the user operation with the core, you can also wait for the user operation result.

```tsx
await clientUser.signUserOperation(builder);
const userOpHash = await clientUser.sendUserOperation(builder);
await clientUser.waitOP(userOpHash);
```

# Builder

A UserOperation is a pseudo-transaction object used to execute actions through a smart 
contract account. Although it can be quite complex to create, the `UserOperationBuilder` simplifies this process using the [builder pattern](https://refactoring.guru/design-patterns/builder).

## Interfaces

These interfaces are built using common [ethers.js](https://docs.ethers.io/) types. More specifically `[BigNumberish](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish)` and `[BytesLike](https://docs.ethers.io/v5/api/utils/bytes/#BytesLike)`.

### UserOperation

An interface for an ERC-4337 User Operation. Building a `UserOperation` involves constructing multiple parts and merging them together.

```tsx
interface IUserOperation {
  sender: string;
  nonce: BigNumberish;
  initCode: BytesLike;
  callData: BytesLike;
  callGasLimit: BigNumberish;
  verificationGasLimit: BigNumberish;
  preVerificationGas: BigNumberish;
  maxFeePerGas: BigNumberish;
  maxPriorityFeePerGas: BigNumberish;
  paymasterAndData: BytesLike;
  signature: BytesLike;
}
```

### UserOperationBuilder

An instance of `UserOperationBuilder` can help build a `UserOperation` that can be passed to the client.

```tsx
interface IUserOperationBuilder {
  // get methods.
  getSender: () => string;
  getNonce: () => BigNumberish;
  getInitCode: () => BytesLike;
  getCallData: () => BytesLike;
  getCallGasLimit: () => BigNumberish;
  getVerificationGasLimit: () => BigNumberish;
  getPreVerificationGas: () => BigNumberish;
  getMaxFeePerGas: () => BigNumberish;
  getMaxPriorityFeePerGas: () => BigNumberish;
  getPaymasterAndData: () => BytesLike;
  getSignature: () => BytesLike;
  getOp: () => IUserOperation;

  // set methods.
  setSender: (address: string) => IUserOperationBuilder;
  setNonce: (nonce: BigNumberish) => IUserOperationBuilder;
  setInitCode: (code: BytesLike) => IUserOperationBuilder;
  setCallData: (data: BytesLike) => IUserOperationBuilder;
  setCallGasLimit: (gas: BigNumberish) => IUserOperationBuilder;
  setVerificationGasLimit: (gas: BigNumberish) => IUserOperationBuilder;
  setPreVerificationGas: (gas: BigNumberish) => IUserOperationBuilder;
  setMaxFeePerGas: (fee: BigNumberish) => IUserOperationBuilder;
  setMaxPriorityFeePerGas: (fee: BigNumberish) => IUserOperationBuilder;
  setPaymasterAndData: (data: BytesLike) => IUserOperationBuilder;
  setSignature: (bytes: BytesLike) => IUserOperationBuilder;
  setPartial: (partialOp: Partial<IUserOperation>) => IUserOperationBuilder;

  // Sets the default values that won't be wiped on reset.
  useDefaults: (partialOp: Partial<IUserOperation>) => IUserOperationBuilder;
  resetDefaults: () => IUserOperationBuilder;

  // Some fields may require arbitrary logic to build an op.
  // Middleware functions allow you to set custom logic for building op fragments.
  useMiddleware: (fn: UserOperationMiddlewareFn) => IUserOperationBuilder;
  resetMiddleware: () => IUserOperationBuilder;

  // This will construct a UserOperation that can be sent to a client.
  // It will run through your entire middleware stack in the process.
  buildOp: (
    entryPoint: string,
    chainId: BigNumberish
  ) => Promise<IUserOperation>;

  // Will reset all fields back to default value.
  resetOp: () => IUserOperationBuilder;
}
```

### get and set Functions

These are basic getters and setters for all fields on a UserOperation. Getters return the field type whereas setters will return the instance to enable chaining.

For example:

```tsx
const builder = new UserOperationBuilder()
  .setCallData(callData)
  .setCallGasLimit(callGas);
```

# Indid Core SDK

Software development kit that facilitates the interaction with Indid infrastructure. 

## init

A method for obtaining an initialized instance of the sdk.

```tsx
const clientUser = await Client.init(
      rpcUrl: string,
      coreApiKey: string
    );
```

## getCounterfactualAddress

A method for getting the address of a yet to be deployed smart contract wallet.

Returns the address.

```tsx
const accountAddress = await clientUser.getCounterfactualAddress(ownerAddress: string,
    factoryAddress?: string,
    moduleAddress?: string,
    guardiansHash?: BytesLike,
    guardianStructId?: BytesLike,
    salt?: number
		);
```

## connectAccount

A method for connecting to an already deployed account, this is necessary for preparing and signing user operations.

```tsx
 await clientUser.connectAccount(
    signer: ethers.Wallet | ethers.providers.JsonRpcSigner,
    accountAddress: string,
    moduleAddress?: string,
    );
```

## prepareSendTransaction

A method for preparing a partial user operation that executes the specified transactions. It’s partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```tsx
const builder = await clientUser.prepareSendTransactions(
    to: string[],
    value: BigNumberish[],
    calldata: string[],
    initCode?: string
  );
```

## prepareSendETH

A method for preparing a partial user operation that sends the desired amount of native currency to the recipient. It’s partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```tsx
const builder = await clientUser.prepareSendETH(
    recipientAddress: string,
    amount: BigNumberish
  );
```

## prepareSendERC20

A method for preparing a partial user operation that sends the desired amount of the specified ERC20 to the recipient. It’s partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```tsx
const builder = await clientUser.prepareSendERC20(
    contractAddress: string,
    recipientAddress: string,
    amount: BigNumberish
  );
```

## prepareSendModuleOperation

A method for preparing a partial user operation that executes specific wallet functions implemented by the main module. It’s partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```tsx
const builder = await clientUser.prepareSendModuleOperation(
    calldata: string,
    nonce?: string,
    signatures?: string,
    initCode?: string
  );
```

## signUserOperation

A method for signing user operations, it applies the signature on the builder object itself.

```tsx
await clientUser.signUserOperation(builder: IUserOperationBuilder);
```

## sendUserOperation

A method for directing a builder instance to create a User Operation and send it to Indid bundler. 

Returns the User Operation Hash.

```tsx
const userOpHash = await clientUser.sendUserOperation(builder: IUserOperationBuilder);
```

## waitOP

A method for waiting an User Operation Hash returned by sendUserOperation

```tsx
await clientUser.waitOP(userOpHash: string);
```

# Indid Admin SDK

The admin sdk provides all the methods and functionalities of the core sdk, it also provides the following:

## init

A method for obtaining an initialized instance of the sdk

```tsx
const clientAdmin = await AdminClient.init(
      rpcUrl: string,
      adminApiKey: string
    );
```

## createAccount

A method for creating(deploying) a SCW, requires CUs.

Returns the address and the transaction hash of the deploy transaction.

```tsx
await clientAdmin.createAccount(owner: string,
    factoryAddress?: string,
    moduleAddress?: string,
    guardians?: string[],
    guardianStructId?: BytesLike,
    salt?: string);
```

## createAndConnectAccount

A method for creating(deploying) a SCW, requires CUs.

Returns the address and the transaction hash of the deploy transaction, if no signer has been provided it also returns the seed of the newly created signer.

```tsx
await clientAdmin.createAndConnectAccount(signer?: ethers.providers.JsonRpcSigner | ethers.Wallet,
    factoryAddress?: string,
    moduleAddress?: string,
    guardians?: string[],
    guardianStructId?: BytesLike);
```

## getUserOpSponsorship

A method for getting a User Operation Sponsored, it consumes Computes Units (CU).

It applies the PaymasterAndData field on the builder itself. If only the field is needed it can be retrieved with builder.getPaymasterAndData().

```tsx
await clientAdmin.getUserOpSponsorship(builder: IUserOperationBuilder);
```