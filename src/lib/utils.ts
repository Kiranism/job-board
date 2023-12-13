import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndianCurrency(amount: number) {
  const IndianFormatter = new Intl.NumberFormat("en-IN");
  return IndianFormatter.format(amount);
}
