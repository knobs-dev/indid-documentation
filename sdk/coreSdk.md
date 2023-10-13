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

## connectAccount

A method for connecting to an already deployed account, this is necessary for preparing and signing user operations. The field opts is only needed when the values set at project creation should be overridden.

```tsx
await clientUser.connectAccount(
  signer: ethers.Wallet | ethers.providers.JsonRpcSigner,
  accountAddress: string,
  opts?: IConnectAccountOpts
  );
```

```tsx
interface IConnectAccountOpts {
  moduleType: string,
  moduleAddress: string,
  storageType: string,
}
```

## getCounterfactualAddress

A method for getting the address of a yet to be deployed smart contract wallet. The field opts is only needed when the values set at project creation should be overridden.

Returns the address inside an ```IGetCounterfactualAddressResponse```

```tsx
const response = await clientUser.getCounterfactualAddress(
    owner: string,
    salt?: string,
    opts?: ICreateAccountOpts
  );
```

```tsx
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

```tsx
interface IGetCounterfactualAddressResponse {
  accountAddress: string;
  error?: string;
  }
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

## prepareEnterpriseRecoveryOperation

A method for preparing a partial user operation that executes a recovery operation. It’s partial because it still needs to be sponsored (optionally) and signed. The connected smart contract wallet should be owned by the enterprise guardian.

Returns a builder containing the partial user operation.

```tsx
const builder = await prepareEnterpriseRecoveryOperation(
    accountAddress: string,
    newOwner: string
  );
```

## signUserOperation

A method for signing user operations, it applies the signature on the builder object itself.

```tsx
await clientUser.signUserOperation(
  builder: IUserOperationBuilder
  );
```

## sendUserOperation

A method for directing a builder instance to create a User Operation and send it to Indid bundler.

Returns the User Operation Hash.

```tsx
const userOpHash = await clientUser.sendUserOperation(
  builder: IUserOperationBuilder
  );
```

## waitOP

A method for waiting an User Operation Hash returned by sendUserOperation, returns the receipt upon success.

```tsx
await clientUser.waitOP(userOpHash: string);
```

## waitTask

A method for waiting a backend task ID returned by some sdk functions. sendUserOperation, returns the task outcome upon completion.

```tsx
await clientUser.waitTask(
  taskId: string,
  timeout?: number
);
```
