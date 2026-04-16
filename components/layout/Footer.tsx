export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div
        className="mx-auto flex max-w-[1400px] items-center justify-between px-6"
        style={{ height: 48 }}
      >
        <p className="text-dim" style={{ fontSize: 11 }}>
          &copy; 2025 RSends &mdash; Crypto Payments. Fully Compliant.
        </p>
        <a
          href="https://rsends.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim transition-colors hover:text-sub"
          style={{ fontSize: 11 }}
        >
          rsends.io
        </a>
      </div>
    </footer>
  );
}
