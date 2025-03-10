/**
 * This function is used to get the id from the url
 * @param {string} url The url from which the id will be extracted
 *
 * @returns {number} The id extracted from the url
 */

export const getIdFromUrl = (url: string): number => {
  const splitUrl = url.split('/');
  const idText = splitUrl[splitUrl.length - 1];

  const id = parseInt(idText, 10);

  if (isNaN(id)) {
    throw new Error('Invalid id');
  }

  return id;
};
