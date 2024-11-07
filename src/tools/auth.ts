import { AxiosError } from "axios";

/**
 * Save token data in local storage
 * @param {string} accessToken The access token
 * @param {number} expiresIn The expiration duration
 * @param {string} refreshToken The refresh token
 */
export const storeTokenData = (
  accessToken: string,
  expiresIn: number,
  refreshToken?: string
) => {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
  const stringExpirationDate = JSON.stringify(expirationDate);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("expirationDate", stringExpirationDate);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};

/**
 * Determines if an access token has expired
 * @return {boolean} Whether expiration is true
 */
export const isTokenExpired = () => {
  const storedExpirationDate = new Date(
    JSON.parse(localStorage.getItem("expirationDate") as string)
  );
  return new Date() > storedExpirationDate;
};

/**
 * Determines if an error has an unauthorized status (401)
 * @param {AxiosError} error The error
 * @return {boolean} Whether unauthorized status is true
 */
export const isUnauthorizedError = (error: AxiosError) => {
  const status = (error as AxiosError).response?.status;
  return status === 401;
};
