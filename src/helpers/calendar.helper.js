import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const dayNames = [
  'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom',
]


export function fechaHora(fechaISO, accion) {
    switch (accion) {
    case "fecha":
      var item = fechaISO.slice(0, 10);
      break;
    case "hora":
      var item = fechaISO.slice(11, 16);
      break;
    }
    return item;
}