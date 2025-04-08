import { Character } from '@typesApp/interfacesRM';

/**
 * Set loading character to true
 *
 * @param {Character[]} characters - Array of characters
 * @returns {Character[]} - Array of characters with loading set to true
 */
export function setCharactersWithLoading(characters: Character[]): Character[] {
  return characters.map((character: Character) => ({
    ...character,
    loading: true,
  }));
}
