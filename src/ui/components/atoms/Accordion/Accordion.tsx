"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@utils";
import { cva, VariantProps } from "class-variance-authority";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className="w-full h-fit"
      suppressHydrationWarning
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("w-full h-fit", className)}
      {...props}
    />
  );
}

const triggerVariants = cva(
  "disabled:pointer-events-none disabled:opacity-50 [&[data-state=closed]>svg]:rotate-180 transition-all ease-in-out duration-300 outline-none!",
  {
    variants: {
      variant: {
        default: "flex justify-between items-center w-full h-full",
        section_view: cn(
          "flex justify-between items-center gap-x-[16px] w-full h-full cursor-pointer border border-main-border rounded-[4px] bg-main-border pr-[16px]",
          "data-[state=open]:rounded-b-[0px]",
          "transition-all ease-in-out duration-300"
        ),
      },
    },
  }
);

interface AccordionTriggerProps {
  variant: VariantProps<typeof triggerVariants>["variant"];
  className?: string;
  children?: React.ReactNode;
}

function AccordionTrigger({
  className,
  children,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> &
  AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="grid grid-cols-[1fr_auto] w-full h-full justify-center items-stretch">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(triggerVariants({ variant }), className)}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={cn(
            "text-warm-sand pointer-events-none size-16 shrink-0 translate-y-0.5 transition-transform duration-200"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const observer = new MutationObserver(() => {
      const state = element.getAttribute("data-state");
      setIsOpen(state === "open");
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    const initialState = element.getAttribute("data-state");
    setIsOpen(initialState === "open");

    return () => observer.disconnect();
  }, []);

  return (
    <AccordionPrimitive.Content
      ref={contentRef}
      data-slot="accordion-content"
      forceMount
      {...props}
      suppressHydrationWarning
    >
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className={cn("overflow-hidden pt-0 flex", className)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
