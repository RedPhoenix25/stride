import { CheckIcon } from "./icons";

const STEPS = ["Delivery", "Payment", "Confirmation"];

export function StepIndicator({ current }: { current: 0 | 1 | 2 }) {
  return (
    <ol className="flex items-center gap-2 border-b border-line pb-4 md:gap-7 md:pb-5">
      {STEPS.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li
            key={label}
            className={`flex items-center gap-1.5 md:gap-2.5 ${
              done || active ? "text-ink" : "text-muted"
            }`}
            aria-current={active ? "step" : undefined}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-pill border font-body text-micro font-semibold md:h-6 md:w-6 md:text-caption ${
                active
                  ? "border-ink bg-ink text-white"
                  : done
                    ? "border-ink text-ink"
                    : "border-line text-muted"
              }`}
            >
              {done ? (
                <CheckIcon className="h-3 w-3" strokeWidth={2.4} />
              ) : (
                index + 1
              )}
            </span>
            <span className="font-body text-micro font-semibold uppercase md:text-step">
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
