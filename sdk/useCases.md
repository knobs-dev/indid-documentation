# Use cases

Let's say that you have a dapp the allows users to send nfts to each other, here's how you can use the indid sdk to make it happen.

Let's start by creating an instance of the core sdk and an instance of the admin sdk, remember that only the admin sdk can deploy smart contract wallets and sponsor user operations.

```ts
import { Client } from "@indid/indid-core-sdk";

const clientUser = await Client.init({
      rpcUrl: rpcUrl,
      apiKey: coreApiKey,
    });
```
  
```ts
import { AdminClient } from "@indid/indid-admin-sdk";

const clientAdmin = await AdminClient.init({
      rpcUrl: rpcUrl,
      apiKey: adminApiKey,
    });
```


now let's deploy a smart contract wallet and connect to it

```ts
const accountAddress = await clientAdmin.createAccount(ownerAddress);
```

the ownerSigner is the signer of the ownerAddress, you can use ethers.js v5 to create a signer, if you are using wagmi-viem in the frontend you can use the package indid/indid-ethers-adapters to create an ethers signer starting from a wagmi-viem wallet client.

```ts
clientUser.connectAccount(
      ownerSigner,
      accountAddress,
    );
```

now you'll have to craft a transaction to send an nft to a friend, once you have crafted the calldata you can use the prepareSendTransactions method to prepare the user operation.

```ts
const builder = await clientUser.prepareSendTransaction([
  {
    to,
    value,
    data: calldata,
  }
])
```

"to" will be the address of the nft contract, "value" will be 0, "calldata" will be the calldata of the transfer method of the nft contract with the encoded friend address and token id.

now you can decide if the user should pay for the user operation with their own funds or if they should get sponsored by the admin, for simplicity let's assume that the user will pay for the user operation with their own funds (ie. a transfer on native funds to the accountAddress is needed).

next you have to sign and send the user operation with the core sdk, you can also wait for the user operation result.

```ts
const builder = await clientUser.signUserOperation(builder)
const response = await clientUser.sendUserOperation(builder)
await clientUser.waitOP(response.userOpHash)
```

the waiting step can be avoided if you are using the webhook service, in this case the indid backend will send a post request to the url associated with the webhook tag specified inside the prepareSendTransactions method. To use the webhook service you have to set the webhook tags inside the indid dashboard.
