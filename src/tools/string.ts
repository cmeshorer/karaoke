/**
 * Generates a string of items separated by commas
 * @param  {string[]} items The array of strings
 * @return {string} The generated string
 */
export const joinItems = (items: string[]) => {
  const joinedItems = items.join(", ");
  return joinedItems;
};

/**
 * Generates a random string
 * @param  {number} length The length of the random string
 * @return {string} The generated random string
 */
export const generateRandomString = (length: number) => {
  let randomString = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let counter = 0;
  while (counter < length) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    counter += 1;
  }
  return randomString;
};
