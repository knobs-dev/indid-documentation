# Pricing FAQ

## How do subscription plans work?

You choose a plan (Free, Pro, Enterprise). Each plan includes a monthly Credits allowance. If you exceed it, overage is billed pay‑as‑you‑go. You can upgrade/downgrade at any time; changes take effect in the next billing cycle.

## What are Credits?

Credits are our unit to measure the computational resources your app consumes both on‑chain and off‑chain. They abstract the cost of validation, sponsorship, orchestration, and execution complexity into a single metric.

## How are Credits calculated? (clear examples)

- UserOperation (sponsored): Credits for validation + Paymaster sponsorship + relay via Bundler.
- Notarization (e.g., hash anchoring): Credits proportional to data size, verification steps, and on‑chain footprint.
- Batched actions: Credits reflect aggregated validation/execution complexity of the batch.
- Read‑only endpoints: Minimal or zero Credits.

Exact Credit weights depend on operation complexity and network conditions. See the Dashboard for current metering details.

## How do I monitor usage from the Dashboard?

Open the Dashboard → Usage/Analytics. You’ll find:

- Current cycle Credits consumption vs. allowance
- Breakdown by operation type (e.g., userOps, notarizations)
- Daily trend and overage alerts
- Project‑level filters and export (CSV/JSON)

## Do Credits include on‑chain gas fees?

Credits measure compute usage. When operations are sponsored (gasless), Paymaster covers gas on‑chain; Credits reflect the cost of sponsorship and orchestration. For non‑sponsored flows, gas is paid by the caller; Credits still apply for backend processing.
