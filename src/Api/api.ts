import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    throw err;
  }
);

export const GET = (api: string) => {
  const result = axiosInstance.get(api);
  return result;
};

export const POST = (api: string, values: any) => {
  const result = axiosInstance.post(api, values);
  return result;
};
