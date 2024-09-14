import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAPI() {
  if(process.env.NODE_ENV === 'development') {
    return 'http://localhost:8888'
  }

  return "https://bucharitesh.in"
}
