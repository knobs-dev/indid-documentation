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
