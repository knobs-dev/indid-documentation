# Pricing

INDID uses a credit-based pricing model that abstracts computational costs across on-chain and off-chain operations. All plans include monthly credit allowances that can be used for 12 months from purchase. All prices include VAT.

## Subscription Plans

| Plan           | Description                                        | Monthly Price | Credits per Month | Network Access | Support Level      |
| -------------- | -------------------------------------------------- | ------------- | ----------------- | -------------- | ------------------ |
| **FREE**       | Test and explore INDID on testnet                  | €0            | 1 Million         | Testnet only   | Community support  |
| **STARTER**    | Ideal for pilots and proof-of-concepts             | €5            | 5 Million         | Mainnet        | Community support  |
| **PRO**        | For growing projects and developer teams           | €20           | 20 Million        | Mainnet        | Priority support   |
| **SCALE**      | Best for production-ready Web3 applications        | €50           | 50 Million        | Mainnet        | Priority support   |
| **ENTERPRISE** | Enterprise-grade support, SLA, and dedicated setup | Custom        | Flexible          | Mainnet        | SLA & dedicated AM |

### Plan Specifications

**FREE Plan Limitations:**

- All operations are executed exclusively on testnet environments
- No mainnet access or production deployments
- Suitable for development, testing, and evaluation purposes

**Credit Validity:**

- Credits are valid for 12 months from the date of purchase
- Unused credits from previous billing cycles remain available until expiration
- Credits are consumed on a first-in-first-out (FIFO) basis

**Plan Management:**

- Plans can be upgraded or downgraded at any time
- Changes take effect at the start of the next billing cycle
- Overage billing is available for all plans (pay-as-you-go beyond included credits)

## Credit Consumption Model

Credits represent a unified metric for computational resource consumption across INDID's infrastructure stack. They abstract the cost of:

### On-Chain Operations

- **UserOperation Processing**: Validation, signature verification, nonce management
- **Paymaster Sponsorship**: Gas fee coverage, signature generation, authorization checks
- **Bundler Relay**: Transaction bundling, EntryPoint interaction, on-chain execution
- **Smart Contract Execution**: Gas profile, calldata size, storage operations

### Off-Chain Operations

- **API Request Processing**: Endpoint validation, rate limiting, authentication
- **Webhook Delivery**: Event processing, HTTP delivery, retry logic
- **Worker Tasks**: Background job processing, task orchestration
- **Notarization Processing**: Hash computation, verification steps, data indexing

### Credit Consumption by Operation Type

**Read-Only Endpoints** (minimal to zero credits):

- `GET /account-info`
- `GET /task-status`
- `GET /op-status`
- `GET /sdk-defaults`
- Metadata and status queries

**Sponsored UserOperations** (variable credits based on complexity):

```
Credits = Base Validation Cost + Paymaster Sponsorship Cost + Bundler Relay Cost
```

- Simple transfers consume credits based on validation, sponsorship, and relay costs
- Contract interactions consume credits proportional to operation complexity
- Batched operations: Aggregated cost of all operations in batch

**Notarization Operations** (proportional to data size):

```
Credits = Base Notarization Cost + (Data Size Factor × Verification Steps)
```

- Hash anchoring: Credits proportional to data size and verification steps
- Document notarization: Credits depend on document size and verification complexity
- Proof of inclusion: Credits based on verification steps required

**Account Management**:

- Account creation: Credits for account deployment and initialization
- Recovery operations: Credits for guardian verification and account recovery
- Guardian management: Credits per operation based on verification requirements

### Credit Calculation Factors

The exact credit consumption depends on:

1. **Operation Complexity**: Number of contract calls, calldata size, storage operations
2. **Network Conditions**: Current gas prices, network congestion, Layer 2 fees
3. **Data Volume**: Payload size for notarizations, batch operation count
4. **Verification Steps**: Multi-signature requirements, guardian confirmations

### Monitoring and Analytics

Access detailed credit consumption metrics via the Dashboard:

- Real-time credit balance and consumption rate
- Breakdown by operation type (UserOperations, notarizations, account management)
- Project-level and API endpoint-level analytics
- Daily/weekly/monthly trends and forecasting
- Overage alerts and usage notifications
- Export capabilities (CSV/JSON) for billing reconciliation

### Overage Billing

When monthly credit allowance is exceeded:

- Additional credits are billed on a pay-as-you-go basis
- Overage rates are displayed in the Dashboard
- Billing occurs at the end of each billing cycle
- No service interruption; operations continue seamlessly

For exact overage rates and enterprise pricing, [contact us](https://indid.io/contact-us/) or check your Dashboard.
