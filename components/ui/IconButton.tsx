import type { ButtonHTMLAttributes } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`focus-ring inline-flex h-10 w-10 flex-none items-center justify-center rounded-pill ${className}`}
      {...props}
    />
  );
}
