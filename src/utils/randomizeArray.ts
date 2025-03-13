/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 *
 * @param {any[]} array Array to shuffle
 *
 * @returns {any[]} Shuffled array
 */

export const randomizeArray = (array: any[]): any[] => {
  return [...array].sort(() => Math.random() - 0.5);
};
