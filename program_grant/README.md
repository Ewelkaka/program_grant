# Solana Devnet Staking Automator

A resilient tool for automated staking account creation and delegation on the Solana Devnet, built as part of the Program Grant application.

## 🚀 Technical Highlights

This tool addresses common pitfalls in automated staking management:
- **Dynamic Validator Discovery**: Implements health checks to avoid "Vote account not found" errors by verifying validator status on-chain.
- **Race Condition Mitigation**: Solves the "incorrect program id" simulation error by implementing a sequential, verified transaction flow.
- **Atomic-like Operations**: Ensures stake accounts are correctly initialized before delegation attempts.

## 📊 Proof of Work (Devnet)

- **Stake Account**: `CJcH4Yd1b4mMhMJQyZUdkG9Y9Ph3m5cNjYRs9zYFbH6S`
- **Validator (Vote Account)**: `8p3V8vkJcs2GA22vAeVLTK4HyEZyy37hayJWwwZyyS4Z`
- **Delegation TX**: `3Y32TFo78LnJsJZE2gWwTsECZw3nTWiCA3LeQL62VxsVK4gGYGcW84iUDJZT29wvWMny3K4HGZ4UgNzY6NU9f47m`

## 🛠 Setup & Usage

1. **Install dependencies**:
   ```bash
   npm install @solana/web3.js
