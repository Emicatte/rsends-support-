import type { Metadata } from "next";
import DocLayout from "@/components/docs/DocLayout";
import Callout from "@/components/docs/Callout";
import CodeBlock from "@/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "API Reference",
  description: "RSends merchant API endpoints, authentication, and webhook events.",
};

const toc = [
  { id: "authentication", label: "Authentication" },
  { id: "create-intent", label: "Create Payment Intent" },
  { id: "get-intent", label: "Get Intent Status" },
  { id: "register-webhook", label: "Register Webhook" },
  { id: "test-webhook", label: "Test Webhook" },
  { id: "list-transactions", label: "List Transactions" },
  { id: "webhook-events", label: "Webhook Events" },
  { id: "hmac-verification", label: "HMAC Verification" },
];

export default function ApiReferencePage() {
  return (
    <DocLayout title="API Reference" toc={toc}>
      {/* Authentication */}
      <section id="authentication">
        <h2 className="text-xl font-semibold text-text">
          Authentication
        </h2>
        <p>
          All requests require a Bearer token in the <code>Authorization</code>{" "}
          header. Generate API keys in the Command Center.
        </p>
        <CodeBlock
          title="Header"
          code={`Authorization: Bearer rsend_live_sk_abc123...`}
        />
        <p className="mt-3">
          Your <code>merchant_id</code> is derived from your API key — you
          don&apos;t need to pass it separately.
        </p>
      </section>

      {/* Endpoint 1: Create Payment Intent */}
      <section id="create-intent">
        <h2 className="text-xl font-semibold text-text">
          Create Payment Intent
        </h2>
        <p>
          <code>POST /api/v1/merchant/payment-intent</code>
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Request
        </h3>
        <CodeBlock
          language="json"
          title="POST /api/v1/merchant/payment-intent"
          code={`{
  "amount": "250.00",
  "currency": "USDC",
  "recipient": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  "expires_in": 1800,
  "metadata": {
    "order_id": "ord_9f3k2",
    "customer_email": "buyer@example.com"
  }
}`}
        />

        <h3 className="mt-4 text-base font-semibold text-text">
          Response <span className="font-normal text-sub">201 Created</span>
        </h3>
        <CodeBlock
          language="json"
          title="201 Created"
          code={`{
  "intent_id": "pi_7xk29m",
  "status": "pending",
  "amount": "250.00",
  "currency": "USDC",
  "recipient": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  "expires_at": "2025-04-15T12:30:00Z",
  "created_at": "2025-04-15T12:00:00Z"
}`}
        />

        <h3 className="mt-4 text-base font-semibold text-text">Errors</h3>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          <li>
            <code>400</code> — Invalid amount, unsupported currency, or missing
            fields.
          </li>
          <li>
            <code>401</code> — Invalid or missing API key.
          </li>
          <li>
            <code>429</code> — Rate limit exceeded (100 requests/min).
          </li>
        </ul>
      </section>

      {/* Endpoint 2: Get Intent Status */}
      <section id="get-intent">
        <h2 className="text-xl font-semibold text-text">
          Get Intent Status
        </h2>
        <p>
          <code>GET /api/v1/merchant/payment-intent/&#123;id&#125;</code>
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Response <span className="font-normal text-sub">200 OK</span>
        </h3>
        <CodeBlock
          language="json"
          title="200 OK"
          code={`{
  "intent_id": "pi_7xk29m",
  "status": "completed",
  "amount": "250.00",
  "currency": "USDC",
  "tx_hash": "0x1a2b3c4d5e6f...",
  "completed_at": "2025-04-15T12:05:32Z",
  "metadata": {
    "order_id": "ord_9f3k2",
    "customer_email": "buyer@example.com"
  }
}`}
        />

        <h3 className="mt-4 text-base font-semibold text-text">Errors</h3>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          <li>
            <code>404</code> — Intent not found.
          </li>
        </ul>
      </section>

      {/* Endpoint 3: Register Webhook */}
      <section id="register-webhook">
        <h2 className="text-xl font-semibold text-text">
          Register Webhook
        </h2>
        <p>
          <code>POST /api/v1/merchant/webhook/register</code>
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Request
        </h3>
        <CodeBlock
          language="json"
          title="POST /api/v1/merchant/webhook/register"
          code={`{
  "url": "https://yourapp.com/webhooks/rsend",
  "events": ["payment.completed", "payment.expired", "payment.cancelled"],
  "secret": "whsec_your_secret_here"
}`}
        />

        <h3 className="mt-4 text-base font-semibold text-text">
          Response <span className="font-normal text-sub">201 Created</span>
        </h3>
        <CodeBlock
          language="json"
          title="201 Created"
          code={`{
  "webhook_id": "wh_m3x92p",
  "url": "https://yourapp.com/webhooks/rsend",
  "events": ["payment.completed", "payment.expired", "payment.cancelled"],
  "status": "active"
}`}
        />

        <h3 className="mt-4 text-base font-semibold text-text">Errors</h3>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          <li>
            <code>400</code> — Invalid URL or unsupported event type.
          </li>
          <li>
            <code>409</code> — Webhook URL already registered.
          </li>
        </ul>
      </section>

      {/* Endpoint 4: Test Webhook */}
      <section id="test-webhook">
        <h2 className="text-xl font-semibold text-text">
          Test Webhook Delivery
        </h2>
        <p>
          <code>POST /api/v1/merchant/webhook/test</code>
        </p>
        <p>
          Sends a test <code>payment.completed</code> event to your registered
          webhook URL. Use this to verify your endpoint works before going
          live.
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Request
        </h3>
        <CodeBlock
          language="json"
          title="POST /api/v1/merchant/webhook/test"
          code={`{
  "webhook_id": "wh_m3x92p"
}`}
        />

        <h3 className="mt-4 text-base font-semibold text-text">
          Response <span className="font-normal text-sub">200 OK</span>
        </h3>
        <CodeBlock
          language="json"
          title="200 OK"
          code={`{
  "delivered": true,
  "status_code": 200,
  "response_time_ms": 142
}`}
        />

        <h3 className="mt-4 text-base font-semibold text-text">Errors</h3>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          <li>
            <code>404</code> — Webhook ID not found.
          </li>
          <li>
            <code>502</code> — Your endpoint returned an error or timed out.
          </li>
        </ul>
      </section>

      {/* Endpoint 5: List Transactions */}
      <section id="list-transactions">
        <h2 className="text-xl font-semibold text-text">
          List Transactions
        </h2>
        <p>
          <code>GET /api/v1/merchant/transactions</code>
        </p>
        <p>
          Returns a paginated list of transactions. Supports filters via query
          params.
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Query Parameters
        </h3>
        <ul className="list-disc space-y-1 pl-6 text-sm">
          <li>
            <code>page</code> — Page number (default: 1).
          </li>
          <li>
            <code>limit</code> — Items per page (default: 20, max: 100).
          </li>
          <li>
            <code>status</code> — Filter by status:{" "}
            <code>completed</code>, <code>pending</code>,{" "}
            <code>expired</code>, <code>cancelled</code>.
          </li>
          <li>
            <code>from</code> / <code>to</code> — Date range (ISO 8601).
          </li>
        </ul>

        <h3 className="mt-4 text-base font-semibold text-text">
          Response <span className="font-normal text-sub">200 OK</span>
        </h3>
        <CodeBlock
          language="json"
          title="200 OK"
          code={`{
  "data": [
    {
      "tx_id": "tx_a1b2c3",
      "intent_id": "pi_7xk29m",
      "amount": "250.00",
      "currency": "USDC",
      "status": "completed",
      "tx_hash": "0x1a2b3c4d5e6f...",
      "created_at": "2025-04-15T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "has_more": false
  }
}`}
        />
      </section>

      {/* Webhook Events */}
      <section id="webhook-events">
        <h2 className="text-xl font-semibold text-text">
          Webhook Events
        </h2>
        <p>RSends emits three webhook events:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <code>payment.completed</code> — Payment confirmed and forwarded.
          </li>
          <li>
            <code>payment.expired</code> — Intent expired without payment.
          </li>
          <li>
            <code>payment.cancelled</code> — Intent cancelled by merchant.
          </li>
        </ul>

        <h3 className="mt-4 text-base font-semibold text-text">
          Payload Format
        </h3>
        <CodeBlock
          language="json"
          title="Webhook Payload"
          code={`{
  "event": "payment.completed",
  "intent_id": "pi_7xk29m",
  "amount": "250.00",
  "currency": "USDC",
  "tx_hash": "0x1a2b3c4d5e6f...",
  "timestamp": "2025-04-15T12:05:32Z",
  "metadata": {
    "order_id": "ord_9f3k2"
  }
}`}
        />

        <p className="mt-3">
          The <code>X-RSends-Signature</code> header contains the HMAC-SHA256
          signature of the raw request body, signed with your webhook secret.
        </p>
      </section>

      {/* HMAC Verification */}
      <section id="hmac-verification">
        <h2 className="text-xl font-semibold text-text">
          HMAC Verification
        </h2>
        <p>
          Always verify the <code>X-RSends-Signature</code> header before
          processing a webhook event. Here&apos;s how:
        </p>

        <h3 className="mt-4 text-base font-semibold text-text">
          Node.js
        </h3>
        <CodeBlock
          language="javascript"
          title="verify-webhook.js"
          code={`const crypto = require("crypto");

function verifyWebhook(body, signature, secret) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// Usage in Express
app.post("/webhooks/rsend", (req, res) => {
  const signature = req.headers["x-rsend-signature"];
  const isValid = verifyWebhook(req.rawBody, signature, WEBHOOK_SECRET);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const event = JSON.parse(req.rawBody);
  // Process event...
  res.status(200).json({ received: true });
});`}
        />

        <h3 className="mt-6 text-base font-semibold text-text">
          Python
        </h3>
        <CodeBlock
          language="python"
          title="verify_webhook.py"
          code={`import hmac
import hashlib

def verify_webhook(body: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode("utf-8"),
        body,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected)

# Usage in Flask
@app.route("/webhooks/rsend", methods=["POST"])
def handle_webhook():
    signature = request.headers.get("X-RSends-Signature", "")
    is_valid = verify_webhook(request.data, signature, WEBHOOK_SECRET)

    if not is_valid:
        return {"error": "Invalid signature"}, 401

    event = request.get_json()
    # Process event...
    return {"received": True}, 200`}
        />

        <div className="mt-4">
          <Callout variant="danger" title="Always Verify">
            Never process webhook events without verifying the HMAC signature.
            An attacker could send fake events to your endpoint to trigger
            false payment confirmations.
          </Callout>
        </div>
      </section>
    </DocLayout>
  );
}
