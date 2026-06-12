import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatError = (error: any) => {
  if (error.message === "Username is already taken. Please try another.") {
    return "Username is already taken";
  } else {
    return error.message;
  }
};
