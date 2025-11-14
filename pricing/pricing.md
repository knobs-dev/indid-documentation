# Pricing

This section provides an overview of our plans and how Credits work.

## Pricing Plans

| Plan       | Best for                     | Included Credits | Overage       | Support            |
| ---------- | ---------------------------- | ---------------- | ------------- | ------------------ |
| Free       | Evaluation & prototypes      | Limited          | Pay‑as‑you‑go | Community support  |
| Pro        | Startups & production apps   | Higher cap       | Pay‑as‑you‑go | Priority support   |
| Enterprise | Scale, security & compliance | Custom           | Custom        | SLA & dedicated AM |

Notes:

- See your Dashboard for current prices, included Credits and overage rates.
- Plans can be upgraded or downgraded at any time; changes apply to the next billing cycle.

## Credits Costs

Credits measure the computational resources consumed across on‑chain and off‑chain processing. Typical factors include:

- UserOperation processing (validation, sponsorship, bundling)
- Paymaster sponsorship complexity
- Off‑chain orchestration (webhooks, worker tasks)
- On‑chain execution footprint (gas profile, calldata size)

High‑level guidelines:

- Read‑only/metadata endpoints have minimal or zero Credits impact
- Sponsored (gasless) operations consume Credits according to the operation’s complexity
- Heavy workflows (e.g., large calldata notarization) consume more Credits than simple state changes

Examples:

- Sponsored UserOperation: Credits charged for validation + paymaster sponsorship + relay
- Notarization (hash anchoring): Credits proportional to data size and verification steps
- Batched actions: Credits reflect aggregated validation/execution complexity

Monitor usage and detailed Credits breakdown from your Dashboard.
