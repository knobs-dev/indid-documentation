# Getting started

## Introduction to Indid API

This documentation is useful to better understand and to be familiar with Indid API. Indid is a Web3 service developed by KNOBS that implements Account Abstraction and is compliant with ERC-4337 standard.

## What is Account Abstraction?

Account abstraction is a technology that provides for the use of smart contracts as real accounts. This allows for the realization of a frictionless system even for users completely unrelated to Web 3, since all the operations that the user would normally have to perform through an EOA, ( knowing how to create a wallet and how a wallet works, sign transactions, etc... ) take place behind the scenes without him even noticing.

The proposal of this standard is particular because it does not require changes to the consensus protocol, in fact it provides for the implementation of a higher level infrastructure through a new type of nodes, the bundlers, and a set of smart contracts; the bundler is the main component of this infrastructure and allows its implementation on any EVM network. In fact it is in charge of collecting in a dedicated mempool the UserOperations (objects that represent the pseudo-transactions ) that it will then use to perform real transactions through the smart contracts account.

## Actors

In addition to bundlers, the other main players in the infrastructure are the following smart contracts:

Entry point: it is the smart contract that is responsible for verifying and executing transaction logic as well as deploying the smart contracts accounts.
Smart contract accounts: they are the smart contracts that represent user accounts.
Paymasters: optional smart contracts that allow third parties to sponsor transactions related to the smart contracts accounts.
Aggregators: optional smart contracts that are used to approve an aggregate signature ( a single signature that approves multiple transactions ). This mechanism increases the efficiency and scalability of the system by allowing multiple UserOperations to be merged into a single transaction and validating signatures in one go instead of validating them one by one separately.

## More about Account Abstraction

To understand in depth the benefits offered by Account Abstraction, to have a more complete overview of how it works, and further details, reading this article written by the Alchemy team is recommended. (https://www.alchemy.com/blog/account-abstraction)



