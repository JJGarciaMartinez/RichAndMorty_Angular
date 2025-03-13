/**
 * Set loading character to true
 *
 * @param {any[]} characters
 * @returns {void}
 */

import { Character } from '@typesApp/characterType';

export function setCharactersWithLoading(characters: Character[]): Character[] {
  return characters.map((character: Character) => ({
    ...character,
    loading: true,
  }));
}
