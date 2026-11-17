import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-mist px-5 py-11 text-center md:px-6 md:py-14">
      <h3 className="font-body text-h3-m font-semibold text-ink md:text-h3">
        {title}
      </h3>
      <p className="mx-auto mb-6 mt-2 max-w-96 font-body text-small text-muted">
        {description}
      </p>
      {action}
    </div>
  );
}
