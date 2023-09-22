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
