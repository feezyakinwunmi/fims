import { clsx, type ClassValue } from 'clsx';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskText(text: string): string {
  if (text.length <= 4) {
    return '*'.repeat(text.length);
  }

  const firstLength = Math.floor(text.length / 3);
  const lastLength = Math.floor(text.length / 3);
  const middleLength = text.length - firstLength - lastLength;

  const firstPart = text.slice(0, firstLength);
  const middlePart = text
    .slice(firstLength, firstLength + middleLength)
    .replace(/./g, '*');
  const lastPart = text.slice(firstLength + middleLength);

  return `${firstPart}${middlePart}${lastPart}`;
}

export const formatNumberWithCommas = (number: number | string): string => {
  const num = typeof number === 'number' ? number : parseFloat(number);

  if (isNaN(num)) {
    console.error('Invalid input: not a number');
    return '';
  }

  return num.toLocaleString('en-US');
};

export function capitalizeFirstLetter(name: string | undefined): string {
  name = name ? name : 'eweko';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}


