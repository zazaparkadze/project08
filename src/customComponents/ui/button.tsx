import { twMerge } from "tailwind-merge";

export default function Button({
  className,
  value,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={twMerge(
        "sm:text-2xl py-2 px-4 bg-black/50 border rounded  hover:bg-white hover:text-black",
        className
      )}
    >
      {value}
    </button>
  );
}
