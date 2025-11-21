# Supported Networks

INDID provides full Account Abstraction infrastructure (Bundler and Paymaster) on the networks listed below. All networks support gasless transactions, smart wallet operations, and notarization features.

## Network Infrastructure

INDID's infrastructure stack includes:

- **Bundler**: ERC-4337 compliant bundler for UserOperation relay and execution
- **Paymaster**: Gas sponsorship service for seamless gasless transactions
- **EntryPoint**: Standard ERC-4337 EntryPoint contract deployment
- **Smart Wallet Factory**: Account creation and deployment infrastructure

## Supported Networks

| Chain   | Mainnet                  | Testnet                 | Bundler | Paymaster | Gas Sponsorship |
| ------- | ------------------------ | ----------------------- | ------- | --------- | --------------- |
| Polygon | ✅ 137 (polygon-mainnet) | ✅ 80002 (polygon-amoy) | ✅      | ✅        | ✅              |
| Base    | ✅ 8453 (base-mainnet)   | ✅ 84532 (base-sepolia) | ✅      | ✅        | ✅              |

### Network Details

**Polygon**

- Mainnet Chain ID: `137`
- Testnet Chain ID: `80002` (Amoy)
- Native Token: MATIC
- Block Explorer: [Polygonscan](https://polygonscan.com) (Mainnet) / [PolygonScan Amoy](https://amoy.polygonscan.com) (Testnet)

**Base**

- Mainnet Chain ID: `8453`
- Testnet Chain ID: `84532` (Sepolia)
- Native Token: ETH
- Block Explorer: [BaseScan](https://basescan.org) (Mainnet) / [BaseScan Sepolia](https://sepolia.basescan.org) (Testnet)

## Requesting Additional Networks

INDID is continuously expanding network support. If you need a chain that's not currently supported, we can quickly provision infrastructure for new networks.

**To request network support:**

- Contact support: Use the [contact form](https://indid.io/contact-us/) and select "Technical support" as the topic
- Provide details: Chain name, mainnet/testnet chain IDs, and use case requirements

**Requirements for new network support:**

- EVM-compatible blockchain
- Active network with stable RPC endpoints
- ERC-4337 EntryPoint contract deployment (or we can deploy)

## Configuration

### Chain ID Usage

Chain IDs are required when:

- Initializing the SDK with network-specific configuration
- Making API calls that specify a target network
- Configuring projects in the Dashboard
- Setting up RPC providers for blockchain interaction

### Example: SDK Initialization

```typescript
import { Client } from "@indid/indid-core-sdk";

// Polygon Mainnet
const clientPolygon = await Client.init({
  apiKey: "your-api-key",
  rpcUrl: "https://polygon-rpc.com",
  chainId: 137, // Polygon Mainnet
});

// Base Mainnet
const clientBase = await Client.init({
  apiKey: "your-api-key",
  rpcUrl: "https://mainnet.base.org",
  chainId: 8453, // Base Mainnet
});
```

### Example: API Request with Chain ID

```typescript
// GET /get-sdk-defaults?chainId=137
const response = await fetch(
  `https://api.indid.io/get-sdk-defaults?chainId=137`,
  {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }
);
```

## Multi-Chain Support

INDID supports using multiple chains within the same application. Each project can be configured with multiple chain IDs in the Dashboard, allowing you to:

- Deploy smart wallets on different networks
- Switch between networks dynamically

To enable multiple chains:

1. Navigate to your project in the Dashboard
2. Configure additional chain IDs in the project settings
3. Ensure your API key has access to the configured chains
4. Specify the `chainId` parameter in API calls or SDK initialization

## Network-Specific Considerations

### Testnet vs Mainnet

- **Testnet**: Use for development, testing, and evaluation
- **Mainnet**: Required for production deployments
- FREE plan users are limited to testnet environments only
- Paid plans (STARTER, PRO, SCALE, ENTERPRISE) have full mainnet access

### RPC Endpoints

INDID requires reliable RPC endpoints for blockchain interaction. You can:

- Use public RPC endpoints (Alchemy, Infura, QuickNode, etc.)
- Configure custom RPC endpoints in the SDK
- Use INDID's recommended RPC providers ([contact support](https://indid.io/contact-us/) for details)

### Gas Optimization

Different networks have varying gas characteristics:

- **Polygon**: Lower gas costs, faster block times
- **Base**: Optimized Layer 2 with Ethereum security guarantees

Credit consumption may vary slightly between networks based on gas prices and network conditions. Monitor usage in the Dashboard for network-specific analytics.

## Troubleshooting

**Chain ID not recognized:**

- Verify the chain ID is enabled for your project in the Dashboard
- Ensure your API key has access to the specified network
- Check that the Account Abstraction module is enabled

**Network connection issues:**

- Verify RPC endpoint is accessible and responding
- Check network status and any ongoing maintenance
- Ensure chain ID matches the RPC provider's network

For additional support, see the [Troubleshooting Guide](../support/troubleshooting.md) or [contact us](https://indid.io/contact-us/).
