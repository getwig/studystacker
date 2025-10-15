import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Color, colors, colorsMap } from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export type Simplify<T> = { [K in keyof T]: T[K] } & {};

export function getColorHex(color: Color, isDark: boolean) {
  // biome-ignore lint/style/noNonNullAssertion: color is guaranteed to be in colorsMap
  const colorData = colorsMap.find((c) => c.value === color)!;
  return isDark ? colorData.darkHex : colorData.lightHex;
}

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
