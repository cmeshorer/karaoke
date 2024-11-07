export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

/**
 * Detect whether the system theme is set to dark
 */
export const prefersDarkColorScheme = {
  query: "(prefers-color-scheme: dark)",
};

/**
 * Update app theme and save in local storage
 * @param {isDarkTheme} boolean Whether dark theme is true
 */
export const setTheme = (isDarkTheme: boolean) => {
  const theme = isDarkTheme ? Theme.DARK : Theme.LIGHT;
  document.querySelector("body")?.setAttribute("theme", theme);
  localStorage.setItem("theme", theme);
};
