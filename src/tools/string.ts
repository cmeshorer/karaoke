/**
 * Generates a string of items separated by commas
 * @param  {string[]} items The array of strings
 * @return {string} The generated string
 */
export const joinItems = (items: string[]) => {
  const joinedItems = items.join(", ");
  return joinedItems;
};
