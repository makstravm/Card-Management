import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { errorBoundary } from "../services/errorBoundary";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

axiosInstance.interceptors.response.use(
  (res): AxiosResponse => res,
  (err): Promise<AxiosError> => {
    errorBoundary(err.response);
    throw err;
  }
);

export const GET = (api: string) => {
  const result = axiosInstance.get(api);

  return result;
};

export const POST = <T, V>(
  api: string,
  values: V
): Promise<AxiosResponse<T>> => {
  const result = axiosInstance.post(api, values);

  return result;
};
