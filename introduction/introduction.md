# Introduction

## Overview

### What is INDID?

INDID is a Smart Wallet infrastructure that simplifies how developers and users interact with the blockchain. We leverage Account Abstraction (ERC‑4337) to offer a frictionless UX: you build with simple APIs/SDKs while we handle sponsorship, relaying, and wallet operations behind the scenes.

### Why INDID?

- Complex UX with EOAs and raw transactions
- Gas management and sponsorship add significant overhead
- High technical barriers (key management, bundlers, relayers)

INDID provides managed Bundlers and Paymasters, production APIs, and SDKs so you can ship gasless, secure, and user‑friendly web3 apps faster.

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

### High‑level architecture

At a glance: Client App → INDID API → (Worker) → Bundler/Paymaster → EntryPoint → Smart Wallet. Optionally, webhooks can notify your backend about state changes.

## Supported Networks

- Polygon (currently supported)

## Quickstart Guide (≈5 minutes)

1. Create your account and first project in the Dashboard.
2. Get your API Key.
3. Configure your environment (use our SDK or call the REST APIs directly).
4. Send your first User Operation: submit a sponsored (gasless) operation via INDID.
