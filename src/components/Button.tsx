import React from "react";
import { ButtonProps } from "./types";

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "px-3 py-2 rounded text-sm font-medium";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90"
      : "bg-transparent border border-gray-300 hover:bg-gray-50";

  return (
    <button
      {...props}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
