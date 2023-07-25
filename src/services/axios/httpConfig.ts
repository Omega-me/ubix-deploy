import axios, { AxiosInstance } from 'axios';

export const httpConnector: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
});
