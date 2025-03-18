import { Params } from '@angular/router';

// acc = accumulator (acumulador) to store the values

export function filterNoEmptyParams(params: Params): Params {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {} as Params);
}
