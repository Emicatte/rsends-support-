import { Info, AlertTriangle, XCircle, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type CalloutVariant = "info" | "warning" | "danger";

const variants: Record<
  CalloutVariant,
  { icon: LucideIcon; borderColor: string; bgColor: string; iconColor: string }
> = {
  info: {
    icon: Info,
    borderColor: "#3B82F6",
    bgColor: "rgba(59,130,246,0.06)",
    iconColor: "#3B82F6",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "#FFB547",
    bgColor: "rgba(255,181,71,0.06)",
    iconColor: "#FFB547",
  },
  danger: {
    icon: XCircle,
    borderColor: "#FF4C6A",
    bgColor: "rgba(255,76,106,0.06)",
    iconColor: "#FF4C6A",
  },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

export default function Callout({
  variant = "info",
  title,
  children,
}: CalloutProps) {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      style={{
        borderLeft: `3px solid ${config.borderColor}`,
        background: config.bgColor,
        borderRadius: 12,
        padding: 16,
        fontSize: 13,
      }}
    >
      <div className="flex gap-3">
        <Icon
          className="mt-0.5 shrink-0"
          size={16}
          style={{ color: config.iconColor }}
        />
        <div className="min-w-0">
          {title && (
            <p
              className="mb-1 text-text"
              style={{ fontWeight: 600, fontSize: 13 }}
            >
              {title}
            </p>
          )}
          <div className="text-sub" style={{ lineHeight: 1.6 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
