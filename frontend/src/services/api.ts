import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import {
  dropPendingStatus,
  getAccessToken,
  getPendingStatus,
  getRefreshToken,
  saveTokens,
  setPendingStatus,
} from './token';
import { StatusCodes } from 'http-status-codes';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: AxiosRequestConfig = error.config;
      const isPending = getPendingStatus();

      if (error.response.status === StatusCodes.UNAUTHORIZED && !isPending) {
        const token = getRefreshToken();
        if (!token) {
          return Promise.reject(error);
        }

        setPendingStatus();
        try {
          const response = await axios.get(`${BACKEND_URL}/auth/refresh`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          const { accessToken, refreshToken } = response.data;
          saveTokens(accessToken, refreshToken);

          originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } finally {
          dropPendingStatus();
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
