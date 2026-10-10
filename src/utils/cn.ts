import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// merges classes and lets later Tailwind classes override earlier ones
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
