# Pricing

This section provides an overview of our plans and how Compute Units (CU) work.

## Pricing Plans

| Plan       | Best for                       | Included CU | Overage       | Support            |
| ---------- | ------------------------------ | ----------- | ------------- | ------------------ |
| Free       | Evaluation & prototypes        | Limited     | Pay‑as‑you‑go | Community support  |
| Pro        | Startups & production apps     | Higher cap  | Pay‑as‑you‑go | Priority support   |
| Enterprise | Scale, security & compliance   | Custom      | Custom         | SLA & dedicated AM |

Notes:
- See your Dashboard for current prices, included CU and overage rates.
- Plans can be upgraded or downgraded at any time; changes apply to the next billing cycle.

## Compute Units (CU) Costs

CU measure the computational resources consumed across on‑chain and off‑chain processing. Typical factors include:
- UserOperation processing (validation, sponsorship, bundling)
- Paymaster sponsorship complexity
- Off‑chain orchestration (webhooks, worker tasks)
- On‑chain execution footprint (gas profile, calldata size)

High‑level guidelines:
- Read‑only/metadata endpoints have minimal or zero CU impact
- Sponsored (gasless) operations consume CU according to the operation’s complexity
- Heavy workflows (e.g., large calldata notarization) consume more CU than simple state changes

Examples:
- Sponsored UserOperation: CU charged for validation + paymaster sponsorship + relay
- Notarization (hash anchoring): CU proportional to data size and verification steps
- Batched actions: CU reflects aggregated validation/execution complexity

Monitor usage and detailed CU breakdown from your Dashboard.

