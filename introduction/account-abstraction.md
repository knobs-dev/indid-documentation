# Account Abstraction (ERC‑4337)

## The EOA problem
Externally Owned Accounts are single‑key wallets that force users to manage keys, understand gas, and sign every transaction, causing friction and poor UX.

## The solution: Smart Wallet
Smart contract wallets enable policies and programmability:
- Gasless transactions (sponsored)
- Multi‑signature/guardians and social recovery
- Batched actions and flexible permissions

## Indid architecture in brief
Indid handles UserOperations for you:
- Your app creates a userOperation
- Indid Paymaster sponsors it when authorized
- Indid Bundler forwards it to the network’s EntryPoint
- The EntryPoint executes against the user’s Smart Wallet

## Use cases
- Gasless application flows (onboarding and core actions without showing gas)
- Notarization and on‑chain proofs
- Social recovery wallets with guardians

## High‑level architecture
Client App → Indid API → (Worker) → Bundler/Paymaster → EntryPoint → Smart Wallet.
Optionally, webhooks can notify your backend about state changes.

