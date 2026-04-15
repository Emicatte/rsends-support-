interface RSendLogoProps {
  size?: number;
}

export default function RSendLogo({ size = 28 }: RSendLogoProps) {
  return (
    <div className="flex items-center" style={{ gap: 8 }}>
      <div
        className="flex items-center justify-center"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.25,
          background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
        }}
      >
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13 2L4.5 12.5h5.5l-1 9.5 8.5-11.5h-5.5L13 2z"
            fill="white"
            fillOpacity="0.95"
          />
        </svg>
      </div>
      <span
        className="text-text"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: "-0.03em",
        }}
      >
        RSends
      </span>
    </div>
  );
}
