export function FieldError({ children }: { children: string }) {
  return <p className="mt-1.5 font-body text-meta text-error">{children}</p>;
}
