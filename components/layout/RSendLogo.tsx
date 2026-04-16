interface RSendLogoProps {
  size?: number;
}

export default function RSendLogo({ size = 28 }: RSendLogoProps) {
  return (
    <div className="flex items-center" style={{ gap: 8 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
