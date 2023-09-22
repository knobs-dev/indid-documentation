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
