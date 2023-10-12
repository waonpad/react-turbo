import Axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { env } from '@/constants/env';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = 'application/json';
  return config;
}

export const axios: AxiosInstance = Axios.create({
  baseURL: env.VITE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);
