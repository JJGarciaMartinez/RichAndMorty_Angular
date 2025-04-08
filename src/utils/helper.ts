import { Params } from '@angular/router';

/**
 * This function filters the empty values from an object and returns a new object without the empty values
 *
 * @param params - The object containing query parameters to be filtered
 * @returns A new object with non-empty query parameters
 */

// acc = accumulator (acumulador) to store the values

export function filterNoEmptyParams(params: Params): Params {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {} as Params);
}
