# Web3Auth

If you want to use Web3Auth with INDID you can use the following code snippets to bootstrap the social login and signer.

## Imports

```tsx
import { Client } from "@indid/indid-core-sdk";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
```
## Initializing Web3Auth

You will have to get the client ID from the Web3Auth dashboard. You can use the following code snippet to initialize the Web3Auth.

Initialize the social login SDK
```ts
const chainConfig = {
  chainId: "0x13882", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc-amoy.polygon.technology/",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  displayName: "Polygon Amoy",
  blockExplorerUrl: "https://www.oklink.com/amoy/",
  ticker: "MATIC",
  tickerName: "Polygon Matic",
  logo: "https://images.toruswallet.io/eth.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig }
});

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; 
// get from https://dashboard.web3auth.io

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
});

```

## Creating Web3Auth Signer

```ts
await web3auth.initModal();
const web3authProvider = await web3auth.connect();
const ethersProvider = new ethers.providers.Web3Provider(
  web3authProvider as any
);
const web3AuthSigner = ethersProvider.getSigner();
```

## Using the signer with INDID SDK

You can now use the signer as the usual ethers signer.

For example with the Admin SDK you can do the following:

```ts
const response = await clientAdmin.createAndConnectAccount(
  web3AuthSigner
);
```

Or with the Core SDK you could connect to an existing account like this:

```ts
const response = await clientCore.connectAccount(
  web3AuthSigner,
  existingAccountAddress
);
```
