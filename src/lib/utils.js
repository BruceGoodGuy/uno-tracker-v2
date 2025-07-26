import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function shortName(name) {
  if (!name) return "";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
}

export function createRandomAvatar() {
  const randomSeed = Math.random().toString(36).substring(2); // e.g., "g0qv89u"
  return createAvatar(adventurerNeutral, {
    seed: randomSeed,
    backgroundColor: [
      "f0f0f0",
      "ffe4e1",
      "e0bbff",
      "b2f7ef",
      "ffb347",
      "c1f0f6",
      "f7cac9",
      "b5ead7",
      "ffdac1",
      "c7ceea",
      "f6eac2",
      "d4a5a5",
      "e2f0cb",
      "b5ead7",
      "ffb7b2",
      "a2d5f2",
      "f9f871",
      "f67280",
      "355c7d",
      "6c5b7b",
      "c06c84",
      "f8b195",
      "f6abb6",
      "b8e994",
      "38ada9",
      "e17055",
      "fdcb6e",
      "00b894",
      "fd79a8",
      "636e72",
      "fab1a0",
      "81ecec",
      "dfe6e9",
      "00cec9",
      "ffeaa7",
      "0984e3",
      "74b9ff",
      "a29bfe",
      "00b894",
      "fd79a8",
      "636e72",
      "fab1a0",
      "81ecec",
      "dfe6e9",
      "00cec9",
      "ffeaa7",
      "0984e3",
      "74b9ff",
      "a29bfe",
    ],
  }).toString();
}
