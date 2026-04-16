import type { Metadata } from "next";
import DocLayout from "@/components/docs/DocLayout";
import Callout from "@/components/docs/Callout";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Smart contract security, Oracle system, and custodial model in RSends.",
};

const toc = [
  { id: "smart-contract", label: "Smart Contract Security" },
  { id: "oracle-system", label: "Oracle System" },
  { id: "custodial-model", label: "Custodial Model" },
  { id: "what-we-dont-do", label: "What We Don't Do" },
];

export default function SecurityPage() {
  return (
    <DocLayout title="Security" toc={toc}>
      <section id="smart-contract">
        <h2 className="text-xl font-semibold text-text">
          Smart Contract Security
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>FeeRouterV4</strong> is built on OpenZeppelin contracts.
          </li>
          <li>
            Oracle verification via <strong>EIP-712 typed data signatures</strong>{" "}
            — the contract only executes if the Oracle has signed.
          </li>
          <li>
            <strong>Nonce-based replay protection</strong> — each signature can
            only be used once.
          </li>
          <li>
            Admin functions (pause, fee changes) are{" "}
            <strong>owner-only</strong> and protected by a multi-sig.
          </li>
        </ul>
      </section>

      <section id="oracle-system">
        <h2 className="text-xl font-semibold text-text">Oracle System</h2>
        <p>
          Every transaction requires Oracle approval before the FeeRouter
          executes it.
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>AML screening</strong> — addresses checked against
            sanctioned lists.
          </li>
          <li>
            <strong>Amount limits</strong> — configurable per merchant.
          </li>
          <li>
            <strong>Address blacklist</strong> — known malicious addresses
            blocked.
          </li>
          <li>
            If the Oracle is offline, transactions queue — they are not lost.
            They execute once the Oracle comes back.
          </li>
          <li>
            The Oracle private key is protected by AWS KMS. It never leaves the
            HSM.
          </li>
        </ul>
      </section>

      <section id="custodial-model">
        <h2 className="text-xl font-semibold text-text">
          Custodial Model
        </h2>
        <p>Two different models, depending on the component:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong>End users: NON-custodial.</strong> You sign your own
            transactions with your own wallet. RSends never has access to your
            private key.
          </li>
          <li>
            <strong>Master wallet (splits/forwards): Custodial.</strong> The
            Master wallet holds funds temporarily during split and forward
            operations. Its key is protected by AWS KMS with hot wallet limits
            enforced.
          </li>
        </ul>
      </section>

      <section id="what-we-dont-do">
        <h2 className="text-xl font-semibold text-text">
          What We Don&apos;t Do
        </h2>
        <ul className="list-disc space-y-1 pl-6">
          <li>We never have access to your wallet private keys.</li>
          <li>We never ask for seed phrases.</li>
          <li>We never initiate transactions without your signature.</li>
          <li>We never store your private keys on our servers.</li>
        </ul>

        <div className="mt-4">
          <Callout variant="danger" title="Scam Warning">
            RSends will NEVER ask for your private key or seed phrase. If someone
            claiming to be RSends support asks for this, it is a scam. Report it
            immediately.
          </Callout>
        </div>
      </section>
    </DocLayout>
  );
}
