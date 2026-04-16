import type { Metadata } from "next";
import DocLayout from "@/components/docs/DocLayout";
import Callout from "@/components/docs/Callout";
import StepFlow from "@/components/docs/StepFlow";

export const metadata: Metadata = {
  title: "How it Works",
  description:
    "Understand the complete RSends payment pipeline — from FeeRouter contract to settlement.",
};

const toc = [
  { id: "overview", label: "Overview" },
  { id: "payment-flow", label: "Payment Flow" },
  { id: "supported-chains", label: "Supported Chains" },
];

const steps = [
  {
    number: 1,
    title: "RECEIVE",
    description: (
      <ul className="list-disc space-y-1 pl-4">
        <li>The payer sends crypto to the FeeRouter contract.</li>
        <li>The amount is specified by the merchant via a payment intent.</li>
      </ul>
    ),
  },
  {
    number: 2,
    title: "ORACLE VERIFY",
    description: (
      <ul className="list-disc space-y-1 pl-4">
        <li>
          The Oracle server verifies the transaction — AML screening, amount
          check, address validation.
        </li>
        <li>Signs an EIP-712 typed data message authorizing the contract to proceed.</li>
        <li>
          If the Oracle denies the transaction, funds stay in the payer&apos;s
          wallet. Nothing is lost.
        </li>
      </ul>
    ),
  },
  {
    number: 3,
    title: "FEE SPLIT",
    description: (
      <ul className="list-disc space-y-1 pl-4">
        <li>The contract deducts the platform fee (0.5% default).</li>
        <li>Fee goes to the RSends Treasury wallet.</li>
        <li>Net amount goes to the recipient.</li>
      </ul>
    ),
  },
  {
    number: 4,
    title: "DISTRIBUTE",
    description: (
      <ul className="list-disc space-y-1 pl-4">
        <li>Net amount arrives at the merchant&apos;s wallet.</li>
        <li>If configured: auto-forward to cold storage wallet.</li>
        <li>If configured: automatic split between multiple recipients.</li>
      </ul>
    ),
  },
  {
    number: 5,
    title: "CONFIRM",
    description: (
      <ul className="list-disc space-y-1 pl-4">
        <li>The backend records the transaction.</li>
        <li>Webhook sent to the merchant&apos;s endpoint.</li>
        <li>DAC8/CARF compliance receipt generated.</li>
      </ul>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <DocLayout title="How it Works" toc={toc}>
      <section id="overview">
        <h2 className="text-xl font-semibold text-text">Overview</h2>
        <p>
          RSends is a Web3 payment gateway for European businesses. It lets you
          accept crypto payments on Base L2 and other chains (EVM, Tron,
          Solana).
        </p>
        <p>
          Every transaction passes through the <code>FeeRouter</code> smart
          contract. The contract handles fee deduction, Oracle verification via
          EIP-712 signatures, and fund distribution — all in a single
          on-chain call.
        </p>
        <p>
          The merchant never touches private keys. The payer signs their own
          transaction. RSends sits in the middle as a routing and compliance
          layer.
        </p>
      </section>

      <section id="payment-flow">
        <h2 className="mb-6 text-xl font-semibold text-text">
          Payment Flow
        </h2>
        <StepFlow steps={steps} />

        <div className="mt-6">
          <Callout variant="info" title="No Funds Lost">
            If any step fails, funds remain at the previous step. No funds are
            ever lost in the pipeline. The FeeRouter contract is designed to be
            atomic — either the full flow completes, or nothing moves.
          </Callout>
        </div>
      </section>

      <section id="supported-chains">
        <h2 className="text-xl font-semibold text-text">
          Supported Chains
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Chain
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  FeeRouter
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Swap
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Base</td>
                <td className="px-4 py-3 text-green-bright">Live</td>
                <td className="px-4 py-3">Yes</td>
                <td className="px-4 py-3">
                  ETH&#8596;USDC, ETH&#8596;USDT
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Ethereum</td>
                <td className="px-4 py-3 text-amber">Soon</td>
                <td className="px-4 py-3">Pending</td>
                <td className="px-4 py-3 text-sub">—</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Arbitrum</td>
                <td className="px-4 py-3 text-amber">Soon</td>
                <td className="px-4 py-3">Pending</td>
                <td className="px-4 py-3 text-sub">—</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Tron</td>
                <td className="px-4 py-3 text-amber">Soon</td>
                <td className="px-4 py-3">TronLink</td>
                <td className="px-4 py-3 text-sub">—</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Solana</td>
                <td className="px-4 py-3 text-amber">Soon</td>
                <td className="px-4 py-3">Phantom</td>
                <td className="px-4 py-3 text-sub">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocLayout>
  );
}
