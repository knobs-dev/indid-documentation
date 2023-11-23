# Getting Started

The following steps show how to set up the Indid Core SDK and Indid Admin SDK, deploy a new smart contract wallet, create an user operation, get the user operation sponsored, and execute the user operation.

1. First of all we need to create an instance of the two sdks

>1.1 On the client side we need to create an instance of the core sdk, the core sdk is used to create user operations and send them to the indid backend, it also allows to wait for the user operation result.

```ts
import { Client } from "@knobs-dev/indid-core-sdk";
const clientUser = await Client.init(
      rpcUrl,
      coreApiKey
    );
```

>1.2 On the backend side we need to create an instance of the admin sdk, the admin sdk can do everything that the core sdk can do, but it also has admin privileges, it's used to deploy smart contract wallets and to sponsor user operations.

```ts
import { AdminClient } from "@knobs-dev/indid-admin-sdk";
const clientAdmin = await AdminClient.init(
      rpcUrl,
      adminApiKey
    );
```

2. Now you can use either the core or the admin to get a counterfactual address, i.e. an address to which a contract will eventually be deployed but hasn't yet is called a counterfactual address

```ts
const accountAddress = await clientUser.getCounterfactualAddress(ownerAddress);
console.log("accountAddress returned from coresdk", accountAddress.accountAddress);
```

To actually deploy the smart contract wallet you need to use the admin sdk

```ts
await clientAdmin.createAccount(ownerAddress);
```

3. Now that the smart contract wallet has been deployed we can connect to it with the core sdk, this is necessary for preparing and signing user operations.
Let's send a generic transaction, for example a transfer of 1 wei to a friend.

```ts
clientUser.connectAccount(
      ownerSigner,
      accountAddress,
    );
const to = friendAddress
const value = "1"
const calldata = "0x"

const builder = await clientUser.prepareSendTransactions([to],[value],[calldata])
```

4. Now you can decide if the user should pay for the user operation with their own funds or if they should get sponsored by the admin, if the latter it’s the case there are two options:

>4.1. If the entire process takes place in the backend you can use the following method to apply the sponsorship directly on the builder object:

```ts
await clientAdmin.getUserOperationSponsorship(builder);
```

>4.2 Otherwise, if the process takes place on the client side you have to follow these steps:
>>4.2.1. On the client get the op from the builder and send it to your backend

```ts
const op = builder.getOp()
```

>>4.2.2. Your backend will call the api.dev.indid.io/sign-paymaster-op with the op and the indid backend will return the paymasterAndData field, your backend will return to the client the paymasterAndData field.

```ts
const paymasterdAndData = await fetch("https://api.dev.indid.io/sign-paymaster-op", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminApiKey}`,
  },
  body: JSON.stringify({
    op,
  }),
}).then((res) => res.json().then((data) => data.paymasterAndData));
```

>>4.2.3. The client will set the paymasterAndData field on the builder object

```ts
builder.setPaymasterAndData(paymasterAndData)

```

5. After that you have to sign and send the user operation with the core sdk, you can also wait for the user operation result.

```ts
await clientUser.signUserOperation(builder);
const response = await clientUser.sendUserOperation(builder);
await clientUser.waitOP(response.userOpHash);
```
