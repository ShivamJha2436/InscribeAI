import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Typography helpers
export const typography = {
  display:
    "font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl",
  headline: "font-bold tracking-tight text-2xl sm:text-3xl",
  subhead: "text-base sm:text-lg text-black/70 dark:text-white/70",
  muted: "text-sm text-black/70 dark:text-white/70",
};
