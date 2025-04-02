"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "w-12 h-7 inline-flex items-center shrink-0 peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "size-5 bg-background data-[state=unchecked]:bg-soft-foreground dark:data-[state=unchecked]:bg-background pointer-events-none block rounded-full ring-0 transition-transform data-[state=checked]:-translate-x-[calc(100%+2px)] data-[state=unchecked]:-translate-x-1"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
