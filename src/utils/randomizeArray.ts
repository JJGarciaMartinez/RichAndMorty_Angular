/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 *
 * @param {any[]} array Array to shuffle
 *
 * @returns {any[]} Shuffled array
 */

export const randomizeArray = <T>(array: T[]): T[] => {
  console.log(array);
  return [...array].sort(() => Math.random() - 0.5);
};
