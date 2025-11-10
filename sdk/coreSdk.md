# Indid Core SDK

Software development kit that facilitates the interaction with Indid infrastructure.

## init

A method for obtaining an initialized instance of the sdk.
Throws an error if the apiKey is not valid.

```ts
const clientUser = await Client.init(
  config: IClientConfig
);
```

The rpcUrl is required if user operations are needed, if only delegated transactions are needed neither a provider or a chainId are required. If neither a provider or a chainId are provided the sdk will be initialized in read-only mode and the chainId will have to be provided in every delegated transaction function that requires it.
It's possible to pass optional parameters to the init method, such as the entry point, the override bundler rpc url, the override backend url and the log level.
The log level defaults to NONE, which means no logs will be printed.

### Interfaces

```ts
interface IClientConfig {
  apiKey: string;
  rpcUrl?: string;
  chainId?: BigNumberish;
  overrideBundlerRpc?: string;
  overrideBackendUrl?: string;
  overrideEntryPoint?: string;
  logLevel?: LogLevel;
}
```

```ts
enum LogLevel {
  NONE,
  DEBUG,
  INFO,
  WARNING,
  ERROR,
}
```

### Parameters

Takes the following parameters in the config object:

- `apiKey`: The API key for authentication with Indid services
- `rpcUrl` (optional): The RPC URL for connecting to the blockchain. Required if user operations are needed
- `chainId` (optional): The blockchain network identifier
- `overrideBundlerRpc` (optional): Custom URL to override the default bundler RPC
- `overrideBackendUrl` (optional): Custom URL to override the default backend
- `overrideEntryPoint` (optional): Custom address to override the default entry point
- `logLevel` (optional): Controls the verbosity of logs. Defaults to `NONE`

### Returns

Returns an initialized Client instance that can be used to interact with the Indid infrastructure.

### Example Usage

```ts
// Initialize with minimal configuration
const clientUser = await Client.init({
  apiKey: "your-api-key-here",
});

// Initialize with custom RPC
const clientWithCustomRPC = await Client.init({
  apiKey: "your-api-key-here",
  rpcUrl: "https://polygon-rpc.com",
});

// Initialize with debugging enabled
const clientWithLogging = await Client.init({
  apiKey: "your-api-key-here",
  rpcUrl: "https://polygon-rpc.com",
  logLevel: LogLevel.DEBUG,
});
```

## connectAccount

A method for connecting to a smart contract account with the signer of the owner, this is necessary for preparing and signing user operations. The field opts is only needed when the values set at project creation should be overridden or if the provider/chainId was not provided at initialization.

```ts
clientUser.connectAccount(
  signer: IndidSigner,
  accountAddress: string,
  opts?: IConnectAccountOpts
): Promise<IConnectAccountResponse>;
```

### Interfaces

```ts
interface IConnectAccountOpts {
  moduleType: string;
  moduleAddress: string;
  storageType: string;
  factoryAddress: string;
  accountVersion: string;
  moduleVersion: string;
  chainId?: BigNumberish;
}
```

```ts
interface IConnectAccountResponse {
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `signer`: An `IndidSigner` object representing the signer of the account owner
- `accountAddress`: The address of the smart contract wallet to connect to
- `opts` (optional): Configuration options to override default project settings:
  - `moduleType`: The type of module used by the account
  - `moduleAddress`: The address of the module contract
  - `storageType`: The type of storage used by the account
  - `factoryAddress`: The address of the account factory contract
  - `accountVersion`: The version of the account implementation
  - `moduleVersion`: The version of the module implementation
  - `chainId`: The blockchain network identifier (required if not provided during initialization)

### Returns

Returns a promise that resolves to an `IConnectAccountResponse`.

### Example Usage

```ts
// Create a signer using a private key
const privateKey = "0x123...";
const wallet = new ethers.Wallet(privateKey);
const signer = IndidSigner.fromSecp256k1(wallet.privateKey);

// Connect to an existing account with default settings
const response = await clientUser.connectAccount(
  signer,
  "0x456..." // accountAddress
);

// Connect to an account with custom options
const responseWithOpts = await clientUser.connectAccount(
  signer,
  "0x456...", // accountAddress
  {
    moduleType: "enterprise",
    moduleAddress: "0x789...",
    storageType: "shared",
    factoryAddress: "0xabc...",
    accountVersion: "1",
    moduleVersion: "1",
    chainId: 137,
  }
);

if (!response.error) {
  console.log("Successfully connected to account");
} else {
  console.error(`Connection failed: ${response.error}`);
}
```

## getCounterfactualAddress

A method for getting the address of a yet to be deployed smart contract wallet. The salt defaults to 0 and should be changed only if the same owner wants to deploy multiple smart contract wallets. The field opts is only needed when the values set at project creation should be overridden.

Returns the address inside an `IGetCounterfactualAddressResponse`

```ts
const response = await clientUser.getCounterfactualAddress(
    owners: IndidAddress[],
    salt?: string,
    opts?: ICreateAccountOpts
  );
