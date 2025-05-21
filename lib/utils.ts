import { TZDate } from "@date-fns/tz";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get current time in Sungailiat, Kabupaten Bangka, Bangka Belitung
 * using date-fns v4's official timezone support
 */
export function getCurrentTimeSungailiat() {
  // Create a TZDate instance for Asia/Jakarta timezone (used in Sungailiat)
  const sungailiatTime = new TZDate(new Date(), "Asia/Jakarta");

  // Format the date and time
  // const formattedTime = format(sungailiatTime, "EEEE, MMMM d, yyyy HH:mm:ss");

  return sungailiatTime;
}
