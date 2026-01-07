import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";

import { cn } from "@utils";

interface InputProps extends ComponentProps<"input"> {
  error?: boolean;
  asChild?: boolean;
  variant?: "default" | "aside";
  isSelected?: boolean;
  maxLength?: number;
}

const variants = cva(
  "data-[error=true]:text-destructive block max-w-full w-full leading-none outline-none",
  {
    variants: {
      variant: {
        default: cn(""),
        aside: cn(
          "text-[26px] font-roboto font-medium text-main-destructive-bg leading-none py-[12px] pl-[72px] pr-[16px]",
          "bg-accordion-bg border border-[1px] border-main-border rounded-[4px]"
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Input({
  className,
  maxLength,
  type,
  asChild,
  variant = "default",
  error,
  isSelected,
  ...props
}: InputProps) {
  const Comp = asChild ? Slot : "input";

  return (
    <Comp
      type={type}
      data-error={error}
      data-selected={isSelected}
      maxLength={maxLength}
      slot="input"
      className={cn(variants({ variant, className }))}
      {...props}
    />
  );
}

export { Input as AtomInput };
