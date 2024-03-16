import { IProductSize, validSizes } from '@/interfaces';

export const isValidProductSize = (value: string): value is IProductSize => {
  const checker: Set<string> = new Set(validSizes);
  return checker.has(value);
};
