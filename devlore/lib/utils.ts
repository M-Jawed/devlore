import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatError = (error: any) => {
  if (error.message === "Username is already taken. Please try another.") {
    return "Username is already taken";
  }

  if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
    return "Account with this email already exists. Please try another";
  }

  return error instanceof Error ? error.message : String(error);
};

export const convertToPlainJSON = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
