import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn takes one or more class names as input.
 * It merges them using the clsx function and then applies the tailwind merge function to the result.
 * This function is used to combine and merge class names in a way that is compatible with tailwind CSS.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