```

### Interfaces

```ts
interface ICreateAccountOpts {
  storageType: "standard" | "shared";
  moduleType: "user" | "enterprise";
  factoryAddress: string;
  moduleAddress: string;
  guardians: IndidAddress[];
  beaconId?: BytesLike;
}
```

```ts
interface IGetCounterfactualAddressResponse {
  accountAddress: string;
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `owners`: An array of `IndidAddress` objects representing the account owners
- `salt` (optional): A unique value to ensure address uniqueness. Defaults to "0"
- `opts` (optional): Configuration options to override default project settings:
  - `storageType`: The type of storage to use for the account
  - `moduleType`: The type of module to use for the account
  - `factoryAddress`: The address of the account factory contract
  - `moduleAddress`: The address of the module contract
  - `guardians`: An array of guardian addresses for the account
  - `beaconId`: Optional beacon ID for upgradeable contracts

### Returns

Returns an object containing:

- `accountAddress`: The counterfactual address of the smart contract wallet
- `error`: Optional error message if the request fails

### Example Usage

```ts
// Prepare the account parameters
const ownerPrivateKey = "0x123...";
const wallet = new ethers.Wallet(ownerPrivateKey);
const ownerAddress = IndidAddress.fromSecp256k1(wallet.address);

// Get counterfactual address with default settings
const response = await clientUser.getCounterfactualAddress([ownerAddress]);

console.log(`Counterfactual address: ${response.accountAddress}`);

// Get another counterfactual address for the same owner
const responseWithSalt = await clientUser.getCounterfactualAddress(
  [ownerAddress],
  "1" // Salt
);
```

## getInitCode

A method for getting the init code for a new smart contract wallet. The field opts is only needed when the values set at project creation should be overridden.

Returns the init code inside an `IInitCodeResponse`

```ts
const response = await clientUser.getInitCode(
    owners: IndidAddress[],
    salt?: string,
    opts?: ICreateAccountOpts
  );
```

### Interfaces

```ts
interface ICreateAccountOpts {
  storageType: "standard" | "shared";
  moduleType: "user" | "enterprise";
  factoryAddress: string;
  moduleAddress: string;
  guardians: IndidAddress[];
  beaconId?: BytesLike;
}
```

```ts
interface IInitCodeResponse {
  initCode: string;
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `owners`: An array of `IndidAddress` objects representing the account owners
- `salt` (optional): A unique value to ensure deployment address uniqueness. Defaults to "0"
- `opts` (optional): Configuration options to override default project settings:
  - `storageType`: The type of storage to use for the account
  - `moduleType`: The type of module to use for the account
  - `factoryAddress`: The address of the account factory contract
  - `moduleAddress`: The address of the module contract
  - `guardians`: An array of guardian addresses for the account
  - `beaconId`: Optional beacon ID for shared storage accounts

### Returns

Returns an object containing:

- `initCode`: The initialization code for the smart contract wallet
- `error`: Optional error message if the request fails

### Example Usage

```ts
// Prepare the account parameters
const ownerPrivateKey = "0x123...";
const wallet = new ethers.Wallet(ownerPrivateKey);
const ownerAddress = IndidAddress.fromSecp256k1(wallet.address);

// Get init code with default settings
const response = await clientUser.getInitCode([ownerAddress]);

console.log(`Init code: ${response.initCode}`);

// Use init code in a user operation
const builder = await clientUser.prepareSendETH(
  "0x789...", // recipient
  ethers.utils.parseEther("0.1"),
  {
    initCode: response.initCode, // This will deploy the wallet as part of the user operation
  }
);

// Get init code with custom options
const responseWithOpts = await clientUser.getInitCode(
  [ownerAddress],
  "1", // Salt
  {
    storageType: "standard",
    moduleType: "user",
    factoryAddress: "0x456...",
    moduleAddress: "0x789...",
    guardians: [],
  }
);
```

## getAccountNonce

A method for getting the deployed smart contract wallet sequential nonce. If a smart contract wallect has been connected the accountAddress field is not needed. Otherwise the returned nonce is the sequential nonce of the specified accountAddress.
This method is useful if the user wants to enforce a specific order of user operations, for example, if the user wants to send a user operation that depends on the result of another user operation. To do so the user can override the nonce inside the prepareSendTransaction method with the nonce returned by this method.

Returns a BigNumber with the account nonce inside an `IGetNonceResponse`.

```ts
const response = await clientUser.getAccountNonce(accountAddress?: string);
```

### Interfaces

```ts
interface IGetNonceResponse {
  nonce: BigNumberish;
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `accountAddress` (optional): The address of the smart contract wallet. If not provided, uses the address of the currently connected account

### Returns

Returns an object containing:

- `nonce`: The sequential nonce value as a BigNumberish
- `error`: Optional error message if the request fails

### Example Usage

```ts
// Get nonce of the connected account
const response = await clientUser.getAccountNonce();
console.log(`Current nonce: ${response.nonce}`);

// Get nonce of a specific account
const specificAccountResponse = await clientUser.getAccountNonce("0x123...");
console.log(`Account nonce: ${specificAccountResponse.nonce}`);

// Use nonce to enforce operation order
const builder = await clientUser.prepareSendETH(
  "0x789...", // recipient
  ethers.utils.parseEther("0.1"),
  {
    nonceOP: response.nonce.add(1), // Use next sequential nonce
  }
);
```

## getNonSequentialAccountNonce

A method for getting a non sequantial nonce of the deployed smart contract wallet. If a smart contract wallect has been connected the accountAddress field is not needed. Otherwise the returned nonce is the nonce of the specified accountAddress. This is the method called internally by the prepareSendTransaction method.

Returns a BigNumber with the account nonce inside an `IGetNonceResponse`.

```ts
const response = await clientUser.getNonSequentialAccountNonce(accountAddress?: string);
```

### Interfaces

```ts
interface IGetNonceResponse {
  nonce: BigNumberish;
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `accountAddress` (optional): The address of the smart contract wallet. If not provided, uses the address of the currently connected account

### Returns

Returns an object containing:

- `nonce`: The non-sequential nonce value as a BigNumberish
- `error`: Optional error message if the request fails

### Example Usage

```ts
// Get non-sequential nonce of the connected account
const response = await clientUser.getNonSequentialAccountNonce();
console.log(`Non-sequential nonce: ${response.nonce}`);

// Get non-sequential nonce of a specific account
const specificAccountResponse = await clientUser.getNonSequentialAccountNonce(
  "0x123..."
);
console.log(`Account non-sequential nonce: ${specificAccountResponse.nonce}`);

// Use in a transaction preparation
const builder = await clientUser.prepareSendETH(
  "0x789...", // recipient
  ethers.utils.parseEther("0.1"),
  {
    nonceOP: response.nonce, // Use the non-sequential nonce
  }
);
```

## connectProvider

Connects to a blockchain provider using the provided RPC URL. Sets up the entryPoint contract and retrieves the `chainId`.

Throws an error if the connection to the provider fails.

```ts
await clientUser.connectProvider(rpcUrl: string);
```

### Example Usage

```ts
await clientUser.connectProvider("https://polygon-rpc.com");
```

## prepareSendTransaction

A method for preparing a partial user operation that executes the specified transactions. It's partial because it still needs to be sponsored (optionally) and signed.
It can be used to send multiple transactions in a single operation, the array positions of the parameters must match.
The nonceOP field is optional and can be used to override the nonce of the smart contract account. The initCode is optional and can be used to deploy a new smart contract wallet. The deadlineSeconds field is optional and can be used to specify the deadline for the operation, if the operation is not included in a block before the deadline the operation will fail. The default is 60 minutes. The doNotRevertOnTxFailure field is optional and can be used to specify if the operation should revert if one of the transactions fails. The default is true.

Internally the method will try to estimate the gas limit of every transaction, if the estimation fails the prepare will fail with an ethers gas estimation error. The gas limit can be overridden by passing the callGasLimit field in the opts parameter, this will also skip the gas estimation.
Note: if the gas estimation fails the transaction will probably fail on chain too. All the other gas related fields are optional and can be used to override the default values.

Returns a builder containing the partial user operation.

```ts
const builder = await clientUser.prepareSendTransaction(
    transactions: ICall[],
    opts?: IUserOperationOptions
  );
```

### Interfaces

```ts
interface ICall {
  to: string;
  value: BigNumberish;
  data: BytesLike;
}
```

```ts
interface IUserOperationOptions {
  initCode?: string;
  nonceOP?: BigNumberish;
  doNotRevertOnTxFailure?: boolean;
  deadlineSeconds?: number;
  callGasLimit?: BigNumberish;
  verificationGasLimit?: BigNumberish;
  preVerificationGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
  maxPriorityFeePerGas?: BigNumberish;
}
```

### Parameters

Takes the following parameters:

- `transactions`: An array of `ICall` objects, each containing:
  - `to`: The recipient address of the transaction
  - `value`: The amount of native currency to send (in wei)
  - `data`: The calldata of the contract call
- `opts` (optional): Configuration options for the user operation:
  - `initCode` (optional): Initialization code for deploying a new wallet
  - `nonceOP` (optional): Custom nonce to override automatic nonce selection
  - `doNotRevertOnTxFailure` (optional): If true, operation continues even if a transaction fails
  - `deadlineSeconds` (optional): Time in seconds after which the operation becomes invalid (defaults to 60 minutes)
  - `callGasLimit` (optional): Gas limit for the execution transaction
  - `verificationGasLimit` (optional): Gas limit for verification
  - `preVerificationGas` (optional): Gas for pre-verification steps
  - `maxFeePerGas` (optional): Maximum total fee per gas unit
  - `maxPriorityFeePerGas` (optional): Maximum priority fee per gas unit

### Returns

Returns an `IUserOperationBuilder` containing the partial user operation that can be further processed (signed, sponsored, etc.).

### Example Usage

```ts
// Define transactions to execute
const transactions = [
  {
    to: "0x123...", // ETH transfer
    value: ethers.utils.parseEther("0.1"),
    data: "0x", // empty calldata for simple transfers
  },
  {
    to: "0x456...", // ERC20 transfer
    value: 0,
    data: "0xa9059cbb000000000000000000000000789...0000000000000000000000000000000000000000000000000de0b6b3a7640000", // transfer(address,uint256)
  },
];

// Prepare transaction with default options
const builder = await clientUser.prepareSendTransaction(transactions);

// Prepare transaction with custom options
const builderWithOpts = await clientUser.prepareSendTransaction(transactions, {
  deadlineSeconds: 3600, // 1 hour
  doNotRevertOnTxFailure: true,
  maxFeePerGas: ethers.utils.parseUnits("50", "gwei"),
});

// Prepare transaction for a new wallet deployment
const initCodeResponse = await clientUser.getInitCode([ownerAddress]);
const deployAndTransferBuilder = await clientUser.prepareSendTransaction(
  transactions,
  {
    initCode: response.initCode, // Will deploy the wallet as part of this operation
  }
);

// After preparation, the builder can be signed and sent
const signedOp = await clientUser.signUserOperation(builder);
const response = await clientUser.sendUserOperation(builder);
```

## prepareSendETH

A method for preparing a partial user operation that sends the desired amount of native currency to the recipient. The nonceOP field is optional and can be used to override the nonce of the smart contract account. The initCode is optional and can be used to deploy a new smart contract wallet. It's partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```ts
const builder = await clientUser.prepareSendETH(
    recipientAddress: string,
    amount: BigNumberish,
    opts?: IUserOperationOptions
  );
```

### Interfaces

```ts
interface IUserOperationOptions {
  initCode?: string;
  nonceOP?: BigNumberish;
  doNotRevertOnTxFailure?: boolean;
  deadlineSeconds?: number;
  callGasLimit?: BigNumberish;
  verificationGasLimit?: BigNumberish;
  preVerificationGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
  maxPriorityFeePerGas?: BigNumberish;
}
```

### Parameters

Takes the following parameters:

- `recipientAddress`: The address that will receive the native currency
- `amount`: The amount of native currency to send (in wei)
- `opts` (optional): Configuration options for the user operation:
  - `initCode` (optional): Initialization code for deploying a new wallet
  - `nonceOP` (optional): Custom nonce to override automatic nonce selection
  - `doNotRevertOnTxFailure` (optional): If true, operation continues even if the transaction fails
  - `deadlineSeconds` (optional): Time in seconds after which the operation becomes invalid (defaults to 60 minutes)
  - `callGasLimit` (optional): Gas limit for the execution transaction
  - `verificationGasLimit` (optional): Gas limit for verification
  - `preVerificationGas` (optional): Gas for pre-verification steps
  - `maxFeePerGas` (optional): Maximum total fee per gas unit
  - `maxPriorityFeePerGas` (optional): Maximum priority fee per gas unit

### Returns

Returns an `IUserOperationBuilder` containing the partial user operation that can be further processed (signed, sponsored, etc.).

### Example Usage

```ts
// Simple ETH transfer
const builder = await clientUser.prepareSendETH(
  "0x123...", // recipient address
  ethers.utils.parseEther("0.1") // 0.1 ETH in wei
);

// ETH transfer with custom options
const builderWithOpts = await clientUser.prepareSendETH(
  "0x123...", // recipient address
  ethers.utils.parseEther("0.1"), // 0.1 ETH in wei
  {
    deadlineSeconds: 1800, // 30 minutes
    maxFeePerGas: ethers.utils.parseUnits("30", "gwei"),
  }
);

// Deploy a new wallet and send ETH in one operation
const initCodeResponse = await clientUser.getInitCode([ownerAddress]);
const deployAndTransferBuilder = await clientUser.prepareSendETH(
  "0x123...", // recipient address
  ethers.utils.parseEther("0.1"), // 0.1 ETH in wei
  {
    initCode: initCodeResponse.initCode, // Will deploy the wallet as part of this operation
  }
);

// After preparation, the builder can be signed and sent
const signedOp = await clientUser.signUserOperation(builder);
const response = await clientUser.sendUserOperation(builder);
```

## prepareSendERC20

A method for preparing a partial user operation that sends the desired amount of the specified ERC20 to the recipient. The nonceOP field is optional and can be used to override the nonce of the smart contract account. The initCode is optional and can be used to deploy a new smart contract wallet. It's partial because it still needs to be sponsored (optionally) and signed.

Returns a builder containing the partial user operation.

```ts
const builder = await clientUser.prepareSendERC20(
    contractAddress: string,
    recipientAddress: string,
    amount: BigNumberish,
    opts?: IUserOperationOptions
  );
```

### Interfaces

```ts
interface IUserOperationOptions {
  initCode?: string;
  nonceOP?: BigNumberish;
  doNotRevertOnTxFailure?: boolean;
  deadlineSeconds?: number;
  callGasLimit?: BigNumberish;
  verificationGasLimit?: BigNumberish;
  preVerificationGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
  maxPriorityFeePerGas?: BigNumberish;
}
```

### Parameters

Takes the following parameters:

- `contractAddress`: The address of the ERC20 token contract
- `recipientAddress`: The address that will receive the tokens
- `amount`: The amount of tokens to send (in the token's smallest unit)
- `opts` (optional): Configuration options for the user operation:
  - `initCode` (optional): Initialization code for deploying a new wallet
  - `nonceOP` (optional): Custom nonce to override automatic nonce selection
  - `doNotRevertOnTxFailure` (optional): If true, operation continues even if the transaction fails
  - `deadlineSeconds` (optional): Time in seconds after which the operation becomes invalid (defaults to 60 minutes)
  - `callGasLimit` (optional): Gas limit for the execution transaction
  - `verificationGasLimit` (optional): Gas limit for verification
  - `preVerificationGas` (optional): Gas for pre-verification steps
  - `maxFeePerGas` (optional): Maximum total fee per gas unit
  - `maxPriorityFeePerGas` (optional): Maximum priority fee per gas unit

### Returns

Returns an `IUserOperationBuilder` containing the partial user operation that can be further processed (signed, sponsored, etc.).

### Example Usage

```ts
// Simple ERC20 token transfer
const builder = await clientUser.prepareSendERC20(
  "0xabc...", // ERC20 token contract address
  "0x123...", // recipient address
  ethers.utils.parseUnits("100", 18) // 100 tokens (assuming 18 decimals)
);

// ERC20 transfer with custom options
const builderWithOpts = await clientUser.prepareSendERC20(
  "0xabc...", // ERC20 token contract address
  "0x123...", // recipient address
  ethers.utils.parseUnits("100", 18), // 100 tokens (assuming 18 decimals)
  {
    deadlineSeconds: 1800, // 30 minutes
    maxFeePerGas: ethers.utils.parseUnits("30", "gwei"),
  }
);

// Deploy a new wallet and send tokens in one operation
const initCodeResponse = await clientUser.getInitCode([ownerAddress]);
const deployAndTransferBuilder = await clientUser.prepareSendERC20(
  "0xabc...", // ERC20 token contract address
  "0x123...", // recipient address
  ethers.utils.parseUnits("100", 18), // 100 tokens (assuming 18 decimals)
  {
    initCode: initCodeResponse.initCode, // Will deploy the wallet as part of this operation
  }
);

// After preparation, the builder can be signed and sent
const signedOp = await clientUser.signUserOperation(builder);
const response = await clientUser.sendUserOperation(builder);
```

## prepareSendModuleOperation

A method for preparing a partial user operation that executes specific wallet functions implemented by the main module. The nonceOP field is optional and can be used to override the nonce of the smart contract account. The initCode is optional and can be used to deploy a new smart contract wallet. It's partial because it still needs to be sponsored (optionally) and signed. The initCode is optional and can be used to deploy a new smart contract wallet.

Returns a builder containing the partial user operation.

```tsx
const builder = await clientUser.prepareSendModuleOperation(
    calldata: string,
    nonce: string,
    deadline: number,
    signatures: string,
    opts?: IUserOperationOptions
  );
```

### Interfaces

```ts
interface IUserOperationOptions {
  initCode?: string;
  nonceOP?: BigNumberish;
  doNotRevertOnTxFailure?: boolean;
  deadlineSeconds?: number;
  callGasLimit?: BigNumberish;
  verificationGasLimit?: BigNumberish;
  preVerificationGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
  maxPriorityFeePerGas?: BigNumberish;
}
```

### Parameters

Takes the following parameters:

- `calldata`: The encoded function call data for the module operation
- `nonce`: The module-specific nonce (different from the account nonce)
- `deadline`: The expiration seconds for the module operation
- `signatures`: The signatures of the wallet owners and/or guardians authenticating the module operation
- `opts` (optional): Configuration options for the user operation:
  - `initCode` (optional): Initialization code for deploying a new wallet
  - `nonceOP` (optional): Custom nonce to override automatic nonce selection
  - `doNotRevertOnTxFailure` (optional): If true, operation continues even if the transaction fails
  - `deadlineSeconds` (optional): Time in seconds after which the operation becomes invalid (defaults to 60 minutes)
  - `callGasLimit` (optional): Gas limit for the execution transaction
  - `verificationGasLimit` (optional): Gas limit for verification
  - `preVerificationGas` (optional): Gas for pre-verification steps
  - `maxFeePerGas` (optional): Maximum total fee per gas unit
  - `maxPriorityFeePerGas` (optional): Maximum priority fee per gas unit

### Returns

Returns an `IUserOperationBuilder` containing the partial user operation that can be further processed (signed, sponsored, etc.).

### Example Usage

```ts
// Encode the module function call (example: adding a new guardian)
const functionSelector = "0xabcdef12"; // Function selector for addGuardian(address)
const encodedAddress = ethers.utils.defaultAbiCoder
  .encode(
    ["address"],
    ["0x123..."] // New guardian address
  )
  .slice(2); // Remove '0x' prefix
const calldata = functionSelector + encodedAddress;

// Module-specific parameters
const moduleNonce = "1"; // Nonce from the module
const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
const message = ethers.utils.solidityKeccak256(
  ["bytes", "uint256", "uint256"],
  [calldata, moduleNonce, deadline]
);
const messageHash = ethers.utils.arrayify(message);

// Sign the module operation
const signature = await signer.signMessage(messageHash);

// Prepare the module operation
const builder = await clientUser.prepareSendModuleOperation(
  calldata,
  moduleNonce,
  deadline,
  signature
);

// Prepare with custom options
const builderWithOpts = await clientUser.prepareSendModuleOperation(
  calldata,
  moduleNonce,
  deadline,
  signature,
  {
    callGasLimit: 500000,
    maxFeePerGas: ethers.utils.parseUnits("30", "gwei"),
  }
);

// After preparation, the builder can be signed and sent
const signedOp = await clientUser.signUserOperation(builder);
const response = await clientUser.sendUserOperation(builder);
```

## prepareEnterpriseRecoveryOperation

A method for preparing a partial user operation that executes a recovery operation. The nonceOP field is optional and can be used to override the nonce of the smart contract account. The initCode is optional and can be used to deploy a new smart contract wallet. It's partial because it still needs to be sponsored (optionally) and signed. The connected smart contract wallet should be owned by the enterprise guardian.

Returns a builder containing the partial user operation.

```ts
const builder = await clientUser.prepareEnterpriseRecoveryOperation(
    accountAddress: string,
    newOwner: string,
    opts?: IUserOperationOptions
  );
```

### Interfaces

```ts
interface IUserOperationOptions {
  initCode?: string;
  nonceOP?: BigNumberish;
  doNotRevertOnTxFailure?: boolean;
  deadlineSeconds?: number;
  callGasLimit?: BigNumberish;
  verificationGasLimit?: BigNumberish;
  preVerificationGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
  maxPriorityFeePerGas?: BigNumberish;
}
```

### Parameters

Takes the following parameters:

- `accountAddress`: The address of the smart contract wallet to recover
- `newOwner`: The address of the new owner for the wallet
- `opts` (optional): Configuration options for the user operation:
  - `initCode` (optional): Initialization code for deploying a new wallet
  - `nonceOP` (optional): Custom nonce to override automatic nonce selection
  - `doNotRevertOnTxFailure` (optional): If true, operation continues even if the transaction fails
  - `deadlineSeconds` (optional): Time in seconds after which the operation becomes invalid (defaults to 60 minutes)
  - `callGasLimit` (optional): Gas limit for the execution transaction
  - `verificationGasLimit` (optional): Gas limit for verification
  - `preVerificationGas` (optional): Gas for pre-verification steps
  - `maxFeePerGas` (optional): Maximum total fee per gas unit
  - `maxPriorityFeePerGas` (optional): Maximum priority fee per gas unit

### Returns

Returns an `IUserOperationBuilder` containing the partial user operation that can be further processed (signed, sponsored, etc.).

### Example Usage

```ts
// The account must be connected using the enterprise guardian's signer
const privateKey = "0x123..."; // Enterprise guardian's private key
const wallet = new ethers.Wallet(privateKey);
const guardianSigner = IndidSigner.fromSecp256k1(
  wallet.privateKey,
  SignerKind.Guardian
);

// Connect to the wallet as the guardian
await clientUser.connectAccount(
  guardianSigner,
  "0x456..." // Account address
);

// Prepare the recovery operation
const builder = await clientUser.prepareEnterpriseRecoveryOperation(
  "0x456...", // Account to recover
  "0x789..." // New owner address
);

// Prepare with custom options
const builderWithOpts = await clientUser.prepareEnterpriseRecoveryOperation(
  "0x456...", // Account to recover
  "0x789...", // New owner address
  {
    callGasLimit: 500000,
    maxFeePerGas: ethers.utils.parseUnits("30", "gwei"),
  }
);

// After preparation, the builder can be signed and sent
const signedOp = await clientUser.signUserOperation(builder);
const response = await clientUser.sendUserOperation(builder);

// Wait for the operation to complete
const receipt = await clientUser.waitOP(response.userOpHash);
console.log(`User Op status: ${receipt.status}`);
```

## fillUserOperation

Fills a user operation with necessary data based on the provided calldata. Sets sender, calldata, gas parameters, and other fields required for a valid operation.

Throws an error if the provider is not connected.

```ts
async fillUserOperation(
  callData: string,
  opts?: IUserOperationOptions
): Promise<IUserOperationBuilder>
```

### Example Usage

```ts
const builder = await clientUser.fillUserOperation(calldata, {
  callGasLimit: 500000,
});
```

## signUserOperation

A method for signing user operations, it applies the signature on the builder object itself.
Return the userOpHash that has been signed, the signature and an optional error string inside an `ISignUserOperationResponse`.

```ts
const response = await clientUser.signUserOperation(
  builder: IUserOperationBuilder
  );
```

### Interfaces

```ts
interface ISignUserOperationResponse {
  userOpHash: string;
  signature: string;
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `builder`: An `IUserOperationBuilder` object containing the user operation to be signed

### Returns

Returns an object containing:

- `userOpHash`: The hash of the user operation that was signed
- `signature`: The signature applied to the user operation
- `error`: Optional error message if the signing fails

### Example Usage

```ts
// First prepare a user operation
const transactions = [
  {
    to: "0x123...",
    value: ethers.utils.parseEther("0.1"),
    data: "0x",
  },
];
const builder = await clientUser.prepareSendTransaction(transactions);

// Sign the user operation
const response = await clientUser.signUserOperation(builder);
console.log(`UserOp hash: ${response.userOpHash}`);
console.log(`Signature: ${response.signature}`);

// The builder now has the signature applied to it
// It can be sent immediately after signing
const sendResponse = await clientUser.sendUserOperation(builder);

// Alternatively, you can get just the userOpHash without signing
const hashResponse = await clientUser.getUserOperationHash(builder);
console.log(`UserOp hash (for external signing): ${hashResponse.userOpHash}`);
```

Note that the signature is automatically applied to the builder object. The signed operation can be sent immediately after signing without any additional steps.

## buildUserOperation

Builds a complete user operation from a builder object. Finalizes all fields and prepares the operation for submission.

```ts
async buildUserOperation(builder: IUserOperationBuilder) {
  return builder.buildOp(await this.entryPoint.getAddress(), this.chainId);
}
```

### Example Usage

```ts
const userOp = await clientUser.buildUserOperation(builder);
```

## sendUserOperation

A method for directing a builder instance to create a User Operation and send it to Indid bundler.
The webhookData is optional and can be used to specify a webhook to be called upon the operation success or failure.
Returns the User Operation Hash and a Task Id inside an `ISendUserOpResponse`.

```ts
const response = await clientUser.sendUserOperation(
  builder: IUserOperationBuilder,
  webhookData?: IWebHookRequest
  );
```

### Interfaces

```ts
interface ISendUserOpResponse {
  userOpHash: string;
  taskId: string;
  error?: string;
}
```

```ts
interface IWebHookRequest {
  tag: string;
  metadata?: Record<string, unknown>;
}
```

### Parameters

Takes the following parameters:

- `builder`: An `IUserOperationBuilder` object containing the user operation to be sent
- `webhookData` (optional): Configuration for webhook notifications about the operation execution:
  - `tag`: Mandatory field that identifies the specific webhook endpoint to call
  - `metadata`: Optional additional data to include in the webhook callback

### Returns

Returns an object containing:

- `userOpHash`: The hash of the user operation that was submitted
- `taskId`: A unique identifier for tracking the operation execution
- `error`: Optional error message if the submission fails

### Example Usage

```ts
// First prepare and sign a user operation
const transactions = [
  {
    to: "0x123...",
    value: ethers.utils.parseEther("0.1"),
    data: "0x",
  },
];
const builder = await clientUser.prepareSendTransaction(transactions);
await clientUser.signUserOperation(builder);

// Send the user operation without webhook
const response = await clientUser.sendUserOperation(builder);
console.log(`UserOp hash: ${response.userOpHash}`);
console.log(`Task ID: ${response.taskId}`);

// Wait for the operation to complete
const receipt = await clientUser.waitOP(response.userOpHash);

// Send with webhook notification
const webhookResponse = await clientUser.sendUserOperation(builder, {
  tag: "transfer-complete",
  metadata: {
    transferId: "123456",
    amount: "0.1",
    currency: "ETH",
  },
});

// When using webhooks, the backend will call your webhook endpoint
// when the operation completes, with the metadata you provided
```

## sendUserOperationBundler

Sends a user operation directly to the bundler and optionally waits for its inclusion. Provides both dry-run capability and actual submission with monitoring.

```ts
async sendUserOperationBundler(
  builder: IUserOperationBuilder,
  timeoutMs: number = 100000,
  waitIntervalMs: number = 5000,
  opts?: ISendUserOperationOpts
)
```

### Example Usage

```ts
const { userOpHash, wait } = await clientUser.sendUserOperationBundler(
  builder,
  120000,
  5000
);
const receipt = await wait();
```

## getUserOperationHash

A method for getting the User Operation Hash from a builder instance. This can be useful for signing the operation in a different environment.

Returns the User Operation Hash inside an `IGetUserOperationHashResponse`, this needs to be arrayfied before being signed.

```ts
const response = await clientUser.getUserOperationHash(builder);
```

### Interfaces

```ts
interface IGetUserOperationHashResponse {
  userOpHash: string;
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `builder`: An `IUserOperationBuilder` object containing the user operation to get the hash for

### Returns

Returns an object containing:

- `userOpHash`: The hash of the user operation
- `error`: Optional error message if the operation fails

### Example Usage

```ts
// First prepare a user operation
const transactions = [
  {
    to: "0x123...",
    value: ethers.utils.parseEther("0.1"),
    data: "0x",
  },
];
const builder = await clientUser.prepareSendTransaction(transactions);

// Get the hash for external signing
const response = await clientUser.getUserOperationHash(builder);
console.log(`UserOp hash: ${response.userOpHash}`);

// Convert to array format for signing in external wallets
const hashForSigning = ethers.utils.arrayify(response.userOpHash);

// Example of external signing (using ethers wallet)
const externalWallet = new ethers.Wallet("0x123..."); // Private key
const signature = await externalWallet.signMessage(hashForSigning);

// You can now use this signature in your application
console.log(`External signature: ${signature}`);
```

## waitOP

A method for waiting an User Operation Hash returned by sendUserOperation, returns the receipt inside an `IUserOperationReceiptResponse` upon success.

```ts
const response = await clientUser.waitOP(
  userOpHash: string,
  timeoutMs?: number);
```

### Interfaces

```ts
interface IUserOperationReceiptResponse {
  receipt: IUserOperationReceipt;
  error?: string;
}
```

```ts
interface IUserOperationReceipt {
  blockHash: string;
  logsBloom: string;
  contractAddress: string;
  transactionIndex: number;
  transactionHash: string;
  gasUsed: BigNumberish;
  blockNumber: BigNumberish;
  cumulativeGasUsed: BigNumberish;
  from: string;
  blockTimestamp: string;
  to: string;
  logs: [{}];
  status: number;
  error?: string;
}
```

### Parameters

Takes the following parameters:

- `userOpHash`: The hash of the user operation to wait for
- `timeoutMs` (optional): Maximum time to wait in milliseconds before returning a timeout error

### Returns

Returns an object containing:

- `receipt`: An object with details about the executed user operation, including:
  - `blockHash`: The hash of the block in which the operation was included
  - `logsBloom`: Bloom filter for the logs
  - `contractAddress`: The address of the contract that executed the operation
  - `transactionIndex`: The index of the transaction in the block
  - `transactionHash`: The hash of the transaction
  - `gasUsed`: The amount of gas used by the transaction
  - `blockNumber`: The number of the block that includes the transaction
  - `cumulativeGasUsed`: The total gas used in the block up to and including this transaction
  - `from`: The sender address
  - `blockTimestamp`: The timestamp of the block
  - `to`: The recipient address
  - `logs`: Array of log objects emitted during the transaction
  - `status`: Status code (1 for success, 0 for failure)
  - `error`: Optional error message if the transaction failed
- `error`: Optional error message if the waiting operation fails

### Example Usage

```ts
// First send a user operation
const transactions = [
  {
    to: "0x123...",
    value: ethers.utils.parseEther("0.1"),
    data: "0x",
  },
];
const builder = await clientUser.prepareSendTransaction(transactions);
await clientUser.signUserOperation(builder);
const sendResponse = await clientUser.sendUserOperation(builder);

// Wait for the operation to complete with a 2-minute timeout
const response = await clientUser.waitOP(
  sendResponse.userOpHash,
  120000 // 2 minutes
);

// Check if the operation was successful
if (response.receipt.status === 1) {
  console.log("Transaction successful!");
  console.log(`Block number: ${response.receipt.blockNumber}`);
  console.log(`Transaction hash: ${response.receipt.transactionHash}`);
  console.log(`Gas used: ${response.receipt.gasUsed}`);
} else {
  console.error(
    `Transaction failed: ${response.receipt.error || "Unknown error"}`
  );
}

// You can also inspect logs emitted during the transaction
const logs = response.receipt.logs;
for (const log of logs) {
  console.log(`Log from address: ${log.address}`);
  console.log(`Data: ${log.data}`);
}
```

## waitTask

A method for waiting a backend task ID returned by some sdk functions. sendUserOperation, returns the task outcome inside an `IWaitTaskResponse` and an optional reason with information about the task outcome.

```ts
const response = await clientUser.waitTask(
  taskId: string,
  timeoutMs?: number
);
```

### Interfaces

```ts
interface IWaitTaskResponse {
  operationStatus: TaskUserOperationStatus;
  receipt?: JSON;
  reason?: string;
}
```

```ts
enum TaskUserOperationStatus {
  NOT_FOUND = "NOT_FOUND",
  PENDING = "PENDING",
  EXECUTED = "EXECUTED",
  REVERTED = "REVERTED",
  UNHANDLED = "UNHANDLED",
  FAILED = "FAILED",
  TIMEOUT = "TIMEOUT",
}
```

### Parameters

Takes the following parameters:

- `taskId`: The ID of the task to wait for
- `timeoutMs` (optional): Maximum time to wait in milliseconds before returning a timeout error

### Returns

Returns an object containing:

- `operationStatus`: The status of the task, which can be one of:
  - `NOT_FOUND`: The task was not found
  - `PENDING`: The task is still in progress
  - `EXECUTED`: The task completed successfully
  - `REVERTED`: The task was reverted before execution
  - `UNHANDLED`: The task encountered an unhandled error
  - `FAILED`: The task failed to execute
  - `TIMEOUT`: The task timed out while waiting
- `receipt`: An optional JSON object containing the transaction receipt if available
- `reason`: An optional string providing more information about the task outcome

### Example Usage

```ts
// First send a user operation or other operation that returns a task ID
const transactions = [
  {
    to: "0x123...",
    value: ethers.utils.parseEther("0.1"),
    data: "0x",
  },
];
const builder = await clientUser.prepareSendTransaction(transactions);
await clientUser.signUserOperation(builder);
const sendResponse = await clientUser.sendUserOperation(builder);

// Wait for the task to complete with a 2-minute timeout
const response = await clientUser.waitTask(
  sendResponse.taskId,
  120000 // 2 minutes
);

// Check the status of the task
switch (response.operationStatus) {
  case TaskUserOperationStatus.EXECUTED:
    console.log("Task completed successfully!");
    console.log("Receipt:", response.receipt);
    break;
  case TaskUserOperationStatus.REVERTED:
    console.error("Task reverted:", response.reason);
    break;
  case TaskUserOperationStatus.FAILED:
    console.error("Task failed:", response.reason);
    break;
  case TaskUserOperationStatus.TIMEOUT:
    console.error("Task timed out - check status later");
    break;
  default:
    console.log(`Task status: ${response.operationStatus}`);
    if (response.reason) {
      console.log(`Additional info: ${response.reason}`);
    }
}
```

## verifyWebhookSignature

A static method for verifying the signature of a webhook callback, it takes an IWebHookSignatureRequest and an optional verifyingKey. If the verifyingKey is not provided the default key is used.
Returns a `boolean`, true if the signature is valid, false otherwise.

```ts
const response = Client.verifyWebhookSignature(
  req: IWebHookSignatureRequest,
  verifyingKey?: string
  );
```

### Interfaces

```ts
interface IWebHookSignatureRequest {
  headers: {
    signature: string;
    encodedMessage: string;
  };
  body: Record<string, unknown>;
}
```

### Parameters

Takes the following parameters:

- `req`: An object containing the webhook request data:
  - `headers`: Contains the signature headers:
    - `signature`: The digital signature to verify
    - `encodedMessage`: The encoded message that was signed
  - `body`: The body of the webhook request as an object
- `verifyingKey` (optional): The public key to use for verification. If not provided, the default key is used

### Returns

Returns a boolean value:

- `true`: If the signature is valid
- `false`: If the signature is invalid

### Example Usage

//TODO: fix this example with correct code

```ts
// Example webhook handler in an Express.js server
app.post("/webhook", (req, res) => {
  // Extract the necessary headers
  const webhookRequest = {
    headers: {
      signature: req.headers["x-indid-signature"],
      encodedMessage: req.headers["x-indid-encoded-message"],
    },
    body: req.body,
  };

  // Verify the signature
  const isValid = Client.verifyWebhookSignature(webhookRequest);

  if (isValid) {
    // Signature is valid, process the webhook
    console.log("Webhook signature verified!");

    // Extract information from the webhook
    const { userOpHash, status, metadata } = req.body;

    if (status === "executed") {
      console.log(`Operation ${userOpHash} executed successfully`);
      // Handle successful operation
    } else if (status === "reverted") {
      console.log(`Operation ${userOpHash} reverted`);
      // Handle reverted operation
    }

    // Return success response
    res.status(200).json({ success: true });
  } else {
    // Invalid signature, reject the webhook
    console.error("Invalid webhook signature");
    res.status(401).json({ error: "Invalid signature" });
  }
});

// Using a custom verification key
const customKey = "0x123..."; // Your custom verification key
const isValidCustom = Client.verifyWebhookSignature(webhookRequest, customKey);
```

## prepareDelegatedTransactions

A method for preparing a delegated transaction without sending it. This function creates the necessary data for a delegated transaction that can be sent later with an admin sdk. The account signer is used to sign the transaction data using EIP-712.

If chainId wasn't provided during initialization, it must be provided in the options. The deadlineSeconds field is optional and can be used to specify the expiration time for the operation (defaults to 60 minutes). The doNotRevertOnTxFailure flag can be used to specify if the operation should continue even if one of the transactions fails.

Returns an object implementing ISendDelegatedTransactionsRequest to be sent with sendDelegatedTransactions function of admin sdk.

```ts
const response = await clientUser.prepareDelegatedTransactions(
  transactions: ICall[],
  opts?: IDelegatedTransactionOptions
): Promise<ISendDelegatedTransactionsRequest>;
```

### Interfaces

```ts
interface ICall {
  to: string;
  value: BigNumberish;
  data: BytesLike;
}
```

```ts
interface IDelegatedTransactionOptions {
  chainId?: BigNumberish;
  doNotRevertOnTxFailure?: boolean;
  deadlineSeconds?: number;
  webhookData?: IWebHookRequest;
}
```

```ts
interface ISendDelegatedTransactionsRequest {
  accountAddress: string;
  chainId: BigNumberish;
  moduleAddress: string;
  data: BytesLike;
  nonce: BigNumberish;
  deadline: number;
  sigs: BytesLike;
  webhookData?: IWebHookRequest;
}
```

### Parameters

Takes the following parameters:

- `transactions`: An array of `ICall` objects, each containing:
  - `to`: The recipient address of the transaction
  - `value`: The amount of native currency to send (in wei)
  - `data`: The calldata to include in the transaction
- `opts` (optional): Configuration options for the delegated transaction:
  - `chainId` (optional): The blockchain network identifier (required if not provided during initialization)
  - `doNotRevertOnTxFailure` (optional): If true, operation continues even if a transaction fails
  - `deadlineSeconds` (optional): Time in seconds after which the operation becomes invalid (defaults to 60 minutes)
  - `webhookData` (optional): Configuration for webhook notifications

### Returns

Returns a promise that resolves to an `ISendDelegatedTransactionsRequest` object containing all the necessary data for submitting the delegated transaction through an admin SDK, including:

- `accountAddress`: The address of the smart contract wallet
- `chainId`: The blockchain network identifier
- `moduleAddress`: The address of the module handling the transaction
- `data`: The encoded transaction data
- `nonce`: The transaction nonce
- `deadline`: The expiration timestamp
- `sigs`: The signatures authorizing the transaction
- `webhookData` (optional): Webhook configuration

### Example Usage

```ts
// Define transactions to execute
const transactions = [
  {
    to: "0x123...", // ETH transfer
    value: ethers.utils.parseEther("0.1"),
    data: "0x", // empty calldata for simple transfers
  },
  {
    to: "0x456...", // ERC20 transfer
    value: 0,
    data: "0xa9059cbb000000000000000000000000789...0000000000000000000000000000000000000000000000000de0b6b3a7640000", // transfer(address,uint256)
  },
];

// Prepare the delegated transaction
const preparedTx = await clientUser.prepareDelegatedTransactions(transactions, {
  chainId: 137, // Polygon network
  deadlineSeconds: 3600, // 1 hour
  webhookData: {
    tag: "delegated-transfer",
    metadata: {
      purpose: "example-transaction",
    },
  },
});

// The prepared transaction can now be sent using an admin SDK
console.log("Prepared transaction data:");
console.log(`Account: ${preparedTx.accountAddress}`);
console.log(`Chain ID: ${preparedTx.chainId}`);
console.log(`Module: ${preparedTx.moduleAddress}`);
console.log(`Deadline: ${new Date(preparedTx.deadline * 1000).toISOString()}`);

// Send the prepared transaction using an admin SDK (on the server side)
// const response = await adminClient.sendPreparedDelegatedTransactions(preparedTx);
```

## prepareContractDeploymentTransactions

A method for preparing deterministic contract deployment transactions and calculating their expected on-chain addresses.

```ts
const result = await clientUser.prepareContractDeploymentTransactions(
  params: Array<{
    bytecode: string;
    salt?: string;
  }>
);
```

### Interfaces

```ts
interface IContractDeploymentParams {
  bytecode: string;
  salt?: string;
}
```

```ts
interface IContractDeploymentResult {
  expectedAddresses: string[];
  deployTxs: ICall[];
}
```

```ts
interface ICall {
  to: string;
  value: BigNumberish;
  data: BytesLike;
}
```

### Parameters

Takes the following parameters:

- `params`: An array of deployment parameters, where each item contains:
  - `bytecode`: The compiled contract bytecode to deploy
  - `salt` (optional): A unique value to ensure deployment address uniqueness. Defaults to "0" if not provided

### Returns

Returns an object containing:

- `expectedAddresses`: Array of calculated contract addresses that will result from the deployments
- `deployTxs`: Array of transaction objects (`ICall`) ready to be used with either `prepareSendTransaction` or `prepareDelegatedTransactions`

### Example Usage

```ts
// Prepare contract deployment transactions
const deploymentResult = await clientUser.prepareContractDeploymentTransactions(
  [
    {
      bytecode: "0x608060405234801561001057600080fd5b50...",
      salt: "0x123",
    },
    {
      bytecode: "0x608060405234801561001057600080fd5b50...",
      // uses default salt
    },
  ]
);

// Get the calculated addresses for reference
const { expectedAddresses, deployTxs } = deploymentResult;

console.log("Expected contract addresses:");
for (let i = 0; i < expectedAddresses.length; i++) {
  console.log(`Contract ${i + 1}: ${expectedAddresses[i]}`);
}

// Deploy the contracts using user operations
const builder = await clientUser.prepareSendTransaction(deployTxs);
await clientUser.signUserOperation(builder);
const response = await clientUser.sendUserOperation(builder);

// Wait for the operation to complete
const receipt = await clientUser.waitOP(response.userOpHash);
console.log(`Deployment transaction status: ${receipt.receipt.status}`);

// Or deploy using delegated transactions
const preparedTx = await clientUser.prepareDelegatedTransactions(deployTxs);
// Then send with admin SDK
// const response = await adminClient.sendPreparedDelegatedTransactions(preparedTx);
```

Note: If the provider has not been connected, this method will throw an error.
