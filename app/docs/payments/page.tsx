import type { Metadata } from "next";
import DocLayout from "@/components/docs/DocLayout";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "Payments",
  description:
    "Direct payments, payment intents, and payment matching in RSends.",
};

const toc = [
  { id: "direct-payments", label: "Direct Payments" },
  { id: "payment-intents", label: "Payment Intents" },
  { id: "payment-matching", label: "Payment Matching" },
];

export default function PaymentsPage() {
  return (
    <DocLayout title="Payments" toc={toc}>
      <section id="direct-payments">
        <h2 className="text-xl font-semibold text-text">
          Direct Payments
        </h2>
        <p>The simplest flow. No API needed.</p>
        <ol className="list-decimal space-y-1.5 pl-6">
          <li>The payer goes to RSends and selects token, amount, and recipient.</li>
          <li>The Oracle verifies the transaction and signs.</li>
          <li>Transaction executes on-chain via the FeeRouter contract.</li>
        </ol>
        <p>
          The merchant receives the net amount (minus 0.5% fee) directly in
          their wallet. No webhook, no callback — just an on-chain transfer.
        </p>
      </section>

      <section id="payment-intents">
        <h2 className="text-xl font-semibold text-text">
          Payment Intents (Merchant API)
        </h2>
        <p>
          For programmatic integrations. The merchant creates a payment intent
          via the API, gets back an <code>intent_id</code>, and passes it to
          the payer. When the payer completes the payment, RSends sends a
          webhook.
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Create Intent
        </h3>
        <CodeBlock
          language="json"
          title="POST /api/v1/merchant/payment-intent"
          code={`{
  "amount": "100.00",
  "currency": "USDC",
  "recipient": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  "expires_in": 1800
}`}
        />

        <h3 className="mt-6 text-base font-semibold text-text">
          Response
        </h3>
        <CodeBlock
          language="json"
          title="200 OK"
          code={`{
  "intent_id": "pi_abc123",
  "status": "pending",
  "amount": "100.00",
  "currency": "USDC",
  "expires_at": "2025-04-15T12:30:00Z"
}`}
        />

        <p className="mt-4">
          The <code>intent_id</code> (e.g. <code>pi_abc123</code>) is what you
          pass to the payer. They use it to complete the payment on RSends.
        </p>
      </section>

      <section id="payment-matching">
        <h2 className="text-xl font-semibold text-text">
          Payment Matching
        </h2>
        <p>
          When an incoming payment hits the FeeRouter, RSends matches it against
          open payment intents. The match uses three fields:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Amount</strong> — must match exactly.
          </li>
          <li>
            <strong>Currency</strong> — must match the intent&apos;s token.
          </li>
          <li>
            <strong>Recipient wallet</strong> — must match the intent&apos;s
            destination.
          </li>
        </ul>
        <p>
          If a match is found, the intent status changes to{" "}
          <code>completed</code> and the webhook fires. If no match is found,
          the payment is recorded as a generic transfer — it still goes
          through, but no intent is fulfilled.
        </p>

        <Callout variant="warning" title="Intent Expiry">
          Payment intents expire after the configured time (default 30
          minutes). Expired intents cannot be completed — a new one must be
          created. The payer&apos;s funds are not affected by expiry.
        </Callout>
      </section>
    </DocLayout>
  );
}
