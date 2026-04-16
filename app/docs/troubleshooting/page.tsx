import type { Metadata } from "next";
import DocLayout from "@/components/docs/DocLayout";
import Callout from "@/components/docs/Callout";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description: "Common RSends issues and how to fix them.",
};

const toc = [
  { id: "oracle-signature-invalid", label: "Oracle Signature Invalid" },
  { id: "swap-failed", label: "Swap Failed" },
  { id: "tx-stuck-pending", label: "Transaction Stuck" },
  { id: "webhook-not-received", label: "Webhook Not Received" },
  { id: "intent-expired", label: "Payment Intent Expired" },
  { id: "zero-balance-non-evm", label: "Zero Balance on Tron/Solana" },
];

export default function TroubleshootingPage() {
  return (
    <DocLayout title="Troubleshooting" toc={toc}>
      {/* Problem 1 */}
      <section id="oracle-signature-invalid">
        <h2 className="text-xl font-semibold text-text">
          &ldquo;Transaction failed with Oracle Signature Invalid&rdquo;
        </h2>
        <p>
          <strong>Cause:</strong> Oracle signer mismatch, signature deadline
          expired, or network mismatch (e.g. signed for mainnet, sent on
          testnet).
        </p>
        <p>
          <strong>Fix:</strong> Wait 30 seconds and retry. The Oracle
          re-generates a fresh signature on each attempt. If it persists for
          more than a few minutes, the Oracle may be temporarily offline — try
          again later.
        </p>
      </section>

      {/* Problem 2 */}
      <section id="swap-failed">
        <h2 className="text-xl font-semibold text-text">
          &ldquo;Swap failed&rdquo;
        </h2>
        <p>
          <strong>Cause:</strong> Insufficient liquidity in the Uniswap pool,
          slippage exceeded, or wrong SwapRouter address.
        </p>
        <p>
          <strong>Fix:</strong> Try a smaller amount, or wait for better
          liquidity. Check that you&apos;re on the right network.
        </p>
        <Callout variant="info" title="Funds Are Safe">
          If a swap fails, your tokens are NOT lost. They stay in your wallet.
          The FeeRouter reverts the entire transaction on failure.
        </Callout>
      </section>

      {/* Problem 3 */}
      <section id="tx-stuck-pending">
        <h2 className="text-xl font-semibold text-text">
          &ldquo;Transaction stuck on pending&rdquo;
        </h2>
        <p>
          <strong>Cause:</strong> Low gas price, network congestion, or RPC
          node issue.
        </p>
        <p>
          <strong>Fix:</strong> Check the transaction on BaseScan. If it&apos;s
          been pending for more than 10 minutes, try speeding it up in MetaMask
          (click on the pending tx → Speed Up). On Base L2, transactions
          normally confirm in under 3 seconds — a stuck tx usually means an
          RPC problem.
        </p>
      </section>

      {/* Problem 4 */}
      <section id="webhook-not-received">
        <h2 className="text-xl font-semibold text-text">
          &ldquo;Webhook not received&rdquo;
        </h2>
        <p>
          <strong>Cause:</strong> Your endpoint returned a non-2xx status, timed
          out (&gt;10s), or the HMAC signature verification failed.
        </p>
        <p>
          <strong>Fix:</strong> Check the webhook delivery logs in the Command
          Center (Settings → Webhooks → Logs). RSends retries with exponential
          backoff:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Attempt
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Delay
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3">1st retry</td>
                <td className="px-4 py-3">30 seconds</td>
              </tr>
              <tr>
                <td className="px-4 py-3">2nd retry</td>
                <td className="px-4 py-3">2 minutes</td>
              </tr>
              <tr>
                <td className="px-4 py-3">3rd retry</td>
                <td className="px-4 py-3">8 minutes</td>
              </tr>
              <tr>
                <td className="px-4 py-3">4th retry</td>
                <td className="px-4 py-3">32 minutes</td>
              </tr>
              <tr>
                <td className="px-4 py-3">5th retry (final)</td>
                <td className="px-4 py-3">2 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-sub">
          After 5 failed attempts, the webhook is marked as{" "}
          <code>failed</code>. You can manually resend it from the dashboard.
        </p>
      </section>

      {/* Problem 5 */}
      <section id="intent-expired">
        <h2 className="text-xl font-semibold text-text">
          &ldquo;Payment intent expired&rdquo;
        </h2>
        <p>
          <strong>Cause:</strong> The payer didn&apos;t complete the payment
          within the expiry window (default: 30 minutes).
        </p>
        <p>
          <strong>Fix:</strong> Create a new payment intent. Expired intents
          cannot be reactivated. If the payer sent funds after expiry, the
          payment is recorded as a generic transfer — it still goes through,
          but the intent is not fulfilled.
        </p>
      </section>

      {/* Problem 6 */}
      <section id="zero-balance-non-evm">
        <h2 className="text-xl font-semibold text-text">
          &ldquo;Balance shows $0 on Tron/Solana&rdquo;
        </h2>
        <p>
          This is expected. Portfolio data for non-EVM chains is being
          integrated. Your funds are there — use{" "}
          <a
            href="https://tronscan.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-bright hover:underline"
          >
            TronScan
          </a>{" "}
          or{" "}
          <a
            href="https://solscan.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-bright hover:underline"
          >
            Solscan
          </a>{" "}
          to view your full balance until dashboard support is live.
        </p>
      </section>
    </DocLayout>
  );
}
