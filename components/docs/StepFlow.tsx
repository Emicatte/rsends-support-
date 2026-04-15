import { ReactNode } from "react";

interface Step {
  number: number;
  title: string;
  description: ReactNode;
}

interface StepFlowProps {
  steps: Step[];
}

export default function StepFlow({ steps }: StepFlowProps) {
  return (
    <div className="relative">
      {steps.map((step, i) => (
        <div key={step.number} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Dashed vertical line */}
          {i < steps.length - 1 && (
            <div
              className="absolute left-[19px] top-10 bottom-0"
              style={{
                width: 1,
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 4px, transparent 4px, transparent 8px)",
              }}
            />
          )}

          {/* Step circle */}
          <div
            className="relative z-10 flex shrink-0 items-center justify-center rounded-full"
            style={{
              width: 40,
              height: 40,
              border: "1px solid rgba(0,255,163,0.3)",
              background: "rgba(0,255,163,0.08)",
              color: "#00ffa3",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {step.number}
          </div>

          {/* Content */}
          <div className="pt-1.5">
            <h3
              className="text-text"
              style={{ fontSize: 15, fontWeight: 600 }}
            >
              {step.title}
            </h3>
            <div className="mt-1.5 text-sub" style={{ fontSize: 13, lineHeight: 1.6 }}>
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
