import type { ReactNode } from "react";

interface ErrorBannerProps {
  title: string;
  reason: string;
  reference?: string;
  actions?: ReactNode;
}

export function ErrorBanner({
  title,
  reason,
  reference,
  actions,
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="mb-6 flex flex-col gap-3.5 border-l-3 border-error bg-error-soft px-5 py-4 md:flex-row md:items-start md:gap-6"
    >
      <div className="min-w-0 flex-1">
        <h4 className="font-body text-body font-semibold text-error">{title}</h4>
        <p className="mt-1 max-w-prose font-body text-small text-ink/80">
          {reason}
        </p>
        {reference ? (
          <p className="mt-2 font-mono text-caption text-muted">{reference}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2 md:max-w-72 md:flex-none md:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
