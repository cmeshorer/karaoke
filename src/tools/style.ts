/**
 * Get a CSS variable's value
 * @param  {string} variable The css variable
 * @return {string} The assigned value
 */
export const getStyle = (variable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
};
