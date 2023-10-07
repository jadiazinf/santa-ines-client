import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const dayNames = [
  'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom',
]