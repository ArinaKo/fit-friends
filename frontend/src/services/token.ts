import {
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_PENDING_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
} from '../const';
import { AuthToken } from '../types';

export const getAccessToken = (): AuthToken => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};

export const getRefreshToken = (): AuthToken => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveTokens = (
  accessToken: AuthToken,
  refreshToken: AuthToken
): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, refreshToken);
};

export const dropTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

export const getPendingStatus = (): boolean => {
  const status = localStorage.getItem(REFRESH_PENDING_KEY_NAME);
  return status ? true : false;
};

export const setPendingStatus = (): void => {
  localStorage.setItem(REFRESH_PENDING_KEY_NAME, 'true');
};

export const dropPendingStatus = (): void => {
  localStorage.removeItem(REFRESH_PENDING_KEY_NAME);
};
