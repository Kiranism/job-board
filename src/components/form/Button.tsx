import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  children: React.ReactNode;
  classname?: string;
};

export default function Button({
  isLoading,
  classname,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={cn(
        isLoading && "opacity-50 cursor-not-allowed",
        "py-2 px-4 text-white bg-primary rounded-md",
        classname
      )}
      {...rest}
    >
      <>{children}</>
    </button>
  );
}
