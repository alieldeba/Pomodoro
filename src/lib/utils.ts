import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function notify(message: { title: string; body: string }) {
  let permissionGranted = await isPermissionGranted();

  // If not we need to request it
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }

  // Once permission has been granted we can send the notification
  if (permissionGranted) {
    sendNotification(message);
  }
}

export function getRandomMessage<T>(messages: T[]): T {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

export function formatNumber(
  number: number,
  includeZero: boolean = true
): string | number {
  if (number == 0) {
    return includeZero ? "00" : "0";
  }

  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}
