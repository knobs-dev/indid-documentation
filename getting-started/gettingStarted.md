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

To understand in depth the benefits offered by Account Abstraction, to have a more complete overview of how it works, and further details, reading this article written by the Alchemy team is recommended. (https://www.alchemy.com/blog/account-abstraction).


# Project types on Indid

## Guardians

Indid uses the concept of guardians to protect the most delicate operations of the service.

In particular, the guardians are wallets that a user chooses as protectors of his wallet. They use multisignature protocols and there is the need of the approval of the majority of the guardians to allow the execution of a "protected" operation.

Indid projects offer the possibility to choose among two account factories, that allow the user to select if he wants to add, manage and remove his personal guardians or if he wants a guardians structure managed by Indid.

The user can also select two types of modules, that give him the chance to choose which operation to protect with the guardians.

Now the details of the factories and the modules are presented.

## Factories

### Shared Storage Factory

With the Shared Storage Factory, the user chooses the possibility to have a guardians structure that is completely managed and made available by Indid.

This factory doesn't allow the user to add or remove guardians.

A user "shares" his guardians with other users who selected this type of factory.

This works thanks to a Struct that contains the guardians, that can be added or removed by Indid backend. The users, at the moment of the project creation, are associated to the pointer to this data structure (GuardianId) and every change made by the backend to this structure is reflected on each user's account.

### Generalized Account Factory

Choosing the Generalized Account Factory, a user selects the possibility to manage his own guardians.

In this case the guardians are personal and aren't shared with any other account. 

The data structure here is a guardian array, which can be modified directly by the user through the chance of adding and removing the guardians by himself.

## Modules

### User Module

The modules "protect" the execution of some methods by allowing their execution only with the signature of the majority of the guardians.

In particular, the main operations that User Module protects are:
- executeRecovery (SecurityManager) that allows the recovery of a smart contract wallet;
- cancelRecovery (SecurityManager) that is responsible of the deletion of a recovery request;
- transferOwnership (SecurityManager) to transfer the ownership of a smart contract wallet;
- upgradeWallet (SecurityManager) to give the possibility to use the upgradeability of the smart contract wallet;
- multicallWithGuardians (EnterpriseTransactionManager) to handle the sending of the userOperations.

### Enterprise Module

Also the Enterprise Module protects the execution of the same methods of the Users one, but it protects also the methods responsible for the guardians management.

These are:

- addGuardian (SecurityManager) that handles the request of adding a guardian;
- revokeGuardian (SecurityManager) that handles the request of revoking the guardian role to one of the guardians;
- cancelGuardianAddition (SecurityManager) that handles the deletion of a request of adding a guardian;
- cancelGuardianRevokation (SecurityManager) that handles the deletion of a request of revoking a guardian role.






