import type { Metadata } from "next";
import DocLayout from "@/components/docs/DocLayout";
import Callout from "@/components/docs/Callout";

export const metadata: Metadata = {
  title: "Forwarding & Rules",
  description:
    "Auto-forwarding, split rules, and payment distribution in RSend.",
};

const toc = [
  { id: "auto-forwarding", label: "Auto-Forwarding" },
  { id: "split-rules", label: "Split Rules" },
];

export default function ForwardingPage() {
  return (
    <DocLayout title="Forwarding & Rules" toc={toc}>
      <section id="auto-forwarding">
        <h2 className="text-xl font-semibold text-text">
          Auto-Forwarding
        </h2>
        <p>
          When a payment arrives, RSend can automatically forward it to another
          wallet. Configure this in the Command Center.
        </p>
        <p>Use cases:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Move funds to cold storage after each payment.</li>
          <li>Route to a separate accounting wallet.</li>
          <li>Forward to a multi-sig for team approval.</li>
        </ul>
        <p>
          Forwarding happens immediately after the FeeRouter distributes the
          net amount. It&apos;s a second on-chain transaction from the Master
          wallet — gas is paid by RSend.
        </p>
      </section>

      <section id="split-rules">
        <h2 className="text-xl font-semibold text-text">Split Rules</h2>
        <p>
          A single payment can be split automatically between multiple
          recipients. Percentages are configurable per merchant.
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Example
        </h3>
        <p>
          A payment of 100 USDC arrives. Your split rule is configured as:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Recipient
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Share
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3">Main wallet</td>
                <td className="px-4 py-3">80%</td>
                <td className="px-4 py-3">80.00 USDC</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Partner</td>
                <td className="px-4 py-3">15%</td>
                <td className="px-4 py-3">15.00 USDC</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Reserve</td>
                <td className="px-4 py-3">5%</td>
                <td className="px-4 py-3">5.00 USDC</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-sub">
          All three transfers happen in the same block. The split is applied
          after the 0.5% platform fee — so the 100 USDC example assumes the
          fee was already deducted upstream.
        </p>

        <div className="mt-4">
          <Callout variant="danger" title="Partial Failures">
            If one split transfer fails (e.g. recipient contract reverts), the
            others may still succeed. This results in a{" "}
            <code>partial_failure</code> status. The unsent funds remain safely
            in the Master wallet and can be retried from the Command Center.
          </Callout>
        </div>
      </section>
    </DocLayout>
  );
}
