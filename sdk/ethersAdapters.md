# INDID Ethers Adapters

If you want to interact with the INDID Admin SDK or INDID Core SDK but you are using wagmi-viem you need to migrate the "Wallet Client" of wagmi-viem into the "Signer" of ethers.js.
You can do this automatically via indid-ethers-adapters.

## How does it work?

A “Wallet Client” is an interface used by wagmi-viem that is used to interact with Ethereum Accounts and allows you to perform all wallet actions that require a signature

The “Wallet Client” is not present in ethers.js but there is the “Signer”, which is also an abstraction of an Ethereum account and can be used to perform all those methods where signing a message is required.

Both support signing via :

- Local account : a class that knows its private key and can perform any operation with it.
  - in ethers.js you can create the wallet instance from a private key or mnemonic phrase
  - in wagmi-viem instead you can use the method `privateKeyToAccount()`
- JSONRpcAccount : connected to a JsonRpcProvider
  - e.g. Browser Extension Wallet, WalletConnect ecc.

More information in the documentations of [ethers.js](https://docs.ethers.org/v5/), [wagmi](https://wagmi.sh/react/getting-started) and [viem](https://viem.sh/docs/getting-started.html).

To interact with the INDID Admin SDK or INDID Core SDK you need to use ethers.js, so if you are developing using wagmi-viem you need a way to be able to adapt/migrate the “Wallet Client” of wagmi-viem to the “Signer” of ethers.js.
indid-ethers-adapters, via the useEthersSigner method, does just that.

## UseEthersSigner()

```tsx
export function useEthersSigner({
  chainId,
}: { chainId?: number } = {}): UseEthersSigner {
  const { data: walletClient, ...rest } = useWalletClient({ chainId });
  const signer: providers.JsonRpcSigner | undefined = React.useMemo<any>(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );

  return { data: signer, ...rest };
}
```

UseEthersSigner() is responsible for returns an object of type `UseEthersSigner` that contains data representing the signer and other properties.

The signer object can be of type `providers.JsonRpcSigner` (type of signer in ethers.js) or `undefined`; if walletClient exists, the walletClientToSigner() function is called by passing walletClient as a parameter, otherwise it returns `undefined`.

## walletClientToSigner()

```tsx
export function walletClientToSigner(
  walletClient: WalletClient
): providers.JsonRpcSigner {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(
    transport as providers.Web3Provider["provider"],
    network
  );
  const signer = provider.getSigner(account.address);
  return signer;
}
```

The goal of walletClientToSigner() is to convert the walletClient to an object of type `providers.JsonRpcSigner` (type of signer in ethers.js)

## Importing

The first step is to import the useEthersSigner from indid-ethers-adapters

```tsx
import { useEthersSigner } from "@indid/indid-ethers-adapters";
```

## Usage

Once imported, you need to create the signer

```tsx
const { data: signer } = useEthersSigner();
//or
const signer = useEthersSigner().data;
```

now you will be able to use the ethers.js signer (with all its methods, e.g. sendTransaction(), signMessage() etc.) instead of the wagmi walletClient.

```tsx
if(signer){
  const tx = await signer.sendTransaction({
     to: toAddress,
     value: amountInWei,
  });
```
