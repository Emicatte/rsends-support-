import type { Metadata } from "next";
import DocLayout from "@/components/docs/DocLayout";
import Callout from "@/components/docs/Callout";

export const metadata: Metadata = {
  title: "Fees",
  description:
    "RSend fee structure, gas costs, and transaction cost examples.",
};

const toc = [
  { id: "fee-structure", label: "Fee Structure" },
  { id: "gas-costs", label: "Gas Costs" },
  { id: "examples", label: "Examples" },
];

export default function FeesPage() {
  return (
    <DocLayout title="Fees" toc={toc}>
      <section id="fee-structure">
        <h2 className="text-xl font-semibold text-text">Fee Structure</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>Platform fee:</strong> 0.5% of the transaction amount.
          </li>
          <li>
            Deducted automatically by the FeeRouter contract before the
            recipient gets paid.
          </li>
          <li>Fee goes to the RSend Treasury wallet.</li>
        </ul>
        <p>
          There are no monthly fees, no setup fees, and no minimum volume
          requirements. You pay 0.5% per transaction. That&apos;s it.
        </p>
      </section>

      <section id="gas-costs">
        <h2 className="text-xl font-semibold text-text">Gas Costs</h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>Gas is paid by the sender (standard EVM behavior).</li>
          <li>
            On Base L2, gas is typically <strong>$0.001–$0.01</strong> per
            transaction.
          </li>
          <li>Gas is NOT included in the 0.5% fee — it&apos;s separate.</li>
        </ul>
      </section>

      <section id="examples">
        <h2 className="text-xl font-semibold text-text">Examples</h2>
        <p>All examples on Base L2 with standard gas conditions:</p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Fee (0.5%)
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Net to Recipient
                </th>
                <th className="px-4 py-3 text-left font-medium text-sub">
                  Gas (approx)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3">10 USDC</td>
                <td className="px-4 py-3">0.05 USDC</td>
                <td className="px-4 py-3">9.95 USDC</td>
                <td className="px-4 py-3 text-sub">~$0.003</td>
              </tr>
              <tr>
                <td className="px-4 py-3">100 USDC</td>
                <td className="px-4 py-3">0.50 USDC</td>
                <td className="px-4 py-3">99.50 USDC</td>
                <td className="px-4 py-3 text-sub">~$0.003</td>
              </tr>
              <tr>
                <td className="px-4 py-3">1,000 USDC</td>
                <td className="px-4 py-3">5.00 USDC</td>
                <td className="px-4 py-3">995.00 USDC</td>
                <td className="px-4 py-3 text-sub">~$0.005</td>
              </tr>
              <tr>
                <td className="px-4 py-3">10,000 USDC</td>
                <td className="px-4 py-3">50.00 USDC</td>
                <td className="px-4 py-3">9,950.00 USDC</td>
                <td className="px-4 py-3 text-sub">~$0.008</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Callout variant="info" title="Swap Fees">
            Swap transactions (e.g. ETH&#8594;USDC) have an additional Uniswap
            pool fee (typically 0.3%) on top of the RSend 0.5% fee. The swap
            fee is deducted by the DEX, not by RSend.
          </Callout>
        </div>
      </section>
    </DocLayout>
  );
}
