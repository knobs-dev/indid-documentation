# Indid Admin SDK

The admin sdk provides all the methods and functionalities of the core sdk, it also provides the following:

## init

A method for obtaining an initialized instance of the sdk

```tsx
const clientAdmin = await AdminClient.init(
  pcUrl: string,
  adminApiKey: string
  );
```

## createAccount

A method for creating(deploying) a smart contract wallet, requires CUs.
The field opts is only needed when the values set at project creation should be overridden.

Returns the address and the task ID of the deploy transaction inside an ```ICreateAccountResponse```.

```tsx
await clientAdmin.createAccount(
  owner: string,
  salt: string = "0",
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
interface ICreateAccountResponse {
  accountAddress: string;
  taskId: string;
  error?: string;
}
```

## createAndConnectAccount

A method for creating(deploying) a SCW, requires CUs.
The field opts is only needed when the values set at project creation should be overridden.

Returns the address and the task ID of the deploy transaction inside an ```ICreateAccountResponse```. If no signer has been provided it also returns the seed of the newly created signer.

```tsx
await clientAdmin.createAndConnectAccount(
  signer?: ethers.Signer,
  salt: string = "0",
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

```tsx
await clientAdmin.getUserOpSponsorship(
  builder: IUserOperationBuilder
);
```

```tsx
interface IUserOpSponsorshipResponse {
  paymasterAndData: string;
  error?: string;
}
```
