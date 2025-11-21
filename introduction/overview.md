# Overview

## What is INDID?

INDID is a modular infrastructure for Web3 applications, designed to simplify the integration of blockchain functionalities such as account abstraction, notarization, and meta-transactions.
Built on the ERC-4337 standard, INDID enables developers to interact with the blockchain through a scalable, credit-based model, removing the need to manage private keys, gas fees, or complex smart contract deployments.
By combining SDKs, APIs, and a developer dashboard, INDID provides an end-to-end environment to build, test, and operate decentralized applications—without compromising on security, flexibility, or compliance.

## Why INDID?

Current blockchain infrastructures often present steep barriers to adoption: complex setups, network-specific dependencies, fragmented tools, and unpredictable costs. INDID was created to overcome these limitations.

With INDID, developers gain access to:

Abstraction – Unified tools for blockchain interaction, compatible with multiple EVM networks and future Layer 2 integrations.
Automation – Smart execution of transactions through a meta-transaction layer that eliminates manual gas handling.
Scalability – A credit-based usage system that ensures predictable costs and efficient resource allocation.
Interoperability – SDKs designed to integrate seamlessly into existing backend and frontend architectures.
Reliability – Enterprise-grade infrastructure, continuously monitored and optimized for performance and uptime.
In essence, INDID makes blockchain accessible, modular, and production-ready — allowing developers to focus on building value, not infrastructure.

## Account Abstraction (ERC‑4337)

### The EOA problem

Externally Owned Accounts are single‑key wallets that force users to manage keys, understand gas, and sign every transaction, causing friction and poor UX.

### The solution: Smart Wallet

Smart contract wallets enable policies and programmability:

- Gasless transactions (sponsored)
- Multi‑signature/guardians and social recovery
- Batched actions and flexible permissions

### INDID architecture in brief

INDID handles UserOperations for you:

- Your app creates a userOperation
- INDID Paymaster sponsors it when authorized
- INDID Bundler forwards it to the network’s EntryPoint
- The EntryPoint executes against the user’s Smart Wallet

### Use cases

- Gasless application flows (onboarding and core actions without showing gas)
- Notarization and on‑chain proofs
- Social recovery wallets with guardians
