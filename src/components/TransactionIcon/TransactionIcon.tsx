import type { SVGProps } from "react";

interface TransactionIconProps extends SVGProps<SVGSVGElement> {
  variant: "success" | "error";
}

export default function TransactionIcon({
  variant,
  width = 72,
  height = 72,
  ...props
}: TransactionIconProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      {...props}
      width={width}
      height={height}
    >
      <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="3" />
      {variant === "success" ? (
        <path
          d="m30 49 12 12 24-26"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M34 34 62 62M62 34 34 62"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
