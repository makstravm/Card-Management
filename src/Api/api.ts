import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { PostRequestValuesTypes } from "./types";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
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
  (res): AxiosResponse => res.data,
  (err): Promise<AxiosError> => {
    throw err;
  }
);

export const GET = (api: string) => {
  const result = axiosInstance.get(api);
  return result;
};

export const POST = (api: string, values: PostRequestValuesTypes) => {
  const result = axiosInstance.post(api, values);
  return result;
};
