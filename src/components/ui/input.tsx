import { twMerge } from "tailwind-merge";
export default function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={twMerge(
        "sm:text-2xl py-2 pl-4 bg-black/50 border-[1px] rounded  hover:bg-white hover:text-black",
        className
      )}
      type={type === "password" ? "password" : "text"}
      {...props}
    />
  );
}
