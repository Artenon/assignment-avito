import axios, { AxiosInstance } from "axios";

const BASE_URL = "";

export const createAPI = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
  });
};
