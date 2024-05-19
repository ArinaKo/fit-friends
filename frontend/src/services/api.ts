import axios, {
  AxiosError,
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
import { LoggedUser } from '../types';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
};

type DetailMessageType = {
  type: string;
  message: string;
};

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
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<DetailMessageType>) => {
      const originalRequest = error.config as AxiosRequestConfig;
      const isPending = getPendingStatus();

      if (error.response?.status === StatusCodes.UNAUTHORIZED && !isPending) {
        const token = getRefreshToken();
        if (!token) {
          return Promise.reject(error);
        }

        setPendingStatus();
        try {
          const response = await axios.get<LoggedUser>(
            `${BACKEND_URL}/auth/refresh`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const { accessToken, refreshToken } = response.data;
          saveTokens(accessToken, refreshToken);

          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          return api(originalRequest);
        } finally {
          dropPendingStatus();
        }
      }

      if (error.response && StatusCodeMapping[error.response.status]) {
        const detailMessage = error.response.data;
        toast.warn(detailMessage.message);
      }

      return Promise.reject(error);
    },
  );

  return api;
};
