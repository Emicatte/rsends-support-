export const KNOWLEDGE_BASE = `
# RSend Support Knowledge Base

## How RSend Works
- RSend is a Web3 B2B payment gateway for European businesses on Base L2 (multi-chain EVM + Tron + Solana planned).
- Every transaction goes through the FeeRouter smart contract with Oracle EIP-712 verification.
- Pipeline: RECEIVE → ORACLE VERIFY → FEE SPLIT → DISTRIBUTE → CONFIRM.
- Step 1 (Receive): Payer sends crypto to FeeRouter. Amount set by merchant via payment intent.
- Step 2 (Oracle Verify): Oracle server does AML screening, amount check, address validation. Signs EIP-712 typed data. If denied → funds stay in payer wallet, never lost.
- Step 3 (Fee Split): Contract deducts 0.5% fee → Treasury wallet. Net → recipient.
- Step 4 (Distribute): Net amount to merchant wallet. Optional: auto-forward to cold storage or split between multiple recipients.
- Step 5 (Confirm): Backend records tx, webhook sent to merchant, DAC8/CARF compliance receipt generated.
- If any step fails, funds remain at previous step. No funds ever lost — FeeRouter is atomic.

## Supported Chains
- Base: LIVE. FeeRouter deployed. Swaps: ETH↔USDC, ETH↔USDT.
- Ethereum, Arbitrum, Tron, Solana: Coming soon.

## Payments
- Direct payments: Payer selects token/amount/recipient on RSend → Oracle verifies → on-chain via FeeRouter.
- Payment Intents (Merchant API): Merchant creates intent via POST /api/v1/merchant/payment-intent → gets intent_id (e.g. pi_abc123) → payer completes → webhook fires.
- Payment Matching: System matches incoming payments to open intents by amount + currency + recipient wallet. Match found → status "completed". No match → recorded as generic transfer.
- Intents expire after configured time (default 30 min). Expired intents cannot be completed — create new one.

## Forwarding & Rules
- Auto-forwarding: Payments auto-forwarded to another wallet (cold storage, accounting). Configured in Command Center. Gas paid by RSend.
- Split Rules: Single payment split between multiple recipients by percentage (e.g. 80% merchant, 15% partner, 5% reserve). All transfers same block.
- If one split fails, others may succeed → "partial_failure" status. Unsent funds stay in Master wallet, retryable.

## Fees
- Platform fee: 0.5% per transaction, deducted by FeeRouter before recipient gets paid. Goes to RSend Treasury.
- No monthly fees, no setup fees, no minimum volume.
- Gas: Paid by sender. On Base L2: $0.001–$0.01 per tx. Gas is separate from the 0.5% fee.
- Examples: 10 USDC → 0.05 fee, 9.95 net. 100 USDC → 0.50 fee, 99.50 net. 1000 USDC → 5.00 fee, 995.00 net.
- Swap txs (e.g. ETH→USDC) add Uniswap pool fee (~0.3%) on top of RSend 0.5%.

## Security
- FeeRouterV4 built on OpenZeppelin. EIP-712 Oracle verification. Nonce-based replay protection. Owner-only admin (pause, fee changes) via multi-sig.
- Oracle: Every tx requires Oracle approval. Checks: AML screening, amount limits, address blacklist. If Oracle offline → txs queue, not lost. Oracle key in AWS KMS/HSM.
- Custodial model: End users = NON-custodial (sign own txs). Master wallet (splits/forwards) = custodial, key in AWS KMS, hot wallet limits enforced.
- RSend NEVER has access to user private keys, NEVER asks for seed phrases, NEVER initiates txs without user signature.

## Troubleshooting
- "Oracle Signature Invalid": Signer mismatch, deadline expired, or network mismatch. Fix: wait 30s, retry. If persists, Oracle may be offline.
- "Swap failed": Insufficient liquidity, slippage exceeded, wrong SwapRouter. Fix: try smaller amount. Tokens NOT lost — stay in wallet.
- "Transaction stuck pending": Low gas, congestion, RPC issue. Fix: check BaseScan, speed up in MetaMask if >10 min.
- "Webhook not received": Endpoint returned non-2xx, timeout >10s, or HMAC mismatch. Check Command Center logs. Retries: 30s → 2min → 8min → 32min → 2h (5 attempts max).
- "Payment intent expired": Payer didn't complete in time. Fix: create new intent. Old one can't be reactivated.
- "Balance shows $0 on Tron/Solana": Expected — non-EVM portfolio data being integrated. Use TronScan/Solscan directly.

## API Reference
- Auth: Bearer token (Authorization: Bearer rsend_live_sk_...). Keys from Command Center. merchant_id derived from key.
- POST /api/v1/merchant/payment-intent — Create intent. Body: amount, currency, recipient, expires_in, metadata. Returns: intent_id, status, expires_at.
- GET /api/v1/merchant/payment-intent/{id} — Get intent status. Returns: status, tx_hash (if completed), metadata.
- POST /api/v1/merchant/webhook/register — Register webhook URL. Body: url, events, secret.
- POST /api/v1/merchant/webhook/test — Test webhook delivery. Body: webhook_id.
- GET /api/v1/merchant/transactions — List txs (paginated). Filters: status, from/to dates. Params: page, limit.
- Webhook events: payment.completed, payment.expired, payment.cancelled.
- Webhook signature: X-RSend-Signature header = HMAC-SHA256 of body with webhook secret. Always verify before processing.
`;
