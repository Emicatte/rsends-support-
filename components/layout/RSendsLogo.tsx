export default function RSendsLogo({ size = 28 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <img
        src="/favicon.svg"
        alt="RSends"
        width={size}
        height={size}
        style={{ borderRadius: size * 0.25 }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 16,
          fontWeight: 800,
          color: "#E2E2F0",
          letterSpacing: "-0.03em",
        }}
      >
        RSends
      </span>
    </div>
  );
}