import * as React from "react";
import { cn } from "@/lib/utils";

// This component is used in the dashboard to display the user's profile information and audio clip. It is also used in the EditProfile component to display the user's current profile information and audio clip.

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 text-xs font-medium text-zinc-50",
        className,
      )}
      {...props}
    />
  );
}
