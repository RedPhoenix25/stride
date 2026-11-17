"use client";

import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

const fieldBase =
  "focus-ring h-12 w-full rounded-input border bg-paper px-3.5 font-body text-small text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:bg-mist disabled:text-muted";

const labelClass = "mb-1.5 block font-body text-small font-medium text-ink";

interface FieldShellProps {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}

function FieldShell({ id, label, helper, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 font-body text-meta text-error">
          {error}
        </p>
      ) : helper ? (
        <p id={`${id}-helper`} className="mt-1.5 font-body text-meta text-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string;
  error?: string;
}

export function Input({
  id,
  label,
  helper,
  error,
  className = "",
  ...props
}: InputProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  const describedBy = error
    ? `${fieldId}-error`
    : helper
      ? `${fieldId}-helper`
      : undefined;

  return (
    <FieldShell id={fieldId} label={label} helper={helper} error={error}>
      <input
        id={fieldId}
        className={`${fieldBase} ${error ? "border-error" : "border-line"} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
    </FieldShell>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}

export function Select({
  id,
  label,
  helper,
  error,
  className = "",
  children,
  ...props
}: SelectProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  const describedBy = error
    ? `${fieldId}-error`
    : helper
      ? `${fieldId}-helper`
      : undefined;

  return (
    <FieldShell id={fieldId} label={label} helper={helper} error={error}>
      <div className="relative">
        <select
          id={fieldId}
          className={`${fieldBase} appearance-none pr-10 ${error ? "border-error" : "border-line"} ${className}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </FieldShell>
  );
}
